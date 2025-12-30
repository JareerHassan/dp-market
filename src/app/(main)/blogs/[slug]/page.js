// "use client" - Disabled because we are using Server-side fetching
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaFeatherAlt,
  FaArrowRight,
  FaHome,
  FaCalendarAlt,
  FaUserEdit,
} from "react-icons/fa";
import axios from "axios";

// 1. HELPER: Extract images from HTML (Server-safe)
const extractImages = (html = "") => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const sources = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    sources.push(match[1]);
  }
  return sources;
};

// 2. COMPONENT: Individual Article Card
const ArticleCard = ({ p }) => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg group transform hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-200/30 flex flex-col">
    <div className="relative w-full h-64 overflow-hidden group-hover:border-t-4 group-hover:border-[#d7241d] transition-all duration-500">
      {p.imageUrl ? (
        <Image
          src={p.imageUrl}
          alt={p.title.rendered}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      ) : (
        <div className="bg-gray-200 w-full h-full" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
    </div>
    <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
      <div>
        <div className="flex items-center space-x-4 text-sm font-semibold text-gray-700 mb-4">
          <span className="flex items-center">
            <FaCalendarAlt className="w-4 h-4 mr-2 text-[#d7241d]" />
            {new Date(p.date).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <FaUserEdit className="w-4 h-4 mr-2 text-gray-600" />
            {p.authorName || "Author"}
          </span>
        </div>
        <h2
          className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#d7241d] transition-colors duration-500 leading-tight"
          dangerouslySetInnerHTML={{ __html: p.title.rendered }}
        />
        <div
          className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }}
        />
      </div>
      <Link
        href={`/blogs/${p.slug}`}
        className="inline-flex items-center text-sm sm:text-base font-bold text-[#d7241d] hover:text-[#b41e17] transition-colors duration-500 mt-auto"
      >
        Read Article
        <FaArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-2" />
      </Link>
    </div>
  </div>
);

// 3. SEO METADATA
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await axios.get(
      `https://dpmarketblogs.oxmite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const post = res.data[0];
    if (!post) return { title: "Article Not Found" };

    const seo = post.seo_data || {};
    return {
      title: seo.og_title || seo.title || post.title.rendered.replace(/<[^>]*>/g, ""),
      description: seo.og_description || seo.description || post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      keywords: seo.keywords?.filter(k => k && k.trim()).join(", "),
      openGraph: {
        title: seo.og_title || seo.title,
        description: seo.og_description || seo.description,
        images: seo.og_image || post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
        type: "article",
      },
    };
  } catch (error) {
    return { title: "Blog Post" };
  }
}

// 4. SCHEMA COMPONENT
async function BlogSchema({ slug }) {
  try {
    const res = await axios.get(`https://dpmarketblogs.oxmite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`);
    const post = res.data[0];
    if (post?.seo_data?.schema) {
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.seo_data.schema) }}
        />
      );
    }
  } catch (e) { return null; }
  return null;
}

// 5. MAIN PAGE COMPONENT
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  let post = null;
  let authorName = "Unknown";
  let imageUrl = null;
  let relatedPosts = [];

  try {
    // Fetch Single Post
    const res = await axios.get(
      `https://dpmarketblogs.oxmite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const data = res.data[0];
    if (!data) return notFound();

    // Setup Main Post Data
    imageUrl = data._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    authorName = data._embedded?.author?.[0]?.name || "Unknown";
    post = data;

    // Fetch Related Posts (Freshly)
    const allPostsRes = await axios.get(
      "https://dpmarketblogs.oxmite.com/wp-json/wp/v2/posts?_embed&per_page=11"
    );
    relatedPosts = allPostsRes.data
      .filter((p) => p.slug !== slug)
      .slice(0, 6)
      .map(p => ({
        ...p,
        imageUrl: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        authorName: p._embedded?.author?.[0]?.name || "Unknown",
      }));

  } catch (error) {
    console.error("Error loading data:", error);
    return notFound();
  }

  const postImages = extractImages(post.content?.rendered);
  const textContent = (post.content?.rendered || "").replace(/<img[^>]*>/g, "");

  return (
    <>
      <BlogSchema slug={slug} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center bg-no-repeat min-h-[600px] flex items-center justify-start text-left px-6 sm:px-16"
          style={{ backgroundImage: `url('${imageUrl || ""}')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative max-w-3xl text-white">
            <FaFeatherAlt className="w-10 h-10 mb-3" />
            <p className="text-base sm:text-lg uppercase tracking-wide mb-1">Alpine Discoveries</p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-3"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <p className="text-sm md:text-base opacity-90">
              By {authorName} | {new Date(post.date).toLocaleDateString()} | 4 min read
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="px-6 md:px-16 lg:px-32 pt-10">
          <Link href={`/blogs`} className="inline-flex items-center text-sm sm:text-base font-bold text-[#d7241d] hover:text-[#b41e17]">
            <FaHome className="mr-2" /> Back to Blog
          </Link>
          <div className="mt-2 h-[2px] w-32 bg-[#d7241d] rounded"></div>
        </div>

        {/* Article Body */}
        <div className="py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
          <article className="bg-white p-10 shadow-xl rounded-3xl border border-gray-100">
            {imageUrl && (
              <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden shadow-lg">
                <Image src={imageUrl} alt={post.title.rendered} fill style={{ objectFit: "cover" }} priority />
              </div>
            )}

            <div className="prose prose-lg max-w-none mx-auto bg-gray-50 text-black p-8 rounded-xl border-l-4 border-[#d7241d] mb-10 shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: textContent }} />
              {postImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  {postImages.map((src, idx) => (
                    <img key={idx} src={src} alt="Article img" className="w-full h-auto rounded-lg shadow-md" />
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* More Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-4xl sm:text-5xl text-gray-900 mb-16 border-b-4 border-[#d7241d]/30 pb-4">
                More Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                {relatedPosts.map((p) => (
                  <ArticleCard key={p.id} p={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}