import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import FilterApplier from "@/classes/FilterApplier";
import { RgbImage } from "@/classes/RgbImage";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";
import AddImageFilter from "@/classes/filters/AddImageFilter";
import BrightnessFilter from "@/classes/filters/BrightnessFilter";
import ConcatImageFilter from "@/classes/filters/ConcatImageFilter";
import CropImageFilter from "@/classes/filters/CropImageFilter";
import FlipLeftRightFilter from "@/classes/filters/FlipLeftRightFilter";
import FlipTopDownFilter from "@/classes/filters/FlipTopDownFilter";
import NegativeFilter from "@/classes/filters/NegativeFilter";
import TresholdFilter from "@/classes/filters/TresholdFilter";
import React from "react";

export default function Home() {

  const filterApplier = new FilterApplier();
  filterApplier.onFilterApply = (image: RgbImage) => {
    drawConvertedImage(image);
  }

  function getFirstUploadedImageCanvas(): HTMLCanvasElement {
    return document.getElementById('firstUploadedImageCanvas') as HTMLCanvasElement;
  }

  function getSecondUploadedImageCanvas(): HTMLCanvasElement {
    return document.getElementById('secondUploadedImageCanvas') as HTMLCanvasElement;
  }

  function getConvertedImageCanvas(): HTMLCanvasElement {
    return document.getElementById('convertedImageCanvas') as HTMLCanvasElement;
  }

  function drawFirstUploadedImage(): void {
    const canvas: HTMLCanvasElement = getFirstUploadedImageCanvas();
    const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
    rgbImageCanvasDrawer.draw(filterApplier.firstUploadedImage, canvas);
  }

  function drawSecondUploadedImage(): void {
    const canvas: HTMLCanvasElement = getSecondUploadedImageCanvas();
    const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
    rgbImageCanvasDrawer.draw(filterApplier.secondUploadedImage, canvas);
  }

  function setFirstUploadedImage(image: RgbImage | null) {
    filterApplier.firstUploadedImage = image;
    drawFirstUploadedImage();
  }

  function setSecondUploadedImage(image: RgbImage | null) {
    filterApplier.secondUploadedImage = image;
    drawSecondUploadedImage();
  }

  function onFirstImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const uploadedFile: File = event.target.files[0];
    const fileToRgbImageConverter: FileToRgbImageConverter = new FileToRgbImageConverter();
    fileToRgbImageConverter.convert(uploadedFile).then((value: RgbImage) => {
      setFirstUploadedImage(value);
    });
  }

  function onSecondImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const uploadedFile: File = event.target.files[0];
    const fileToRgbImageConverter: FileToRgbImageConverter = new FileToRgbImageConverter();
    fileToRgbImageConverter.convert(uploadedFile).then((value: RgbImage) => {
      setSecondUploadedImage(value);
    });
  }

  function drawConvertedImage(convertedImage: RgbImage) {
    const canvas: HTMLCanvasElement = getConvertedImageCanvas();
    const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
    rgbImageCanvasDrawer.draw(convertedImage, canvas);
  }

  function onCropImageClick(): void {
    return filterApplier.applyFilterToFirstImage((image: RgbImage) => {
      const width: number = (document.getElementById('cropImageWidthInput') as HTMLInputElement).value as unknown as number;
      const height: number = (document.getElementById('cropImageHeightInput') as HTMLInputElement).value as unknown as number;

      return new CropImageFilter().crop(image, 0, 0, width, height);
    });
  }

  function onNegativeFilterClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage) => { return new NegativeFilter().apply(image) })
  }

  function onBrightnessFilterClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage) => {
      const brightness: number = (document.getElementById('brightnessValue') as HTMLInputElement).value as unknown as number / 100;
      return new BrightnessFilter().apply(image, brightness);
    })
  }

  function onThresholdFilterClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage) => {
      const thresold: number = (document.getElementById('tresholdValue') as HTMLInputElement).value as unknown as number;
      return new TresholdFilter().apply(image, thresold);
    });
  }

  function onFlipLeftRightClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage) => { return new FlipLeftRightFilter().apply(image) });
  }

  function onFlipTopDownClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage) => { return new FlipTopDownFilter().apply(image) });
  }

  function onAddImagesClick(): void {
    filterApplier.applyFilterToBothImages((firstImage: RgbImage, secondImage: RgbImage) => {
      return new AddImageFilter().apply(firstImage, secondImage);
    });
  }

  function onConcatImagesClick(): void {
    filterApplier.applyFilterToBothImages((firstImage: RgbImage, secondImage: RgbImage) => {
      return new ConcatImageFilter().concat(firstImage, secondImage);
    });
  }

  function onClearFirstImageClick(): void {
    setFirstUploadedImage(null);
  }

  function onClearSecondImageClick(): void {
    setSecondUploadedImage(null);
  }

  function onSetAsFirstImageClick(): void {
    if (!filterApplier.convertedImage) {
      return;
    }

    setFirstUploadedImage(filterApplier.convertedImage.clone());
  }

  function onSetAsSecondImageClick(): void {
    if (!filterApplier.convertedImage) {
      return;
    }

    setSecondUploadedImage(filterApplier.convertedImage.clone());
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

  return (
    <main className="flex flex-wrap justify-center items-center">
      <div className="flex-1 flex flex-col justify-center outline p-2 outline-sky-500">
        <div className="flex justify-between mt-2">
          <div className="flex flex-col flex-wrap">
            <label htmlFor="firstUploadedImage">Upload an image</label>
            <input type="file" name="firstUploadedImage" accept="image/png, image/jpeg" onChange={onFirstImageChange} />
          </div>

          <button onClick={onClearFirstImageClick} className="bg-sky-800 p-2 rounded text-white font-bold w-24">Clear</button>
        </div>

        <canvas className="mt-2 outline outline-sky-500" id="firstUploadedImageCanvas" />

        <div className="flex justify-between mt-2">
          <div className="flex flex-col flex-wrap">
            <label htmlFor="secondUploadedImage">Upload another image</label>
            <input type="file" name="secondUploadedImage" accept="image/png, image/jpeg" onChange={onSecondImageChange} />
          </div>

          <button onClick={onClearSecondImageClick} className="bg-sky-800 p-2 rounded text-white font-bold w-24">Clear</button>
        </div>

        <canvas className="mt-2 outline outline-sky-500 w-full" id="secondUploadedImageCanvas" />
      </div>

      <div className="flex-1 w-96 flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col">
          <input type="number" id="cropImageWidthInput" placeholder="width" className="border w-36" />
          <input type="number" id="cropImageHeightInput" placeholder="height" className="border w-36" />
          <button onClick={onCropImageClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Crop Image</button>
        </div>

        <button onClick={onNegativeFilterClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Negative</button>

        <div className="flex flex-col">
          <input id="brightnessValue" type="range" min="0" max="1000" defaultValue="100" step="10" />
          <button onClick={onBrightnessFilterClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Brightness</button>
        </div>

        <div className="flex flex-col">
          <input id="tresholdValue" type="range" min="0" max="255" defaultValue="127" step="1" />
          <button onClick={onThresholdFilterClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Treshold</button>
        </div>

        <button onClick={onFlipLeftRightClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Flip Left-Right</button>
        <button onClick={onFlipTopDownClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Flip Top-Down</button>
        <button onClick={onAddImagesClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Add Images</button>
        <button onClick={onConcatImagesClick} className="bg-sky-800 p-2 rounded text-white font-bold w-36">Concat Images</button>
      </div>

      <div className="flex-1 outline outline-sky-500 p-2">
        <label>Converted image</label>
        <canvas className="mt-2 outline outline-sky-500 w-full" id="convertedImageCanvas" />


        <button onClick={onSetAsFirstImageClick} className="bg-sky-800 p-2 mt-2 rounded text-white font-bold w-full">Set as First Image</button>
        <button onClick={onSetAsSecondImageClick} className="bg-sky-800 p-2 mt-2 rounded text-white font-bold w-full">Set as Second Image</button>
        <button onClick={onDownloadImageClick} className="bg-sky-800 p-2 mt-2 rounded text-white font-bold w-full">Download Image</button>
      </div>
    </main>
  );
}
