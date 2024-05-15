import React, { Component, RefObject, createRef } from "react";
import CustomButton, { CustomButtonProps } from "./CustomButton";
import InputSlider, { InputSliderProps } from "./InputSlider";

interface CustomSliderProps extends CustomButtonProps, InputSliderProps {
  renderAditionalText: (value: number) => string;
}

interface CustomSliderState {
  aditionalText: string;
}

export default class CustomSlider extends React.Component<CustomSliderProps, CustomSliderState> {
  inputRef: RefObject<InputSlider> = createRef();

  constructor(props: CustomSliderProps) {
    super(props);

    this.state = {
      aditionalText: this.getAditionalTextValue(),
    };
  }

  render(): any {
    return (
      <div className="flex flex-col">
        <InputSlider ref={this.inputRef} min={this.props.min} max={this.props.max} defaultValue={this.props.defaultValue} step={this.props.step}
          onChange={() => this.updateAditionalText()} />
        <CustomButton {...this.props as CustomButtonProps} text={this.props.text + this.state.aditionalText} />
      </div>
    );
  }

  getValue(): number {
    if (!this.inputRef.current) {
      return this.props.defaultValue;
    }

    return this.inputRef.current?.getValue();
  };

  updateAditionalText(): void {
    this.setState({
      aditionalText: this.getAditionalTextValue(),
    });
  }

  getAditionalTextValue(): string {
    return this.props.renderAditionalText(this.getValue());
  }
}