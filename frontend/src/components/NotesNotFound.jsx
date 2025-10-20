import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 max-w-md mx-auto text-center">
      <div className="bg-gradient-to-tr from-primary/20 to-base-200 rounded-full p-10 shadow-lg">
        <NotebookIcon className="size-12 text-primary drop-shadow" />
      </div>
      <h3 className="text-3xl font-bold text-primary mb-2">No notes yet</h3>
      <p className="text-base-content/70 text-lg mb-2">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>
      <Link
        to="/create"
        className="btn btn-primary rounded-lg shadow-md px-6 py-2 text-base font-semibold tracking-wide transition-all hover:scale-[1.03]"
      >
        <span className="mr-2">📝</span> Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;
