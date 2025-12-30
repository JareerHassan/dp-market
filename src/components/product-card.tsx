import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Card className={cn("group relative flex flex-col overflow-hidden border-2 border-transparent dark:bg-gray-900 hover:border-accent/50 transition-all duration-300", className)}>
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-video">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="AI product"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight">
            <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </CardTitle>
          {/* <Badge variant="secondary" className="font-mono text-sm whitespace-nowrap bg-primary/10 text-primary border border-primary/20">
              ${product.price.toFixed(2)}
            </Badge> */}
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        {product.features && product.features.length > 0 && (
          <div className="mt-3 flex gap-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <Badge
                key={index}
                className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs font-medium hover:scale-105 transition-transform truncate max-w-[45%]"
              >
                {feature}
              </Badge>
            ))}
            {/* Agar features 2 se zyada hain, "+N more" display karein */}
            {product.features.length > 2 && (
              <Badge
                className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium truncate max-w-[45%]"
              >
                +{product.features.length - 2} more
              </Badge>
            )}
          </div>
        )}

      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icons.Star className="w-4 h-4 text-primary" />
            <span>{product.rating}</span>
          </div>
          <span>({product.reviewCount} reviews)</span>
        </div>
        <Button asChild size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/product/${product.id}`}>
            View
            <Icons.ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
