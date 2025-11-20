import { Icons } from '@/components/icons';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">About Neural Nexus</h1>
          <p className="mt-4 text-lg text-muted-foreground">Powering the next wave of AI innovation.</p>
        </header>

        <article className="prose prose-invert prose-lg mx-auto text-foreground/80 space-y-6">
          <p>
            Neural Nexus was founded on a simple yet powerful principle: to democratize access to artificial intelligence. We believe that the future of technology lies in the hands of creators, innovators, and visionaries from all corners of the globe. Our mission is to provide a robust, secure, and vibrant marketplace where these brilliant minds can share their creations and where businesses and individuals can find the perfect AI tools to solve their challenges.
          </p>

          <blockquote className="border-l-4 border-accent pl-4 italic text-accent/90">
            "Our vision is a world where AI is not a barrier, but a bridge to unprecedented creativity and efficiency."
          </blockquote>

          <p>
            We are a team of AI enthusiasts, developers, and entrepreneurs who saw a fragmented landscape of incredible AI assets with no central hub for discovery and exchange. We built Neural Nexus to be that hub—a nexus point for the flow of digital intelligence.
          </p>

          <h2 className="text-3xl font-bold text-accent">Our Core Values</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <Icons.CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <strong>Innovation:</strong> We are committed to fostering a community that pushes the boundaries of what's possible with AI.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Icons.CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <strong>Accessibility:</strong> We strive to make powerful AI tools available and understandable to everyone, from seasoned developers to curious hobbyists.
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Icons.CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <strong>Security & Trust:</strong> We prioritize the integrity of our platform, ensuring every transaction is secure and every product is vetted for quality.
              </div>
            </li>
          </ul>

          <p>
            Join us on this exciting journey as we build the future of the AI economy, one connection at a time.
          </p>
        </article>
      </div>
    </div>
  );
}
