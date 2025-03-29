import React, { ReactNode, RefObject, createRef } from "react";
import FileToRgbImageConverter from "../classes/FileToRgbImageConverter";
import { RgbImage } from "../classes/RgbImage";
import RgbImageCanvasDrawer from "../classes/RgbImageCanvasDrawer";

interface RgbImageCanvasProps {
  text?: string;
  onImageChanged?: (image: RgbImage) => void;
  allowUpload: boolean;
}

export default class RgbImageCanvas extends React.Component<RgbImageCanvasProps> {
  inputRef: RefObject<HTMLInputElement | null> = createRef();
  canvasRef: RefObject<HTMLCanvasElement | null> = createRef();

  render(): ReactNode {
    return (
      <div className="relative flex flex-col justify-center items-center">
        <p className="text-left w-full block font-semibold">{this.props.text}</p>
        <canvas ref={this.canvasRef}
          className={"w-[320px] h-[320px] outline outline-sky-500 image-rendering-pixelated " +
            (this.props.allowUpload ? "cursor-pointer" : "")}
          onClick={() => {
            if (this.props.allowUpload) {
              this.openFileUpload()
            }
          }} />
        <input ref={this.inputRef} type="file" accept="image/png, image/jpeg" className="hidden"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onFileUpload(event)} />
      </div>
    );
  }

  onFileUpload(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const uploadedFile: File = event.target.files[0];
    const fileToRgbImageConverter: FileToRgbImageConverter = new FileToRgbImageConverter();
    fileToRgbImageConverter.convert(uploadedFile).then((convertedImage: RgbImage): void => {
      this.draw(convertedImage);

      if (this.props.onImageChanged) {
        this.props.onImageChanged(convertedImage);
      }
    });
  }

  draw(image: RgbImage): void {
    if (!this.canvasRef.current) {
      return;
    }

    new RgbImageCanvasDrawer().draw(image, this.canvasRef.current);
  }

  openFileUpload(): void {
    this.inputRef.current?.click();
  }

  toDataUrl(type: string): string {
    return this.canvasRef.current?.toDataURL(type) || '';
  }
}
