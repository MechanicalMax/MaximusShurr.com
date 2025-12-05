interface Props {
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
}

export default function CaseStudyTestimonial({ testimonial }: Props) {
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <blockquote className="text-base sm:text-lg italic text-gray-700 border-l-4 border-[#FFBA4A] pl-4 sm:pl-6 whitespace-pre-wrap break-words">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>
        <div className="mt-4 pl-4 sm:pl-6">
          <p className="font-semibold text-gray-900">{testimonial.author}</p>
          <p className="text-sm sm:text-base text-gray-600">{testimonial.role}</p>
        </div>
      </div>
    </section>
  );
}
