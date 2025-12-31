

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  link?: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://marketplacebackend.oxmite.com/api/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`https://marketplacebackend.oxmite.com/api/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const [product, allProducts] = await Promise.all([
    getProduct(params.id),
    getAllProducts(),
  ]);

  if (!product) notFound();

  const imageUrl = product.image
    ? `https://marketplacebackend.oxmite.com/${product.image.replace(/\\/g, '/')}`
    : '/placeholder.jpg';

  const demoLink = product.link
    ? product.link.trim().startsWith("http")
      ? product.link.trim()
      : `https://${product.link.trim()}`
    : null;

  const relatedProducts = allProducts
    .filter((p) => p._id !== product._id)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Link href='/products' className="inline-flex mb-5 items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-300 font-medium">
        ← Back to Explore
      </Link>
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Main Image */}
          <div className="relative aspect-square md:aspect-video overflow-hidden rounded-xl border-2 border-accent/30">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {product.name}
              </h1>

            </div>

            <p className="text-lg text-muted-foreground">
              {product.description || 'No description provided.'}
            </p>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-3">Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-primary font-bold text-lg">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {demoLink && (
                <Button size="lg" variant="outline" asChild>
                  <a href={demoLink} target="_blank" rel="noopener noreferrer">
                    View Demo / Portfolio
                  </a>
                </Button>
              )}
              <Button size="lg" variant="default" asChild>
                <Link href='/contact' >
                  Buy Product
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Other Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <Card key={related._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <a href={`/product/${related._id}`}>
                    <div className="relative aspect-video">
                      <Image
                        src={`https://marketplacebackend.oxmite.com/${related.image.replace(/\\/g, '/')}`}
                        alt={related.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold">{related.name}</h3>
                      <p className="text-muted-foreground mt-2 line-clamp-2">
                        {related.description}
                      </p>
                    </CardContent>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}