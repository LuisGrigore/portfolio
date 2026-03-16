import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

type MarkdownRendererProps = {
  children: string;
  textDir?: "left" | "right"
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ children, textDir }) => {
  return (
    <div className={"max-w-none" + textDir ? "text-" + textDir : ""}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-6" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-4" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xl font-semibold mt-5 mb-3" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="my-4 leading-7 text-muted-foreground" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc ml-6 my-4" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal ml-6 my-4" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-primary pl-4 italic my-4"
              {...props}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};