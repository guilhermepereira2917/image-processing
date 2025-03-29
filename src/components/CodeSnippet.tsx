import typescript from '@shikijs/langs/typescript';
import githubLight from '@shikijs/themes/github-light';
import { ReactNode, useEffect, useState } from 'react';
import { createHighlighterCore, createOnigurumaEngine } from 'shiki';
import { useCodeSnippet } from './CodeSnippetContext';

const highlighterPromise = createHighlighterCore({
  themes: [githubLight],
  langs: [typescript],
  engine: createOnigurumaEngine(import('shiki/wasm'))
});

const codeToHtml = async (code: string) => {
  const highlighter = await highlighterPromise
  return highlighter.codeToHtml(code, {
    lang: 'typescript',
    theme: 'github-light',
  });
};

export default function CodeSnippet() {
  const codeSnippetContext = useCodeSnippet()
  const { codeSnippetClass, setCodeSnippetClass } = codeSnippetContext

  const [fileContent, setFileContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fileName = `${codeSnippetClass}.ts`

  useEffect(() => {
    if (!codeSnippetClass) {
      return
    }

    const url: string = `https://raw.githubusercontent.com/guilhermepereira2917/image-processing/refs/heads/main/src/classes/filters/${fileName}`
    setLoading(true)

    fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return response.text()
      })
      .then(data => codeToHtml(data))
      .then(data => setFileContent(data))
      .catch(error => setError("Error fetching file:" + error))
      .finally(() => setLoading(false))
  }, [codeSnippetClass])

  if (!codeSnippetClass) {
    return
  }

  const handleCloseClick = () => {
    setCodeSnippetClass(null)
    setFileContent("")
  }

  let content: ReactNode
  if (loading) {
    content = (
      <span>Loading...</span>
    )
  } else if (error) {
    content = (
      <span>{error}</span>
    )
  } else {
    content = (
      <div
        className="p-2 w-full h-full"
        dangerouslySetInnerHTML={{ __html: fileContent }}
      />)
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-[900px] h-[600px] max-w-[90vw] max-h-[80vh] outline outline-sky-500 bg-white rounded">
      <div className="bg-sky-800 flex justify-between">
        <p className="text-white font-bold p-2">{fileName}</p>
        <button onClick={handleCloseClick} className="text-white font-bold p-2 cursor-pointer">X</button>
      </div>

      <div className="w-full h-full flex items-center justify-center overflow-y-scroll overflow-x-scroll">
        {content}
      </div>
    </div>
  );
}