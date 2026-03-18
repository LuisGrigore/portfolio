import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import remarkEmoji from "remark-emoji";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type MarkdownRendererProps = {
  children: string;
  textDir?: "left" | "right";
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  children,
  textDir,
}) => {
  return (
    <div className={"max-w-none" + textDir ? "text-" + textDir : ""}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
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
          img: () => null,
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border border-border" {...props} />
            </div>
          ),
          thead: ({ ...props }) => <thead className="bg-muted" {...props} />,
          th: ({ ...props }) => (
            <th
              className="border px-4 py-2 text-left font-semibold"
              {...props}
            />
          ),
          td: ({ ...props }) => <td className="border px-4 py-2" {...props} />,
          tr: ({ ...props }) => <tr className="border-t" {...props} />,
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            return match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
