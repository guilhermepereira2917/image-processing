import { promises as fs } from 'fs';
import { ReactNode } from 'react';
import { bundledLanguages, getSingletonHighlighter } from 'shiki/bundle/web';

export const codeToHtml = async (code: string, language: string) => {

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

export default async function CodeSnippet(): Promise<ReactNode> {
  const file: string = await fs.readFile(process.cwd() + '/src/classes/filters/AddImagesFilter.ts', 'utf8');
  const formattedFile: string = await codeToHtml(file, 'typescript');

  return (
    <div dangerouslySetInnerHTML={{ __html: formattedFile }} />
  );
}