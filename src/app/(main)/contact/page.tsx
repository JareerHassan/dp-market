import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question, feedback, or a partnership inquiry? We&apos;d love to hear from you.
          </p>
        </header>

        <Card className="bg-card border-2 border-primary/20 shadow-neon-green">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Our team will get back to you within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this about?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} placeholder="Your message..." />
              </div>
              <Button type="submit" variant="default" className="w-full" size="lg">
                Transmit Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
