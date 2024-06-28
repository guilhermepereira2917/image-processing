import Link from "next/link";
import React from "react";

export interface CustomButtonProps {
  text: string;
  onClick: () => void;
  codeSnippetClass?: any;
}

interface CustomButtonState {
  codeSnippetHidden: boolean;
}

export default class CustomButton extends React.Component<CustomButtonProps, CustomButtonState> {
  render() {
    return (
      <div className="flex w-full min-w-48">
        <button onClick={this.props.onClick} className="bg-sky-800 p-2 rounded text-white font-bold w-full">{this.props.text}</button>

        {this.props.codeSnippetClass && (
          <Link href={`/?filter=${this.props.codeSnippetClass.name}`}>
            <button className="bg-sky-800 p-2 ml-2 rounded font-bold text-white">
              &lt;/&gt;
            </button>
          </Link>
        )}
      </div>
    );
  };
}