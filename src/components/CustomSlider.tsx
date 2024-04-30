import React, { RefObject, createRef, useEffect, useRef } from "react";
import CustomButton, { CustomButtonProps } from "./CustomButton";

interface CustomSliderProps extends CustomButtonProps {
  min: number;
  max: number;
  defaultValue: number;
  step: number;

  renderAditionalText: (value: number) => string;
}

interface CustomSliderState {
  aditionalText: string;
}

export default class CustomSlider extends React.Component<CustomSliderProps, CustomSliderState> {
  inputRef: RefObject<HTMLInputElement> | null = createRef();

  constructor(props: CustomSliderProps) {
    super(props);

    this.state = {
      aditionalText: this.getAditionalTextValue(),
    };
  }

  render(): any {
    return (
      <div className="flex flex-col">
        <input ref={this.inputRef} type="range" min={this.props.min} max={this.props.max} defaultValue={this.props.defaultValue} step={this.props.step}
          onChange={() => this.updateAditionalText()} />
        <CustomButton {...this.props as CustomButtonProps} text={this.props.text + this.state.aditionalText} />
      </div>
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

  updateAditionalText(): void {
    this.setState({
      aditionalText: this.getAditionalTextValue(),
    });
  }

  getAditionalTextValue(): string {
    return this.props.renderAditionalText(this.getValue());
  }
}