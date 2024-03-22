import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import { FilterFactory, FilterType } from "@/classes/FilterFactory";
import FilterInterface from "@/classes/FilterInterface";
import { RgbImage } from "@/classes/RgbImage";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";
import React from "react";

export default function Home() {

  let uploadedImage: RgbImage | null = null;

  function onImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const uploadedFile: File = event.target.files[0];
    const fileToRgbImageConverter: FileToRgbImageConverter = new FileToRgbImageConverter();
    fileToRgbImageConverter.convert(uploadedFile).then((value: RgbImage) => {
      uploadedImage = value;

      const canvas: HTMLCanvasElement = document.getElementById('uploadedImageCanvas') as HTMLCanvasElement;
      const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
      rgbImageCanvasDrawer.draw(uploadedImage, canvas);
    });
  }

  function onNegativeClick(): void {
    if (!uploadedImage) {
      return;
    }

    const filter: FilterInterface = new FilterFactory().createFilter(FilterType.negativeFilter);
    const convertedImage: RgbImage = filter.apply(uploadedImage);
    const canvas: HTMLCanvasElement = document.getElementById('convertedImageCanvas') as HTMLCanvasElement;
    const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
    rgbImageCanvasDrawer.draw(convertedImage, canvas);
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <h1>Image Processing</h1>

      <label htmlFor="uploadedImage">Upload an image</label>
      <input type="file" name="uploadedImage" accept="image/png, image/jpeg" onChange={onImageChange} />

      <canvas id="uploadedImageCanvas" />

      <button onClick={onNegativeClick}>Negative</button>

      <canvas id="convertedImageCanvas" />
    </main>
  );
}
