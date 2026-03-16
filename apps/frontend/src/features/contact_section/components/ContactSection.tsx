import { Mail, MapPin, Phone, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, type ComponentProps } from "react";
import { SectionTitle } from "@shared/components/section_titile/SectionTitle";
import { useContactForm } from "../hooks/useContactForm";
import paragraph from "../content/paragraph.md?raw";


type InputProps = ComponentProps<"input">;
type TextareaProps = ComponentProps<"textarea">;

interface FormFieldProps extends Omit<InputProps, "type"> {
  label: string;
  type?: "text" | "email" | "textarea";
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  name,
  ...props
}: FormFieldProps) => {
  const id = props.id || name;
  const inputClasses =
    "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary text-sm sm:text-base";

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-xs sm:text-sm font-medium mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          className={`${inputClasses} resize-none`}
          {...(props as TextareaProps)}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          className={inputClasses}
          {...props}
        />
      )}
    </div>
  );
};

interface ContactInfoCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  href?: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon: Icon,
  title,
  content,
  href,
}: ContactInfoCardProps) => {
  const ContentWrapper = href ? "a" : "span";
  const contentProps = href
    ? {
        href,
        className:
          "text-muted-foreground hover:text-primary transition-colors break-words",
      }
    : { className: "text-muted-foreground break-words" };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-3 sm:space-y-0 text-center sm:text-left px-4 sm:px-0">
      <div className="flex justify-center sm:justify-start">
        <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center mx-auto sm:mx-0">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
        </div>
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-base sm:text-lg">{title}</h4>
        <ContentWrapper {...contentProps}>{content}</ContentWrapper>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { sendButtonState, handleSubmit } = useContactForm(formRef);

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          text_white="Get In"
          text_primary="Touch"
          introduction={paragraph}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div className="space-y-6 sm:space-y-8 bg-card/50 p-5 sm:p-6 md:p-8 rounded-lg backdrop-blur-sm">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Let's Connect</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Available for opportunities and collaborations
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <ContactInfoCard
                icon={Mail}
                title="Drop me a line"
                content="luiscristiangrigore@proton.me"
                href="mailto:luiscristiangrigore@proton.me"
              />
              <div className="h-px bg-border/50" />
              <ContactInfoCard
                icon={Phone}
                title="Give me a call"
                content="+34 640 748 517"
                href="tel:+34640748517"
              />
              <div className="h-px bg-border/50" />
              <ContactInfoCard
                icon={MapPin}
                title="Based in"
                content="Madrid, Spain"
              />
            </div>
          </div>
          <div className="bg-card/50 p-5 sm:p-6 md:p-8 rounded-lg backdrop-blur-sm relative">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Send a Message</h3>
            <form ref={formRef} className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
                <FormField
                  label="Name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your professional email"
                />
                <FormField
                  label="Content"
                  name="content"
                  type="textarea"
                  required
                  placeholder="Share the details of your project, questions, or just say hello!"
                />
                <button
                  type="submit"
                  disabled={sendButtonState === "Sending"}
                  className="cosmic-button mt-4 sm:mt-6 w-full flex items-center justify-center gap-2"
                >
                  {sendButtonState === "Sending" ? "Sending..." : "Send Message"}
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
