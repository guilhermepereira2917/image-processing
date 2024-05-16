import React, { RefObject, createRef } from "react";
import { ReactNode } from "react";

interface CustomInputNumberProps {
  placeholder: string;
  min: number;
  max: number;
}

export default class CustomInputNumber extends React.Component<CustomInputNumberProps> {
  inputRef: RefObject<HTMLInputElement> = createRef();

  render(): ReactNode {
    return (
      <input ref={this.inputRef} type="number" id="cropImageWidthInput" min={this.props.min} max={this.props.max}
        placeholder={this.props.placeholder} className="border border-gray-400 rounded p-1 w-full"
        onBlur={(): void => this.validateValue()} />
    );
  }

  getValue(): number {
    if (!this.inputRef.current) {
      return 0;
    }

    return this.inputRef.current.valueAsNumber;
  }

  validateValue(): void {
    if (!this.inputRef.current) {
      return;
    }

    const value: number = this.getValue();

    if (value < this.props.min) {
      this.setValue(this.props.min);
    } else if (value > this.props.max) {
      this.setValue(this.props.max);
    }
  }

  setValue(value: number): void {
    if (this.inputRef.current) {
      this.inputRef.current.value = value as unknown as string;
    }
  }
}