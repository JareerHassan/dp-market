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
    <Card className={cn("group relative flex flex-col overflow-hidden border-2 border-transparent bg-gray-900 hover:border-accent/50 transition-all duration-300", className)}>
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
            <Badge variant="secondary" className="font-mono text-sm whitespace-nowrap bg-primary/10 text-primary border border-primary/20">
              ${product.price.toFixed(2)}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
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
