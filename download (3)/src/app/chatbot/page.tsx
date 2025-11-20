'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { aiShoppingAssistant } from '@/ai/flows/ai-shopping-assistant';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'user' | 'assistant';
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
    <div className="mt-2 border-l-2 border-primary/50 pl-4 py-2 space-y-1 font-mono text-sm">
      <p><span className="text-primary/80">Product:</span> {product.name}</p>
      <p><span className="text-primary/80">Description:</span> {product.description}</p>
      <p><span className="text-primary/80">Price:</span> ${product.price}</p>
      <p><span className="text-primary/80">Category:</span> {product.category}</p>
      <Link href={product.link} className="text-accent hover:underline">
        View Product &rarr;
      </Link>
    </div>
);

const parseResponse = (response: string) => {
    const lines = response.split('\n');
    const products = [];
    let currentProduct: any = {};
    let messageParts: (string | { type: 'product'; data: any })[] = [];
    let plainTextBuffer = '';

    const flushBuffer = () => {
        if (plainTextBuffer.trim()) {
            messageParts.push(plainTextBuffer.trim());
        }
        plainTextBuffer = '';
    }

    lines.forEach(line => {
        const productMatch = line.match(/^Product Name:\s*(.*)/);
        if (productMatch) {
            flushBuffer();
            if (Object.keys(currentProduct).length > 0) {
                products.push(currentProduct);
                messageParts.push({ type: 'product', data: { ...currentProduct } });
            }
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
        
        plainTextBuffer += line + '\n';
    });

    if (Object.keys(currentProduct).length > 0) {
      flushBuffer();
      messageParts.push({ type: 'product', data: { ...currentProduct } });
    } else {
      flushBuffer();
    }
    
    return messageParts;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
      { id: 'init', role: 'assistant', content: 'Welcome to Neural Nexus. How can I assist you in finding the perfect AI tool today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const result = await aiShoppingAssistant({ query: input });
        const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: result.response };
        setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
        console.error('AI assistant error:', error);
        const errorMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Apologies, I encountered a system glitch. Please try again.' };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      <header className="p-4 border-b border-border/40 text-center">
        <h1 className="text-2xl font-bold font-headline tracking-wider text-primary">
          [ AI Shopping Assistant ]
        </h1>
      </header>
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          const parsedContent = isUser ? [message.content] : parseResponse(message.content);
          return (
            <div key={message.id} className={cn('flex items-start gap-4', isUser ? 'justify-end' : 'justify-start')}>
              {!isUser && (
                <Avatar className="w-8 h-8 border-2 border-primary/50">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Icons.Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xl rounded-lg p-3 text-sm md:text-base border',
                  isUser
                    ? 'bg-cyan-600/20 border-cyan-500/40 text-cyan-300 rounded-br-none'
                    : 'bg-green-600/20 border-green-500/40 text-green-300 rounded-bl-none'
                )}
              >
                  {parsedContent.map((part, index) => {
                      if (typeof part === 'string') {
                          return <p key={index} className="whitespace-pre-wrap">{part}</p>
                      }
                      if (part.type === 'product') {
                          return <ProductRecommendation key={index} product={part.data} />
                      }
                      return null;
                  })}
              </div>
              {isUser && (
                <Avatar className="w-8 h-8 border-2 border-cyan-500/50">
                  <AvatarFallback className="bg-cyan-600/20 text-cyan-300">
                    <Icons.UserPlus className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
        {isLoading && (
            <div className="flex items-start gap-4 justify-start">
                 <Avatar className="w-8 h-8 border-2 border-primary/50">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Icons.Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-xl rounded-lg p-3 bg-green-600/20 border-green-500/40 text-green-300 rounded-bl-none">
                    <PulsingDots />
                </div>
            </div>
        )}
      </main>
      <footer className="p-4 border-t border-border/40">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for recommendations, e.g., 'best chatbot for e-commerce'"
            className="flex-1 !text-base"
            disabled={isLoading}
            autoFocus
          />
          <Button type="submit" variant="futuristic" disabled={isLoading}>
            Send <Icons.ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
