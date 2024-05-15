import React, { ReactNode, RefObject, createRef } from "react";

export interface InputSliderProps {
  min: number;
  max: number;
  defaultValue: number;
  step: number;

  onChange?: () => void;
}

export default class InputSlider extends React.Component<InputSliderProps> {
  inputRef: RefObject<HTMLInputElement> = createRef();

  render(): ReactNode {
    return (
      <input ref={this.inputRef} type="range"
        min={this.props.min}
        max={this.props.max}
        defaultValue={this.props.defaultValue}
        step={this.props.step}
        onChange={this.doOnChange} />
    );
  }

  getValue(): number {
    const inputRefValue: number | undefined = this.inputRef?.current?.valueAsNumber;

    if (inputRefValue == 0) {
      return 0;
    }

    if (!inputRefValue) {
      return this.props.defaultValue;
    }

    return inputRefValue;
  }

  doOnChange(): void {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
}