import { MDXRemote } from 'next-mdx-remote/rsc';
import InlineImage from './InlineImage';
import PdfDownloadButton from './PdfDownloadButton';
import { ComponentProps } from 'react';

interface Props {
  content: string;
}

const components = {
  h1: (props: ComponentProps<'h1'>) => <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 mt-6 sm:mt-8 text-gray-900" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 mt-4 sm:mt-6 text-gray-900" {...props} />,
  p: (props: ComponentProps<'p'>) => <p className="mb-4 leading-relaxed text-gray-700 text-base sm:text-lg" {...props} />,
  ul: (props: ComponentProps<'ul'>) => <ul className="list-disc pl-5 sm:pl-6 mb-4 text-gray-700 text-base sm:text-lg" {...props} />,
  ol: (props: ComponentProps<'ol'>) => <ol className="list-decimal pl-5 sm:pl-6 mb-4 text-gray-700 text-base sm:text-lg" {...props} />,
  li: (props: ComponentProps<'li'>) => <li className="mb-2" {...props} />,
  a: (props: ComponentProps<'a'>) => (
    <a className="text-[#FFBA4A] hover:underline font-medium min-h-[44px] inline-flex items-center" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800 break-words" {...props} />
  ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="bg-gray-900 text-white p-3 sm:p-4 rounded-lg overflow-x-auto mb-4 text-xs sm:text-sm" {...props} />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-l-4 border-[#FFBA4A] pl-3 sm:pl-4 italic text-gray-600 my-4 text-base sm:text-lg" {...props} />
  ),
  strong: (props: ComponentProps<'strong'>) => <strong className="font-bold text-gray-900" {...props} />,
  em: (props: ComponentProps<'em'>) => <em className="italic" {...props} />,
  InlineImage: InlineImage,
  PdfDownloadButton: PdfDownloadButton,
};

export default function CaseStudyContent({ content }: Props) {
  return (
    <article className="py-8 sm:py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}
