import Link from 'next/link';
import { categories } from '@/lib/dummy-data';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Product Categories</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse assets by category to find the perfect tool for your needs.
        </p>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons];
          return (
            <Link key={category.id} href={`/explore?category=${category.slug}`} className="group">
              <Card className="p-6 h-full flex flex-col items-center justify-center text-center bg-card border-2 border-transparent hover:border-accent/50 transition-all duration-300 hover:shadow-neon-cyan hover:scale-105">
                <IconComponent className="h-16 w-16 text-accent group-hover:scale-110 transition-transform" />
                <h3 className="mt-4 text-xl font-semibold">{category.name}</h3>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
