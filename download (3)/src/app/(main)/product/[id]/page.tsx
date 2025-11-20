import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, users, reviews } from '@/lib/dummy-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductCard } from '@/components/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const seller = users.find((u) => u.id === product.sellerId);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column - Gallery */}
        <div className="lg:col-span-3">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="aspect-video relative overflow-hidden rounded-lg border-2 border-accent/30">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-cover" data-ai-hint="product image" />
                </div>
              </CarouselItem>
              {product.gallery.map((img, index) => (
                <CarouselItem key={index}>
                    <div className="aspect-video relative overflow-hidden rounded-lg border-2 border-accent/30">
                        <Image src={img} alt={`${product.name} - image ${index + 2}`} fill className="object-cover" data-ai-hint="product screenshot" />
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>
        </div>

        {/* Right Column - Details & Purchase */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-6">
            <Badge variant="outline">{product.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Icons.Star className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground">{product.description}</p>
            
            <Card className="bg-card/80 border-2 border-primary/30 shadow-neon-green">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <p className="text-4xl font-bold font-mono text-primary">${product.price.toFixed(2)}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button size="lg" variant="futuristic" className="w-full">
                    <Icons.ShoppingCart className="mr-2 h-5 w-5"/> Add to Cart
                  </Button>
                  <Button size="lg" variant="default" className="w-full">Buy Now</Button>
                </div>
              </CardContent>
            </Card>

            {seller && (
              <Card className="bg-card">
                  <CardContent className="p-4 flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-accent/50">
                          <AvatarImage src={seller.avatarUrl} alt={seller.name} data-ai-hint="person portrait" />
                          <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="text-sm text-muted-foreground">Sold by</p>
                          <p className="font-semibold text-lg text-accent">{seller.name}</p>
                      </div>
                  </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Lower Section - Features, Reviews, Related */}
      <div className="mt-12 lg:mt-16">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                    <Icons.CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground/80">{feature}</span>
                </li>
            ))}
        </ul>
        
        <div className="mt-12 lg:mt-16">
          <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>
          <div className="space-y-6">
            {productReviews.map(review => {
              const reviewUser = users.find(u => u.id === review.userId);
              return (
                <Card key={review.id} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={reviewUser?.avatarUrl} alt={reviewUser?.name} data-ai-hint="user avatar" />
                        <AvatarFallback>{reviewUser?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{reviewUser?.name}</p>
                          <div className="flex items-center gap-1">
                            {Array(5).fill(0).map((_, i) => (
                              <Icons.Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-primary' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12 lg:mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
