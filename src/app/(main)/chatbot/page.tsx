"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { aiShoppingAssistant } from "@/ai/flows/ai-shopping-assistant";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const PulsingDots = () => (
  <div className="flex items-center space-x-1">
    <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.3s]"></span>
    <span className="h-2 w-2 bg-primary rounded-full animate-pulse [animation-delay:-0.15s]"></span>
    <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
  </div>
);

const ProductRecommendation = ({ product }: { product: any }) => (
  <div className="mt-3 border border-primary/20 bg-primary/5 rounded-xl p-4 shadow-sm">
    <p className="text-sm"><span className="font-semibold text-primary">Name:</span> {product.name}</p>
    <p className="text-sm"><span className="font-semibold text-primary">Description:</span> {product.description}</p>
    <p className="text-sm"><span className="font-semibold text-primary">Price:</span> ${product.price}</p>
    <p className="text-sm"><span className="font-semibold text-primary">Category:</span> {product.category}</p>
    <Link href={product.link} className="text-blue-400 underline text-sm">
      View Product →
    </Link>
  </div>
);

// ----------------- PARSER ---------------------
const parseResponse = (response: string) => {
  const lines = response.split("\n");
  const messageParts: any[] = [];
  let currentProduct: any = {};
  let buffer = "";

  const flush = () => {
    if (buffer.trim()) messageParts.push(buffer.trim());
    buffer = "";
  };

  lines.forEach((line) => {
    const productMatch = line.match(/^Product Name:\s*(.*)/);
    if (productMatch) {
      flush();
      if (Object.keys(currentProduct).length > 0)
        messageParts.push({ type: "product", data: { ...currentProduct } });

      currentProduct = { name: productMatch[1].trim() };
      return;
    }
    const descMatch = line.match(/^Short description:\s*(.*)/);
    if (descMatch) {
      currentProduct.description = descMatch[1].trim();
      return;
    }
    const priceMatch = line.match(/^Price:\s*(.*)/);
    if (priceMatch) {
      currentProduct.price = priceMatch[1].trim();
      return;
    }
    const categoryMatch = line.match(/^Category:\s*(.*)/);
    if (categoryMatch) {
      currentProduct.category = categoryMatch[1].trim();
      return;
    }
    const linkMatch = line.match(/^Link:\s*(.*)/);
    if (linkMatch) {
      currentProduct.link = linkMatch[1].trim();
      return;
    }
    buffer += line + "\n";
  });

  if (Object.keys(currentProduct).length > 0)
    messageParts.push({ type: "product", data: { ...currentProduct } });

  flush();
  return messageParts;
};

// ----------------- MAIN CHATBOT ---------------------

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content:
        "👋 Welcome to **Neural Nexus AI**.\nI can assist you in finding the perfect AI tool or product.\nHow can I help today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await aiShoppingAssistant({ query: input });
      const assistantMessage: Message = {
        id: Date.now().toString() + "_ai",
        role: "assistant",
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "⚠️ Oops! Something went wrong on my end. Please try again in a moment.",
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[100vh] bg-gradient-to-b from-background to-muted/30">
      {/* HEADER */}
      <header className="p-4 border-b shadow-sm backdrop-blur-sm text-center bg-background/60 sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-wide text-primary">
          Neural Nexus AI Assistant
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your personalized AI product finder
        </p>
      </header>

      {/* CHAT AREA */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6"
      >
        {messages.map((message) => {
          const isUser = message.role === "user";
          const parsed = isUser
            ? [message.content]
            : parseResponse(message.content);

          return (
            <div
              key={message.id}
              className={cn(
                "flex gap-4 items-start",
                isUser ? "justify-end" : "justify-start"
              )}
            >
              {!isUser && (
                <Avatar className="w-9 h-9 shadow-md">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Icons.Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-xl px-4 py-3 rounded-2xl shadow-sm border text-sm md:text-base leading-relaxed",
                  isUser
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : " rounded-bl-none border-primary/20"
                )}
              >
                {parsed.map((part: any, i: number) => {
                  if (typeof part === "string")
                    return (
                      <p key={i} className="whitespace-pre-wrap">
                        {part}
                      </p>
                    );
                  if (part.type === "product")
                    return <ProductRecommendation key={i} product={part.data} />;
                })}
              </div>

              {isUser && (
                <Avatar className="w-9 h-9 shadow-md">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Icons.User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}

        {/* LOADING DOTS */}
        {isLoading && (
          <div className="flex items-start gap-4">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-primary/20 text-primary">
                <Icons.Bot className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div className="px-4 py-3 rounded-2xl  border border-primary/30 shadow-sm rounded-bl-none">
              <PulsingDots />
            </div>
          </div>
        )}
      </main>

      {/* FOOTER INPUT */}
      <footer className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 w-full"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something like “best AI chatbot for my shop”..."
            className="flex-1 h-12 rounded-xl border-primary/30 shadow-sm text-base"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="default"
            className="h-12 px-5 rounded-xl shadow-md"
            disabled={isLoading}
          >
            <Icons.Send className="w-5 h-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}