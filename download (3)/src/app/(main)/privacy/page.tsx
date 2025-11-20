export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <article className="prose prose-invert prose-lg mx-auto text-foreground/80 space-y-6">
          <h2 className="text-2xl font-bold text-accent">1. Information Collection</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>

          <h2 className="text-2xl font-bold text-accent">2. Use of Data</h2>
          <p>
            Neural Nexus uses the collected data for various purposes: to provide and maintain our Service; to notify you about changes to our Service; to allow you to participate in interactive features of our Service when you choose to do so; to provide customer support; to gather analysis or valuable information so that we can improve our Service.
          </p>

          <h2 className="text-2xl font-bold text-accent">3. Data Security</h2>
          <p>
            The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          
          <h2 className="text-2xl font-bold text-accent">4. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <p>
            [This is a placeholder document. Consult a legal professional for an actual Privacy Policy.]
          </p>
        </article>
      </div>
    </div>
  );
}
