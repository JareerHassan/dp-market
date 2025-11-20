import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories, products, testimonials } from '@/lib/dummy-data';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const heroBg = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
          {heroBg && (
             <Image
              src={heroBg.imageUrl}
              alt={heroBg.description}
              fill
              className="object-cover"
              data-ai-hint={heroBg.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-background/50" />
          <div className="relative z-10 container px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
              The Future of AI is Here
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Discover, trade, and integrate next-generation AI digital assets on the premier marketplace for innovation.
            </p>
            <div className="mt-8 max-w-xl mx-auto flex items-center relative">
              <Input
                type="search"
                placeholder="Search for AI models, prompts, datasets..."
                className="w-full !py-6 !pl-12 !pr-32 text-lg"
              />
              <Icons.Search className="absolute left-4 h-6 w-6 text-primary/70" />
              <Button type="submit" variant="futuristic" className="absolute right-2">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center">Featured AI Tools</h2>
            <p className="mt-2 text-center text-muted-foreground">Hand-picked assets from the Neural Nexus ecosystem.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/explore">
                <Button variant="outline" size="lg">
                  Explore All Products <Icons.ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Categories */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center">Trending Categories</h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {categories.slice(0, 4).map((category) => {
                const IconComponent = Icons[category.icon as keyof typeof Icons];
                return (
                  <Link key={category.id} href={`/categories?category=${category.slug}`} className="group">
                    <Card className="p-6 flex flex-col items-center justify-center text-center bg-card border-2 border-transparent hover:border-primary/50 transition-all duration-300 hover:shadow-neon-green hover:scale-105">
                      <IconComponent className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                      <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center">How It Works</h2>
            <div className="mt-12 grid md:grid-cols-2 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 border-2 border-primary/30">
                  <Icons.ShoppingCart className="h-10 w-10 text-primary"/>
                </div>
                <h3 className="mt-6 text-2xl font-bold">For Buyers</h3>
                <p className="mt-2 text-muted-foreground">Explore a universe of AI assets. Find, test, and integrate tools securely with one click.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-accent/10 border-2 border-accent/30">
                  <Icons.DollarSign className="h-10 w-10 text-accent"/>
                </div>
                <h3 className="mt-6 text-2xl font-bold">For Sellers</h3>
                <p className="mt-2 text-muted-foreground">Monetize your creations. List your AI models and APIs, and access a global market of innovators.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center">From the Community</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card border-2 border-border/50 p-6">
                  <CardContent className="p-0">
                    <p className="text-foreground/90">"{testimonial.quote}"</p>
                    <div className="mt-6 flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/50">
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
