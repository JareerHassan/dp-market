export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Terms of Service</h1>
          <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <article className="prose prose-invert prose-lg mx-auto text-foreground/80 space-y-6">
          <h2 className="text-2xl font-bold text-accent">1. Introduction</h2>
          <p>
            Welcome to Neural Nexus ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at neuralnexus.com (together or individually "Service") operated by Neural Nexus.
          </p>

          <h2 className="text-2xl font-bold text-accent">2. Accounts</h2>
          <p>
            When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our Service.
          </p>
          
          <h2 className="text-2xl font-bold text-accent">3. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Neural Nexus and its licensors.
          </p>

          <h2 className="text-2xl font-bold text-accent">4. User Content</h2>
          <p>
            You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third-party posts on or through the Service.
          </p>

          <h2 className="text-2xl font-bold text-accent">5. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
          
          <p>
            [This is a placeholder document. Consult a legal professional for actual Terms of Service.]
          </p>
        </article>
      </div>
    </div>
  );
}
