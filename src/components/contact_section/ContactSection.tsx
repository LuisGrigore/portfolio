import { Mail, MapPin, Phone, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;
type TextareaProps = ComponentProps<"textarea">;

interface FormFieldProps extends Omit<InputProps, "type"> {
  label: string;
  type?: "text" | "email" | "textarea";
}

const FormField:React.FC<FormFieldProps> = ({ label, type = "text", name, ...props }: FormFieldProps) => {
  const id = props.id || name;
  const inputClasses = "w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary";
  
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2"
      >
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

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon: Icon, title, content, href }: ContactInfoCardProps) => {
  const ContentWrapper = href ? 'a' : 'span';
  const contentProps = href ? { href, className: "text-muted-foreground hover:text-primary transition-colors" } : { className: "text-muted-foreground" };

  return (
    <div className="flex items-start space-x-4 px-15">
      <div className="p-3 rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="w-full">
        <h4 className="font-medium">{title}</h4>
        <ContentWrapper {...contentProps}>
          {content}
        </ContentWrapper>
      </div>
    </div>
  );
};

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 bg-card/50 p-8 rounded-lg backdrop-blur-sm">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Let's Connect</h3>
              <p className="text-muted-foreground">Available for opportunities and collaborations</p>
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

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6">
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
                  className="cosmic-button mt-6 w-full flex items-center justify-center gap-2"
                >
                  Send Message
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
