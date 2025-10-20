import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import DeleteModal from "../components/DeleteModal";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              {/* Floating label input for Title */}
              <div className="relative mb-8">
                <input
                  id="note-title-detail"
                  type="text"
                  placeholder=" "
                  className="block w-full px-4 pt-8 pb-2 text-lg bg-base-200 border-2 appearance-none rounded-xl focus:outline-none focus:border-primary/80 focus:bg-base-100 transition-all peer shadow-sm"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  autoComplete="off"
                />
                <label
                  htmlFor="note-title-detail"
                  className="absolute left-4 top-2 text-base-content/70 text-lg transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base-content/40
                  peer-focus:top-2 peer-focus:text-primary/80
                "
                >
                  Title
                </label>
              </div>

              {/* Floating label textarea for Content */}
              <div className="relative mb-8">
                <textarea
                  id="note-content-detail"
                  placeholder=" "
                  className="block w-full px-4 pt-8 pb-2 text-lg bg-base-200 border-2 appearance-none rounded-xl focus:outline-none focus:border-primary/80 focus:bg-base-100 transition-all peer shadow-sm h-40 resize-none"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
                <label
                  htmlFor="note-content-detail"
                  className="absolute left-4 top-2 text-base-content/70 text-lg transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base-content/40
                  peer-focus:top-2 peer-focus:text-primary/80
                "
                >
                  Content
                </label>
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary rounded-lg shadow-md px-6 py-2 text-base font-semibold tracking-wide transition-all hover:scale-[1.03] disabled:opacity-60"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-xs"></span>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>

          <DeleteModal
            open={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            loading={deleting}
            title="Delete Note?"
            description="Are you sure you want to delete this note? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            confirmClass="btn-error"
          />
        </div>
      </div>
    </div>
  );
};
export default NoteDetailPage;
