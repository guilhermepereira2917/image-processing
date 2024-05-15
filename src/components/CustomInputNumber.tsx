import React, { RefObject, createRef } from "react";
import { ReactNode } from "react";

interface CustomInputNumberProps {
  placeholder: string;
}

export default class CustomInputNumber extends React.Component<CustomInputNumberProps> {
  inputRef: RefObject<HTMLInputElement> = createRef();

  render(): ReactNode {
    return (
      <input ref={this.inputRef} type="number" id="cropImageWidthInput"
        placeholder={this.props.placeholder} className="border w-full" />
    );
  }

  getValue(): number {
    if (!this.inputRef.current) {
      return 0;
    }

    return this.inputRef.current.valueAsNumber;
  }
}