import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ title: false, content: false });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      title: !title.trim(),
      content: !content.trim(),
    };
    setErrors(newErrors);
    if (newErrors.title || newErrors.content) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                {/* Floating label input for Title */}
                <div className="relative mb-8">
                  <input
                    id="note-title"
                    type="text"
                    placeholder=" "
                    className={`block w-full px-4 pt-8 pb-2 text-lg bg-base-200 border-2 appearance-none rounded-xl focus:outline-none focus:border-primary/80 focus:bg-base-100 transition-all peer shadow-sm ${
                      errors.title ? "border-error" : "border-base-300"
                    }`}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title)
                        setErrors((prev) => ({ ...prev, title: false }));
                    }}
                    autoComplete="off"
                    aria-invalid={errors.title}
                  />
                  <label
                    htmlFor="note-title"
                    className={`absolute left-4 top-2 text-base-content/70 text-lg transition-all duration-200 pointer-events-none
                    peer-placeholder-shown:top-6 peer-placeholder-shown:text-base-content/40
                    peer-focus:top-2 peer-focus:text-primary/80
                    ${errors.title ? "text-error" : ""}
                  `}
                  >
                    Title
                  </label>
                  {errors.title && (
                    <span className="text-error text-xs mt-1 block">
                      Title is required.
                    </span>
                  )}
                </div>

                {/* Floating label textarea for Content */}
                <div className="relative mb-8">
                  <textarea
                    id="note-content"
                    placeholder=" "
                    className={`block w-full px-4 pt-8 pb-2 text-lg bg-base-200 border-2 appearance-none rounded-xl focus:outline-none focus:border-primary/80 focus:bg-base-100 transition-all peer shadow-sm h-40 resize-none ${
                      errors.content ? "border-error" : "border-base-300"
                    }`}
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      if (errors.content)
                        setErrors((prev) => ({ ...prev, content: false }));
                    }}
                    aria-invalid={errors.content}
                  />
                  <label
                    htmlFor="note-content"
                    className={`absolute left-4 top-2 text-base-content/70 text-lg transition-all duration-200 pointer-events-none
                    peer-placeholder-shown:top-6 peer-placeholder-shown:text-base-content/40
                    peer-focus:top-2 peer-focus:text-primary/80
                    ${errors.content ? "text-error" : ""}
                  `}
                  >
                    Content
                  </label>
                  {errors.content && (
                    <span className="text-error text-xs mt-1 block">
                      Content is required.
                    </span>
                  )}
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-lg shadow-md px-6 py-2 text-base font-semibold tracking-wide transition-all hover:scale-[1.03] disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-xs"></span>
                        Creating...
                      </span>
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
