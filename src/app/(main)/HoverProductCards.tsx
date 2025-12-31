"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
    id: string;
    downloads: string;
    name: string;
    image: string;
    hoverImage: string;
}

export default function HoverProductCards() {
    const products: Product[] = [
        {
            id: "1",
            downloads: "12M",
            name: "Neural Chatbot",
            image:
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "2",
            downloads: "12M",
            name: "AI Image Generator",
            image:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        },
       
        {
            id: "4",
            downloads: "12M",
            name: "AI Code Assistant",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "5",
            downloads: "12M",
            name: "Document Analyzer",
            image:
                "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "6",
            downloads: "12M",
            name: "AI Video Maker",
            image:
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        },
       
        {
            id: "8",
            downloads: "12M",
            name: "SEO Content AI",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "9",
            downloads: "12M",
            name: "AI Resume Builder",
            image:
                "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "10",
            downloads: "12M",
            name: "AI Music Generator",
            image:
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        },
    ];

    return (
        <section className="py-16 container mx-auto">
            <div className="px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-purple-200 bg-clip-text text-transparent">
                    Trending AI Tools
                </h2>


                <p className="mt-2 text-muted-foreground">
                    Explore powerful tools crafted for creators & developers.
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
                    {products.map((product, i) => (
                        <HoverCard key={product.id} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function HoverCard({ product, index }: { product: Product; index: number }) {
    const [hover, setHover] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const router = useRouter();

    // Apply mt on even columns (index % 2 === 1), mb on odd columns (index % 2 === 0)
    const marginClass = index % 2 === 1 ? "mt-8" : "mb-8";

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            onClick={() => router.push(`/product/${product.id}`)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseMove={handleMouseMove}
            className={`relative cursor-pointer p-4 rounded-2xl border border-gray-800 dark:bg-gray-900 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 ${marginClass}`}
        >
            {/* Arrow follows cursor */}
            {hover && (
                <div
                    style={{
                        left: cursorPos.x,
                        top: cursorPos.y,
                        transform: "translate(-50%, -50%)",
                    }}
                    className="absolute w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center pointer-events-none"
                >
                    <span className="text-lg font-semibold">&rarr;</span>
                </div>
            )}

            {/* NAME ABOVE IMAGE */}
            <h3 className="text-2xl font-semibold">{product.name}</h3>
            <h6 className="text-xl">{product.downloads + "+"}</h6>

            {/* IMAGE */}
            <div className="h-64 mt-4 w-full overflow-hidden">
                <img
                    src={hover ? product.hoverImage : product.image}
                    className="h-full w-full object-cover rounded-xl transition-all duration-300"
                />
            </div>
        </div>
    );
}


