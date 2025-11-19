import Link from 'next/link';
import { Icons } from '@/components/icons';

const footerLinks = {
  platform: [
    { href: '/explore', label: 'Explore' },
    { href: '/categories', label: 'Categories' },
    { href: '/seller/register', label: 'Become a Seller' },
    { href: '/chatbot', label: 'AI Assistant' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 py-12 md:px-6">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Neural Nexus</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            The marketplace for next-generation AI digital products.
          </p>
        </div>

        <div>
          <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-foreground">Platform</h3>
          <ul className="mt-4 space-y-2">
            {footerLinks.platform.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-foreground">Company</h3>
          <ul className="mt-4 space-y-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h3>
          <ul className="mt-4 space-y-2">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 md:px-6 border-t border-border/40">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Neural Nexus. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Add social icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}
