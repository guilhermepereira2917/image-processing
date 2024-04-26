import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import FilterApplier from "@/classes/FilterApplier";
import { RgbImage } from "@/classes/RgbImage";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";
import AddImageFilter from "@/classes/filters/AddImageFilter";
import BrightnessFilter from "@/classes/filters/BrightnessFilter";
import ConcatImageFilter from "@/classes/filters/ConcatImageFilter";
import CropImageFilter from "@/classes/filters/CropImageFilter";
import EqualizeHistogramFilter from "@/classes/filters/EqualizeHistogramFilter";
import FlipLeftRightFilter from "@/classes/filters/FlipLeftRightFilter";
import FlipTopDownFilter from "@/classes/filters/FlipTopDownFilter";
import NegativeFilter from "@/classes/filters/NegativeFilter";
import TresholdFilter from "@/classes/filters/TresholdFilter";
import HistogramChart from "@/classes/histogram/HistogramChart";
import React, { RefObject, useRef } from "react";

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

  const histogramChartRef: RefObject<HistogramChart> = useRef<HistogramChart>(null);
  function onUpdateHistogramClick(): void {
    histogramChartRef.current?.updateHistogram(filterApplier.firstUploadedImage);
  }

  const equalizedHistogramChartRef: RefObject<HistogramChart> = useRef<HistogramChart>(null);

  function onEqualizeHistogramClick(): void {
    filterApplier.applyFilterToFirstImage((firstImage: RgbImage) => {
      return new EqualizeHistogramFilter().equalize(firstImage);
    });

    histogramChartRef.current?.updateHistogram(filterApplier.firstUploadedImage);
    equalizedHistogramChartRef.current?.updateHistogram(filterApplier.convertedImage);
  }

  const filtersTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const histogramTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  function setFocusedTab(ref: RefObject<HTMLDivElement>): void {
    if (filtersTabRef.current) {
      filtersTabRef.current.classList.add("hidden");
    }

    if (histogramTabRef.current) {
      histogramTabRef.current.classList.add("hidden");
    }

    if (ref.current) {
      ref.current.classList.remove("hidden");
    }
  };

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
    <main className="w-screen p-2 flex flex-wrap justify-center items-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="p-2 outline outline-sky-500">
          <div className="flex justify-between mt-2">
            <div className="flex flex-col flex-wrap">
              <label htmlFor="firstUploadedImage">Upload an image</label>
              <input type="file" name="firstUploadedImage" accept="image/png, image/jpeg" onChange={onFirstImageChange} />
            </div>

            <button onClick={onClearFirstImageClick} className="bg-sky-800 p-2 rounded text-white font-bold w-24">Clear</button>
          </div>

          <div className="flex justify-center items-center">
            <canvas className="w-[256px] h-[256px] mt-2 outline outline-sky-500" id="firstUploadedImageCanvas" />
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex flex-col flex-wrap">
              <label htmlFor="secondUploadedImage">Upload another image</label>
              <input type="file" name="secondUploadedImage" accept="image/png, image/jpeg" onChange={onSecondImageChange} />
            </div>

            <button onClick={onClearSecondImageClick} className="bg-sky-800 p-2 rounded text-white font-bold w-24">Clear</button>
          </div>

          <div className="flex justify-center items-center">
            <canvas className="w-[256px] h-[256px] mt-2 outline outline-sky-500" id="secondUploadedImageCanvas" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex-grow p-2 flex flex-col gap-2 items-center justify-center">
        <div className="flex gap-2">
          <button onClick={() => setFocusedTab(filtersTabRef)} className="bg-slate-200 p-2">Filters</button>
          <button onClick={() => setFocusedTab(histogramTabRef)} className="bg-slate-200 p-2">Histogram</button>
        </div>

        <div ref={filtersTabRef} className="flex flex-col gap-2">
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

        <div ref={histogramTabRef} className="gap-2 w-full hidden">
          <button onClick={onUpdateHistogramClick} className="bg-sky-800 p-2 rounded text-white font-bold w-full">Update Histogram</button>

          <HistogramChart ref={histogramChartRef} />

          <button onClick={onEqualizeHistogramClick} className="bg-sky-800 p-2 rounded text-white font-bold w-full">Equalize Histogram</button>

          <HistogramChart ref={equalizedHistogramChartRef} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="p-2 outline outline-sky-500">
          <label>Converted image</label>

          <div className="flex justify-center items-center">
            <canvas className="w-[256px] h-[256px] mt-2 outline outline-sky-500" id="convertedImageCanvas" />
          </div>

          <button onClick={onSetAsFirstImageClick} className="bg-sky-800 p-2 mt-2 rounded text-white font-bold w-full">Set as First Image</button>
          <button onClick={onSetAsSecondImageClick} className="bg-sky-800 p-2 mt-2 rounded text-white font-bold w-full">Set as Second Image</button>
          <button onClick={onDownloadImageClick} className="bg-sky-800 p-2 mt-2 rounded text-white font-bold w-full">Download Image</button>
        </div>
      </div>
    </main >
  );
}
