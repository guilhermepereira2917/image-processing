import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/obsidian.css";
import React, { RefObject, createRef } from "react";

hljs.registerLanguage("typescript", typescript);

interface CodeSnippetProps {
  codeSnippetClass: any;
  classname?: string;
}

export default class CodeSnippet extends React.Component<CodeSnippetProps> {
  codeRef: RefObject<HTMLElement> = createRef();

  constructor(props: CodeSnippetProps) {
    super(props);
  }

  render() {
    console.log('rendered');
    
    return (
      <pre>
        <code ref={this.codeRef} className={`typescript ${this.props.classname}`}>
          {`${this.props.codeSnippetClass.toString()}`}
        </code>
      </pre>
    );
  }

  async componentDidMount() {
    this.update();
  }

  async componentDidUpdate() {
    this.update();  
  }

  update() {
    console.log('tried to update')
    if (this.codeRef.current) {
      console.log('updated')
      hljs.highlightBlock(this.codeRef.current);
    }
  }
}