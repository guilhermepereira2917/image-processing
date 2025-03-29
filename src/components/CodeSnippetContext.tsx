import { createContext, useContext, useState, ReactNode } from "react"

interface CodeSnippetContextType {
  codeSnippetClass: string | null,
  setCodeSnippetClass: (code: string | null) => void,
}

const CodeSnippetContext = createContext<CodeSnippetContextType | null>(null)

export function CodeSnippetProvider({ children }: { children: ReactNode }): ReactNode {
  const [codeSnippetClass, setCodeSnippetClass] = useState<string | null>(null)

  return (
    <CodeSnippetContext.Provider value={{ codeSnippetClass, setCodeSnippetClass }}>
      {children}
    </CodeSnippetContext.Provider>
  );
}

export function useCodeSnippet() {
  const context = useContext(CodeSnippetContext)
  if (!context) {
    throw new Error("useCodeSnippet must be used within a CodeSnippetProvider")
  }

  return context;
}

export default CodeSnippetContext;
