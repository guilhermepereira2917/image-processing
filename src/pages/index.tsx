import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import FilterApplier from "@/classes/FilterApplier";
import { FilterType, FilterTypeLabel } from "@/classes/FilterType";
import { RgbImage } from "@/classes/RgbImage";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";
import BrightnessFilter from "@/classes/filters/BrightnessFilter";
import FlipLeftRightFilter from "@/classes/filters/FlipLeftRightFilter";
import FlipTopDownFilter from "@/classes/filters/FlipTopDownFilter";
import NegativeFilter from "@/classes/filters/NegativeFilter";
import React from "react";

export default function Home() {

  const filterApplier = new FilterApplier();
  filterApplier.onFilterApply = (image: RgbImage) => {
    drawConvertedImage(image);
  }

  function getUploadedImageCanvas(): HTMLCanvasElement {
    return document.getElementById('uploadedImageCanvas') as HTMLCanvasElement;
  }

  function getConvertedImageCanvas(): HTMLCanvasElement {
    return document.getElementById('convertedImageCanvas') as HTMLCanvasElement;
  }

  function onImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const uploadedFile: File = event.target.files[0];
    const fileToRgbImageConverter: FileToRgbImageConverter = new FileToRgbImageConverter();
    fileToRgbImageConverter.convert(uploadedFile).then((value: RgbImage) => {
      filterApplier.uploadedImage = value;

      const canvas: HTMLCanvasElement = getUploadedImageCanvas();
      const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
      rgbImageCanvasDrawer.draw(filterApplier.uploadedImage, canvas);
    });
  }

  function drawConvertedImage(convertedImage: RgbImage) {
    const canvas: HTMLCanvasElement = getConvertedImageCanvas();
    const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
    rgbImageCanvasDrawer.draw(convertedImage, canvas);
  }

  function onNegativeFilterClick(): void {
    filterApplier.applyFilter((image: RgbImage) => { return new NegativeFilter().apply(image) })
  }

  function onBrightnessFilterClick(): void {
    filterApplier.applyFilter((image: RgbImage) => {
      const brightness: number = (document.getElementById('brightnessValue') as HTMLInputElement).value as unknown as number / 100;
      return new BrightnessFilter().apply(image, brightness);
    })
  }

  function onFlipLeftRightClick(): void {
    filterApplier.applyFilter((image: RgbImage) => { return new FlipLeftRightFilter().apply(image) })
  }

  function onFlipTopDownClick(): void {
    filterApplier.applyFilter((image: RgbImage) => { return new FlipTopDownFilter().apply(image) })
  }

  function onDownloadImageClick(): void {
    if (!filterApplier.convertedImage) {
      return;
    }

    const dataUrl = getConvertedImageCanvas().toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'converted_image.png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <button onClick={onNegativeFilterClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Negative</button>
        <div className="flex flex-col">
          <input id="brightnessValue" type="range" min="0" max="1000" defaultValue="100" step="10" />
          <button onClick={onBrightnessFilterClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Brightness</button>
        </div>
        <button onClick={onFlipLeftRightClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Flip Left-Right</button>
        <button onClick={onFlipTopDownClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Flip Top-Down</button>
      </div>

      <div className="outline outline-sky-500 p-2">
        <label>Converted image</label>
        <canvas className="mt-2 outline outline-sky-500" id="convertedImageCanvas" />

        <button onClick={onDownloadImageClick} className="bg-sky-800 p-2 mt-2 rounded text-white font-bold w-full">Download Image</button>
      </div>
    </main>
  );
}
