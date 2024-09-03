import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBLogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBLogs();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="w-screen max-w-screen-md">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate="30/12/2003"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
