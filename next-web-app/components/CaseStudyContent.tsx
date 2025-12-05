import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-4 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mb-3 mt-8 text-gray-900" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mb-2 mt-6 text-gray-900" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 text-gray-700" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4 text-gray-700" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  a: (props: any) => (
    <a className="text-[#FFBA4A] hover:underline font-medium" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-[#FFBA4A] pl-4 italic text-gray-600 my-4" {...props} />
  ),
  strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
};

export default function CaseStudyContent({ mdxSource }: Props) {
  return (
    <article className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <MDXRemote {...mdxSource} components={components} />
      </div>
    </article>
  );
}
