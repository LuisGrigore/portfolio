import { useState } from "react";
import { MessageSquare, X, Star } from "lucide-react";

const FeedbackButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const resetFeedback = () => {
    setRating(0);
    setHover(0);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    console.log({
      rating,
      message,
    });

    form.reset();
    resetFeedback();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[1200]
		  flex items-center gap-2
		  bg-primary text-white
		  p-3 sm:px-4 sm:py-3
		  rounded-full
		  shadow-lg hover:scale-105 transition"
		      >
        <MessageSquare size={18} />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1250]
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                name="message"
                placeholder="Write your feedback..."
                required
                className="w-full h-28 p-3
                rounded-md border
                bg-background
                focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="submit"
                className="bg-primary text-white
                py-2 rounded-md
                hover:opacity-90 transition"
              >
                Send Feedback
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
