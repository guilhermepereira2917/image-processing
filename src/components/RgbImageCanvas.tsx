import React, { ReactNode, RefObject, createRef } from "react";
import CustomButton from "./CustomButton";
import { RgbImage } from "@/classes/RgbImage";
import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";

interface RgbImageCanvasProps {
  text?: string;
  onImageChanged?: (image: RgbImage) => void;
  allowUpload: boolean;
}

export default class RgbImageCanvas extends React.Component<RgbImageCanvasProps> {
  inputRef: RefObject<HTMLInputElement> = createRef();
  canvasRef: RefObject<HTMLCanvasElement> = createRef();

  render(): ReactNode {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <canvas ref={this.canvasRef} className="w-[256px] h-[256px] mt-2 outline outline-sky-500" />
        {this.props.allowUpload && <>
          <input ref={this.inputRef} type="file" accept="image/png, image/jpeg" className="hidden"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onFileUpload(event)} />
          <CustomButton text={this.props.text || "Upload"} onClick={() => this.openFileUpload()} />
        </>}
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
