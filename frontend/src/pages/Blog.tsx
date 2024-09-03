import { Fullblog } from "../components/Fullblog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: id || "",
  });

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-t-transparent rounded-full"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <Fullblog blog={blog} />
    </div>
  );
};
