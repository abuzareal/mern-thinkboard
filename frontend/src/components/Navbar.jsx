import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight drop-shadow-sm">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to={"/create"}
              className="btn btn-primary rounded-lg shadow-md px-5 py-2 text-base font-semibold tracking-wide transition-all hover:scale-[1.03]"
            >
              <PlusIcon className="size-5 mr-2" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
