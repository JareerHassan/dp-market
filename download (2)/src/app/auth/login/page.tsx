import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm bg-card border-2 border-primary/20 shadow-neon-green">
      <CardHeader className="text-center">
        <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
            <Icons.Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Neural Nexus</span>
        </Link>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-accent hover:underline">
                    Forgot password?
                </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" variant="default">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
