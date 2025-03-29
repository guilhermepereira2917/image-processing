import { ReactNode } from "react";
import { useCodeSnippet } from "./CodeSnippetContext";

export interface CustomButtonProps {
  text: string;
  onClick: () => void;
  codeSnippetClass?: string;
}

export default function CustomButton({ text, onClick, codeSnippetClass }: CustomButtonProps): ReactNode {
  const { setCodeSnippetClass } = useCodeSnippet()

  const handleOpenCodeSnippet = () => {
    if (codeSnippetClass) {
      setCodeSnippetClass(codeSnippetClass)
    }
  }

  return (
    <div className="flex w-full min-w-48">
      <button onClick={onClick} className="bg-sky-800 p-2 rounded text-white font-bold w-full cursor-pointer">{text}</button>

      {codeSnippetClass && (
        <button onClick={handleOpenCodeSnippet} className="bg-sky-800 p-2 ml-2 rounded font-bold text-white cursor-pointer">
          &lt;/&gt;
        </button>
      )}
    </div>
  );
}