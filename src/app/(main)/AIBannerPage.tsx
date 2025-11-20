import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface AIProduct {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Icons;
  link: string;
}

const aiProducts: AIProduct[] = [
  {
    id: "1",
    name: "AI Chatbot",
    description: "Automate customer conversations with intelligent responses.",
    icon: "MessageSquare",
    link: "/products/chatbot",
  },
  {
    id: "2",
    name: "AI Image Generator",
    description: "Create stunning images from text prompts instantly.",
    icon: "MessageSquare",
    link: "/products/image-generator",
  },
  {
    id: "3",
    name: "AI Code Assistant",
    description: "Get code suggestions, completions, and debugging tips.",
    icon: "Code",
    link: "/products/code-assistant",
  },
  {
    id: "4",
    name: "AI Analytics",
    description: "Analyze data and get predictive insights in seconds.",
    icon: "BarChart",
    link: "/products/analytics",
  },
];

export default function AIProductsBanner() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Explore Our AI Products
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground mx-auto md:mx-0">
          Enhance your productivity and creativity with AI-powered tools built for modern needs.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {aiProducts.map((product) => {
          const IconComponent = Icons[product.icon];
          return (
            <Link key={product.id} href={product.link} className="group">
              <Card className="p-6 flex flex-col items-center text-center bg-card border-2 border-transparent hover:border-primary/50 transition-all duration-300">
                <IconComponent className="h-20 w-20 text-white bg-gray-700 p-4 rounded-xl shadow-md transition-transform group-hover:scale-105" />
                <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}