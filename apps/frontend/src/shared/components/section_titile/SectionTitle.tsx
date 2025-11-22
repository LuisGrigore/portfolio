type SectionTitleProps = {
  text_white: string;
  text_primary: string;
  introduction?: string;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({
  text_white,
  text_primary,
  introduction,
}: SectionTitleProps) => {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        {text_white} <span className="text-primary">{text_primary}</span>
      </h2>
	  {introduction && (
	  <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
		{introduction}
	  </p>
	  )}
    </>
  );
};
