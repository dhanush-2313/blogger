import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBLogs } from "../hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
  const { loading, blogs } = useBLogs();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && blogs.length === 0) {
      alert("You are not logged in. Please log in first.");
      navigate("/signin");
    }
  }, [loading, blogs, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-screen max-w-screen-md">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="w-screen max-w-screen-md">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="30/12/2003"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
