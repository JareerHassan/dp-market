import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm bg-card border-2 border-primary/20 shadow-neon-green">
      <CardHeader className="text-center">
        <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
            <Icons.Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Neural Nexus</span>
        </Link>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Join the future of AI. It&apos;s free.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="SynthWave123" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" variant="default">
            Create Account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-accent hover:underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
