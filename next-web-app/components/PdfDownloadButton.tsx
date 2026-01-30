import React from 'react';
import { DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface PdfDownloadButtonProps {
  fileUrl: string;
  label?: string;
}

export default function PdfDownloadButton({ 
  fileUrl, 
  label = "Read the Full Design Review" 
} : PdfDownloadButtonProps) {
  return (
    <div className='flex justify-center'>
    <a 
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between w-full max-w-md p-4 mb-8 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 no-underline text-gray-700"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-md text-blue-600">
          <DocumentTextIcon className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-800">{label}</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider">Technical Whitepaper (PDF)</span>
        </div>
      </div>
      <ArrowRightIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
    </a>
    </div>
  );
};