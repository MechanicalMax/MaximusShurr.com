interface Props {
  children: React.ReactNode;
}

export default function CaseStudyContent({ children }: Props) {
  return (
    <article className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {children}
      </div>
    </article>
  );
}
