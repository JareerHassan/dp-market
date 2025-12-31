"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaArrowRight, FaFeatherAlt, FaStar, FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

const Blog = () => {
    const pathname = usePathname();
    const currentLocale = pathname ? pathname.split("/")[1] : "";

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // _embed use karne se image data saath hi mil jata hai, alag se loop nahi chalana padta
                const response = await axios.get("https://dpmarketblogs.oxmite.com/wp-json/wp/v2/posts?_embed&per_page=13");

                const postsData = response.data.map((post) => {
                    // Featured image nikalne ka standard WordPress API tarika
                    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                    const authorName = post._embedded?.author?.[0]?.name || "DPMarket";
                    const seoData = post.seo_data || {};

                    return { ...post, imageUrl, authorName, seoData };
                });

                setPosts(postsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-16 h-16 border-4 border-[#d7241d] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

    // Design Logic Fix:
    const featuredPost = posts[0];
    // .slice(1) ka matlab hai ke pehla article chhor kar baqi sab niche "More Articles" mein jayenge
    const remainingPosts = posts.length > 1 ? posts.slice(1) : [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
            {/* Header */}
            <div
                className="relative bg-cover bg-center min-h-[600px] px-6 sm:px-8 md:px-16 lg:px-32 flex items-center"
                style={{
                    backgroundImage:
                        "url('https://plus.unsplash.com/premium_photo-1697368109897-f6c43e70a40d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwc3xlbnwwfHwwfHx8MA%3D%3D')",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <header className="relative max-w-4xl animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold tracking-tight mb-4 text-white">
                        DPMarket Blog
                    </h1>

                    <p className="text-sm sm:text-base md:text-md lg:text-lg text-white max-w-3xl">
                        Discover the latest updates, insights, and resources from
                        <span className="font-semibold"> DPMarket</span> — tech, templates, AI tools,
                        and digital products designed to help you grow.
                    </p>
                </header>
            </div>

            {/* Featured Post */}
            {featuredPost && (
                <>
                    <Head>
                        <title>{featuredPost.seoData?.title || featuredPost.title.rendered}</title>
                        <meta name="description" content={featuredPost.seoData?.description || ""} />
                        <link rel="canonical" href={featuredPost.seoData?.canonical || ""} />
                    </Head>
                    <div className="py-24 px-4 md:px-16 lg:px-32">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-4xl sm:text-5xl text-gray-900 mb-16 border-b-4 border-orange-500  pb-4">  Top Pick of the Day</h2>
                            <Link href={`/${currentLocale}/${featuredPost.slug}`} className="group block">
                                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transform transition-all duration-700 hover:shadow-3xl hover:scale-105">
                                    <div className="relative w-full h-80 lg:h-full min-h-[400px] overflow-hidden">
                                        {featuredPost.imageUrl && (
                                            <Image
                                                src={featuredPost.imageUrl}
                                                alt={featuredPost.title.rendered}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="transition-transform duration-1000 ease-in-out group-hover:scale-110 group-hover:brightness-105"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#d7241d]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                        <span className="absolute top-6 left-6 bg-orange-500 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-xl flex items-center shadow-lg uppercase tracking-widest">
                                            <FaStar className="w-4 h-4 mr-2" /> TOP PICK
                                        </span>
                                    </div>
                                    <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                                        <div className="flex items-center space-x-6 text-sm md:text-base font-semibold text-gray-700 mb-6 divide-x divide-gray-300">
                                            <span className="flex items-center pr-4">
                                                <FaCalendarAlt className="w-5 h-5 mr-2 text-orange-500 " />
                                                {new Date(featuredPost.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center pl-4">
                                                <FaUserEdit className="w-5 h-5 mr-2 text-orange-500 " />
                                                {featuredPost.authorName}
                                            </span>
                                        </div>
                                        <h3
                                            className="text-2xl sm:text-3xl md:text-3xl text-gray-900 mb-4 leading-tight group-hover:text-orange-500 transition-colors duration-500"
                                            dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                                        />
                                        <div
                                            className="text-gray-700 mb-6 text-base sm:text-lg md:text-md line-clamp-4"
                                            dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                                        />
                                        <div className="inline-flex items-center text-base sm:text-lg font-bold text-orange-500  relative group-hover:text-orange-500 transition-colors duration-500">
                                            Read Full Article <FaArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </>
            )}

            {/* More Articles */}
            <div className="pb-28 px-4 md:px-16 lg:px-32">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl text-gray-900 mb-16 border-b-4 border-orange-500 pb-4">More Articles</h2>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 auto-rows-fr">
                    {remainingPosts.length > 0 ? (
                        remainingPosts.map(post => (
                            <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-lg group transform hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-200/30 flex flex-col">
                                <div className="relative w-full h-64 overflow-hidden group-hover:border-t-4 group-hover:border-orange-500  transition-all duration-500">
                                    {post.imageUrl && (
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title.rendered}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:brightness-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                                </div>
                                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                                    <div>
                                        <div className="flex items-center space-x-4 text-sm md:text-base font-semibold text-gray-700 mb-4">
                                            <span className="flex items-center">
                                                <FaCalendarAlt className="w-4 h-4 mr-2 text-orange-500 " />
                                                {new Date(post.date).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center">
                                                <FaUserEdit className="w-4 h-4 mr-2 text-gray-600" />
                                                {post.authorName}
                                            </span>
                                        </div>
                                        <h2
                                            className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-500 leading-tight"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                        <div
                                            className="text-gray-700 mb-6 text-sm sm:text-base md:text-md leading-relaxed line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />
                                    </div>
                                    <Link
                                        href={`/${currentLocale}/${post.slug}`}
                                        className="inline-flex items-center text-sm sm:text-base font-bold text-orange-500  hover:text-orange-500  transition-colors duration-500 mt-auto"
                                    >
                                        Read Article <FaArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-2" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No more articles found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;