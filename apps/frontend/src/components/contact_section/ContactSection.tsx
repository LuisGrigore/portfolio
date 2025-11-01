import { Mail, MapPin, Phone, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, type ComponentProps } from "react";
import { SectionTitle } from "@components/section_titile/SectionTitle";
import { useContactForm } from "./useContactForm";
import { usePopup } from "@components/popup/PopupProvider";

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
    "w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary";

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
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
  const { state, handleSubmit } = useContactForm();
  const { showPopup } = usePopup();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state._tag === "Success") {
      showPopup({
        type: "Success",
        message: "Your message was sent successfully 🚀.",
      });
      formRef.current?.reset();
    } else if (state._tag === "Error") {
      showPopup({
        type: "Error",
        message: "Something went wrong while sending the message.",
      });
    }
  }, [state._tag, showPopup]);

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle
          text_white="Get In"
          text_primary="Touch"
          introduction="I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out!"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 bg-card/50 p-8 rounded-lg backdrop-blur-sm">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Let's Connect</h3>
              <p className="text-muted-foreground">
                Available for opportunities and collaborations
              </p>
            </div>

            <div className="space-y-6">
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
          <div className="bg-card/50 p-8 rounded-lg backdrop-blur-sm relative">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form
              ref={formRef}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-center justify-center gap-4">
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
                  label="Message"
                  name="message"
                  type="textarea"
                  required
                  placeholder="Share the details of your project, questions, or just say hello!"
                />
                <button
                  type="submit"
                  disabled={state._tag === "Loading"}
                  className="cosmic-button mt-6 w-full flex items-center justify-center gap-2"
                >
                  {state._tag === "Loading" ? "Sending..." : "Send Message"}
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

