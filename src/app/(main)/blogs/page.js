import axios from "axios";
import Link from "next/link";

async function getPosts() {
  const res = await axios.get(
    "https://dpmarketblogs.oxmite.com/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt,date"
  );
  return res.data;
}

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen  py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-14">
          Latest <span className="text-blue-600">Blogs</span>
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.date).toDateString()}
              </p>

              <Link href={`/blogs/${post.slug}`}>
                <h2
                  className="text-xl font-bold text-gray-900 hover:text-blue-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Link>

              <div
                className="text-gray-600 line-clamp-3 mb-6"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />

              <Link
                href={`/blogs/${post.slug}`}
                className="mt-auto text-blue-600 font-semibold"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
