import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';

export default function SellerRegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-2 border-primary/20 shadow-neon-green">
        <CardHeader className="text-center">
          <Icons.UserPlus className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl mt-4">Become a Seller</CardTitle>
          <CardDescription>Join our creators and start selling your AI products on Neural Nexus.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" placeholder="e.g., SynthWave Creations" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Short Bio / Store Description</Label>
              <Textarea id="bio" placeholder="Tell us about your store and what you create." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio or Website URL (Optional)</Label>
              <Input id="portfolio" placeholder="https://my-ai-work.com" />
            </div>

            <Button type="submit" className="w-full" variant="default" size="lg">
              Submit Application
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/auth/login" className="text-accent hover:underline">Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
