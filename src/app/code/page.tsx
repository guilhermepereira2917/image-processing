'use server';

import { promises as fs } from 'fs';
import Link from 'next/link';
import { bundledLanguages, getSingletonHighlighter } from 'shiki/bundle/web';

const codeToHtml = async (code: string, language: string) => {

  const highlighter = await getSingletonHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: [
      ...Object.keys(bundledLanguages),
    ],
  });

  return highlighter.codeToHtml(code, {
    lang: 'typescript',
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  });
};

export default async function CodeSnippet({ searchParams }: { searchParams: { filter: string } }) {
  const filter: string = searchParams.filter;

  if (!filter) {
    return null;
  }

  const fileName: string = `${filter}.ts`;
  const file: string = await fs.readFile(process.cwd() + `/src/classes/filters/${fileName}`, 'utf8');
  const formattedFile: string = await codeToHtml(file, 'typescript');

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-[90vw] max-h-[80vh] outline outline-sky-500 bg-white rounded">
      <div className="bg-sky-800 flex justify-between">
        <p className="text-white font-bold p-2">{fileName}</p>
        <Link href="/">
          <button className="text-white font-bold p-2">X</button>
        </Link>
      </div>

      <div className="p-2 overflow-y-scroll overflow-x-scroll" dangerouslySetInnerHTML={{ __html: formattedFile }} />
    </div>
  );
}