import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import { FilterType, FilterTypeLabel } from "@/classes/FilterType";
import { RgbImage } from "@/classes/RgbImage";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";
import BrightnessFilter from "@/classes/filters/BrightnessFilter";
import NegativeFilter from "@/classes/filters/NegativeFilter";
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

  function drawConvertedImage(convertedImage: RgbImage) {
    const canvas: HTMLCanvasElement = document.getElementById('convertedImageCanvas') as HTMLCanvasElement;
    const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
    rgbImageCanvasDrawer.draw(convertedImage, canvas);
  }

  function onNegativeFilterClick(): void {
    if (!uploadedImage) {
      return;
    }

    const filter: NegativeFilter = new NegativeFilter();
    drawConvertedImage(filter.apply(uploadedImage));
  }

  function onBrightnessFilterClick(): void {
    if (!uploadedImage) {
      return;
    }

    const filter: BrightnessFilter = new BrightnessFilter();
    const brightness: number = (document.getElementById('brightnessValue') as HTMLInputElement).value as unknown as number / 100;
    drawConvertedImage(filter.apply(uploadedImage, brightness));
  }

  const filterTypes = Object
    .keys(FilterType)
    .filter((value: string): boolean => isNaN(Number(value)))
    .map((value: string, key: number) => {
      return (
        <option key={value} value={value}>{FilterTypeLabel.get(key)}</option>
      )
    });

  return (
    <main className="flex flex-wrap justify-center items-center">
      <div className="flex flex-col justify-center outline p-2 outline-sky-500">
        <label htmlFor="uploadedImage">Upload an image</label>
        <input type="file" name="uploadedImage" accept="image/png, image/jpeg" onChange={onImageChange} />

        <canvas className="mt-2 outline outline-sky-500" id="uploadedImageCanvas" />
      </div>

      <div className="w-96 flex flex-col gap-2 items-center justify-center">
        <button onClick={onNegativeFilterClick} className="bg-sky-800 p-2 rounded text-white font-bold">Negative</button>
        <div className="flex flex-col">
          <input id="brightnessValue" type="range" min="0" max="1000" defaultValue="100" step="10" />
          <button onClick={onBrightnessFilterClick} className="bg-sky-800 p-2 rounded text-white font-bold">Brightness</button>
        </div>
      </div>

      <div className="outline outline-sky-500 p-2">
        <label>Converted image</label>
        <canvas className="mt-2 outline outline-sky-500" id="convertedImageCanvas" />
      </div>
    </main>
  );
}
