import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-tr from-primary/10 to-base-200 border border-primary/30 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center p-8">
          <div className="flex-shrink-0 bg-primary/20 p-5 rounded-full mb-4 md:mb-0 md:mr-8 shadow">
            <ZapIcon className="size-12 text-primary drop-shadow" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 text-primary">
              Rate Limit Reached
            </h3>
            <p className="text-base-content mb-2 text-lg">
              You've made too many requests in a short period. Please wait a
              moment.
            </p>
            <p className="text-sm text-base-content/70">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
