import React, { RefObject, createRef, useRef } from "react";
import CodeSnippet from "./CodeSnippet";

export interface CustomButtonProps {
  text: string;
  onClick: () => void;
  codeSnippetClass?: any;
}

interface CustomButtonState {
  codeSnippetHidden: boolean;
}

export default class CustomButton extends React.Component<CustomButtonProps, CustomButtonState> {
  constructor(props: CustomButtonProps) {
    super(props);

    this.state = {
      codeSnippetHidden: true,
    };
  }

  render() {
    const toggleCodeSnippet = (): void => {
      this.setState((previousState: CustomButtonState) => ({
        codeSnippetHidden: !previousState.codeSnippetHidden,
      }));
    }

    return (
      <div className="flex w-full min-w-48">
        <button onClick={this.props.onClick} className="bg-sky-800 p-2 rounded text-white font-bold w-full">{this.props.text}</button>

        {this.props.codeSnippetClass && (
          <>
            <button className="bg-sky-800 p-2 ml-2 rounded font-bold text-white" onClick={toggleCodeSnippet}>
              &lt;/&gt;
            </button>

            <div className={`absolute flex flex-col w-[800px] outline outline-sky-500 overflow-y-scroll rounded ${this.state.codeSnippetHidden ? 'hidden' : ''}`}>
              <div className="bg-sky-800 flex justify-end">
                <button className="text-white font-bold p-2" onClick={toggleCodeSnippet}>X</button>
              </div>
              <CodeSnippet codeSnippetClass={this.props.codeSnippetClass} />
            </div>
          </>
        )}
      </div>
    );
  };
}