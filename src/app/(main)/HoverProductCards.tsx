"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
    id: string;
    name: string;
    image: string;
    hoverImage: string;
}

export default function HoverProductCards() {
    const products: Product[] = [
        {
            id: "1",
            name: "Neural Chatbot",
            image:
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1508612761958-e931d843bdd3?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "2",
            name: "AI Image Generator",
            image:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "3",
            name: "Speech-to-Text Pro",
            image:
                "https://images.unsplash.com/photo-1581091870627-3ca5d04779d8?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1580894732444-8ecdedecbfff?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "4",
            name: "AI Code Assistant",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "5",
            name: "Document Analyzer",
            image:
                "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "6",
            name: "AI Video Maker",
            image:
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "7",
            name: "Data Visualizer",
            image:
                "https://images.unsplash.com/photo-1555949963-aa79dcee30d0?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1517142089942-ba376ce32a0a?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "8",
            name: "SEO Content AI",
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "9",
            name: "AI Resume Builder",
            image:
                "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "10",
            name: "AI Music Generator",
            image:
                "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
            hoverImage:
                "https://images.unsplash.com/photo-1521038199265-0847df5120b5?auto=format&fit=crop&w=800&q=80",
        },
    ];

    return (
        <section className="py-16 md:py-24">
            <div className=" px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tight text-center">
                    Trending AI Tools
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                    Explore powerful tools crafted for creators & developers.
                </p>

                <div className="mt-16 container  grid justify-center grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-y-20 gap-x-6 mx-auto">

                    {products.map((product, i) => (
                        <HoverCard key={product.id} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function HoverCard({
    product,
    index,
}: {
    product: Product;
    index: number;
}) {
    const [hover, setHover] = useState(false);
    const router = useRouter();

    const stagger = index % 2 === 0 ? "translate-y-[-30px]" : "translate-y-6";


    return (
        <div
            onClick={() => router.push(`/product/${product.id}`)}
            className={`cursor-pointer rounded-2xl border border-gray-800 bg-gray-900 hover:border-gray-600 hover:translate-y-[-30px] transition p-4 transform ${stagger}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* NAME ABOVE IMAGE */}
            <h3 className="text-xl font-semibold text-white mb-3">
                {product.name}
            </h3>

            {/* IMAGE */}
            <div className="h-64 w-full overflow-hidden rounded-xl">
                <img
                    src={hover ? product.hoverImage : product.image}
                    className="h-full w-full object-cover transition-all duration-300"
                />
            </div>
        </div>
    );
}
