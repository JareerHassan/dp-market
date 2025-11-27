import Link from 'next/link';
import { categories } from '@/lib/dummy-data';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-200 bg-clip-text text-transparent tracking-tight">Product Categories</h1>
        <p className="mt-3 max-w-2xl  text-lg text-muted-foreground">
          Browse assets by category to find the perfect tool for your needs.
        </p>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons];
          return (
            <Link key={category.id} href={`/explore?category=${category.slug}`} className="group">
              <Card className="p-6 flex  items-center justify-start gap-3 text-center
                     bg-gray-300 dark:bg-gray-900 border-2 border-transparent hover:border-primary/50 transition-all duration-300">
                      <IconComponent className="h-20 w-20 text-white bg-gray-500 border shadow rounded-xl
                       p-4  transition-transform" />
                      <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
                    </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
