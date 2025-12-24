import axios from "axios";
import Link from "next/link";

async function getSinglePost(slug) {
  try {
    const res = await axios.get(
      `https://dpmarketblogs.oxmite.com/wp-json/wp/v2/posts?slug=${slug}&_fields=title,content,date,seo_data`
    );
    return res.data[0];
  } catch (error) {
    return null;
  }
}

export default async function BlogDetails({ params }) {
  const post = await getSinglePost(params.slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-semibold text-gray-900">Post not found</h1>
        <Link href="/blogs" className="mt-4 text-indigo-600 hover:underline">Return to feed</Link>
      </div>
    );
  }

  // Calculate estimated reading time
  const wordsPerMinute = 200;
  const textContent = post.content.rendered.replace(/<[^>]*>/g, '');
  const readingTime = Math.ceil(textContent.split(/\s+/).length / wordsPerMinute);

  return (
    <article className="min-h-screen pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-10  backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/blogs" className="group flex items-center text-sm font-medium transition-colors">
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> 
            Back to Articles
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>

          <h1 
            className="text-4xl md:text-5xl font-bold tracking-tight  leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          
          <div className="mt-8 flex items-center border-t border-gray-100 pt-8">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              DP
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold ">Owner</p>
              <p className="text-xs">Industry Insights & News</p>
            </div>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div className="max-w-3xl mx-auto px-6">
        <div 
          className="prose prose-blue prose-lg max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-p:leading-relaxed
          prose-img:rounded-2xl prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Footer Tags */}
        {post.seo_data?.keywords?.length > 0 && (
          <footer className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {post.seo_data.keywords.map((tag, i) => tag && (
                <span key={i} className="bg-gray-50 hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 border border-gray-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}