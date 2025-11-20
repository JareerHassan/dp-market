import Link from "next/link";
import Image from "next/image";

export default function AIProductsBanner() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Explore Our AI Products
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground mx-auto md:mx-0">
          Discover AI tools designed to boost productivity, creativity, and efficiency for modern users.
        </p>
      </header>

      {/* Banner Content */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Text + CTA Card */}
        <Link
          href="/products"
          className="group flex-1 p-6 flex flex-col items-start justify-center gap-4 text-left
                     bg-card border-2 border-transparent hover:border-primary/50 transition-all duration-300 rounded-lg"
        >
          <h2 className="text-2xl md:text-3xl font-semibold group-hover:text-primary transition">
            Unlock the Power of AI
          </h2>
          <p className="text-muted-foreground">
            Explore our AI products that help you automate tasks, generate content, and enhance creativity.
          </p>
          <span className="inline-block mt-2 px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-md group-hover:bg-primary/90 transition">
            Explore AI Products
          </span>
        </Link>

        {/* Right Image */}
        <div className="flex-1 relative w-full h-64 md:h-96">
          <Image
            src="https://plus.unsplash.com/premium_photo-1675793714962-a2413250c490?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your AI product banner image
            alt="AI Products Banner"
            fill
            className="object-contain rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
