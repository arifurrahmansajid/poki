import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs } from '../data/blogs';

const BlogDetailPage = () => {
  const { id } = useParams();
  const blogId = Number(id);

  const blog = useMemo(() => blogs.find((b) => b.id === blogId), [blogId]);

  const currentIndex = useMemo(() => blogs.findIndex((b) => b.id === blogId), [blogId]);
  const nextBlog = blogs[currentIndex + 1] ?? null;
  const prevBlog = blogs[currentIndex - 1] ?? null;

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="py-24 px-6 text-center">
          <h1 className="text-3xl font-bold text-[#1B2336]">Blog post not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-[#59B1C9] font-bold underline">
            Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-28 pb-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] items-center">
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-[#59B1C9]">{blog.category}</div>
              <h1 className="mt-4 text-4xl md:text-5xl font-black text-[#1B2336] leading-tight">{blog.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.author}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>

              <div className="mt-6">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-sm font-bold text-[#59B1C9] hover:text-[#1B2336]"
                >
                  ← Back to all articles
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#1B2336] border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {blog.img && (
              <div className="relative overflow-hidden rounded-2xl border border-gray-200">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-24">
        <div className="prose prose-lg max-w-none text-gray-700">
          {blog.content.split('\n\n').map((block, index) => (
            <p key={index}>{block}</p>
          ))}
        </div>

        {(prevBlog || nextBlog) && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevBlog && (
              <Link
                to={`/blog/${prevBlog.id}`}
                className="group block rounded-xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500">Previous post</div>
                <div className="mt-4 text-lg font-bold text-[#1B2336] group-hover:text-[#59B1C9]">
                  {prevBlog.title}
                </div>
              </Link>
            )}

            {nextBlog && (
              <Link
                to={`/blog/${nextBlog.id}`}
                className="group block rounded-xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-gray-500">Next post</div>
                <div className="mt-4 text-lg font-bold text-[#1B2336] group-hover:text-[#59B1C9]">
                  {nextBlog.title}
                </div>
              </Link>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
