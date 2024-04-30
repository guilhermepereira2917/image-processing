import React from "react";

type CustomButtonProps = {
  text: string;
  onClick: () => void;
}

export default class CustomButton extends React.Component<CustomButtonProps> {
  render() {
    return (
      <button onClick={this.props.onClick} className="bg-sky-800 p-2 rounded text-white font-bold w-full min-w-32">{this.props.text}</button>
    );
  }
}