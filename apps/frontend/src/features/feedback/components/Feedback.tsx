import { useRef } from "react";
import { MessageSquare, X, Star } from "lucide-react";
import { useFeedback } from "../hooks/useFeedback";
import { MarkdownRenderer } from "@shared/components/markdown_renderer/MarkdownRenderer";

export const Feedback: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    isOpen,
    setIsOpen,
    rating,
    setRating,
    hover,
    setHover,
    sendButtonState,
    handleSubmit,
    resetFeedback,
  } = useFeedback(formRef);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-1200
		  flex items-center gap-2
		  cosmic-button
		  p-3 sm:px-4 sm:py-3"
      >
        <MessageSquare size={18} />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-1250
          flex items-center justify-center
          bg-black/40 backdrop-blur-sm"
        >
          <div
            className="bg-background rounded-lg
            p-6 w-[90%] max-w-md
            shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Give Feedback</h2>

              <button
                onClick={resetFeedback}
                className="text-foreground/70 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              {/* Star Rating */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isSelected = rating >= star;
                  const isHovered = hover >= star;

                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={24}
                        className={`transition-colors duration-200
          ${
            isSelected
              ? "fill-primary text-primary"
              : isHovered
                ? "text-primary/60"
                : "text-foreground/30"
          }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Text feedback */}
              <textarea
                name="content"
                placeholder="Write your feedback..."
                required
                className="w-full h-28 p-3
                rounded-md border
                bg-background
                focus:outline-none focus:ring-2 focus:ring-primary"
              />

			  <MarkdownRenderer>
				Feedback is anonymous. **Do not include any personal information** in the message field.
			  </MarkdownRenderer>

              <button
                type="submit"
                className="cosmic-button mt-4 sm:mt-6 w-full flex items-center justify-center gap-2"
              >
                {sendButtonState === "Sending" ? "Sending..." : "Send Feedback"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
