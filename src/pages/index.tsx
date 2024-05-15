import { BinaryImage } from "@/classes/BinaryImage";
import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import FilterApplier from "@/classes/FilterApplier";
import { RgbImage } from "@/classes/RgbImage";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";
import AddImageFilter from "@/classes/filters/AddImageFilter";
import BinaryAndFilter from "@/classes/filters/BinaryAndFilter";
import BinaryNotFilter from "@/classes/filters/BinaryNotFilter";
import BinaryOrFilter from "@/classes/filters/BinaryOrFilter";
import BinaryXorFilter from "@/classes/filters/BinaryXorFilter";
import BlurFilter from "@/classes/filters/BlurFilter";
import BrightnessFilter from "@/classes/filters/BrightnessFilter";
import ConcatImageFilter from "@/classes/filters/ConcatImageFilter";
import CropImageFilter from "@/classes/filters/CropImageFilter";
import EqualizeHistogramFilter from "@/classes/filters/EqualizeHistogramFilter";
import FlipLeftRightFilter from "@/classes/filters/FlipLeftRightFilter";
import FlipTopDownFilter from "@/classes/filters/FlipTopDownFilter";
import LinearBlendingFilter from "@/classes/filters/LinearBlendingFilter";
import MaximumFilter from "@/classes/filters/MaximumFilter";
import MedianFilter from "@/classes/filters/MedianFilter";
import MinimumFilter from "@/classes/filters/MinimumFilter";
import NegativeFilter from "@/classes/filters/NegativeFilter";
import TresholdFilter from "@/classes/filters/TresholdFilter";
import CustomButton from "@/components/CustomButton";
import CustomSlider from "@/components/CustomSlider";
import HistogramChart from "@/components/HistogramChart";
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

  const brightnessSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onBrightnessFilterClick(): void {
    const brightnessValue: number = brightnessSliderRef.current ? brightnessSliderRef.current.getValue() / 100 : 100;

    filterApplier.applyFilterToFirstImage((image: RgbImage) => {
      return new BrightnessFilter().apply(image, brightnessValue);
    })
  }

  const tresholdSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onThresholdFilterClick(): void {
    const tresholdValue: number = tresholdSliderRef.current ? tresholdSliderRef.current.getValue() : 127;

    filterApplier.applyFilterToFirstImage((image: RgbImage) => {
      return new TresholdFilter().apply(image, tresholdValue);
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

  const linearSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onLinearBlendingFilterClick(): void {
    const blendingRatio: number = (linearSliderRef.current ? linearSliderRef.current.getValue() : 50) / 100;

    filterApplier.applyFilterToBothImages((firstImage: RgbImage, secondImage: RgbImage) => {
      return new LinearBlendingFilter().blend(firstImage, secondImage, blendingRatio);
    });
  }

  const blurSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onBlurFilterClick(): void {
    const kernelSize: number = blurSliderRef.current ? blurSliderRef.current.getValue() : 1;

    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new BlurFilter().blur(image, kernelSize);
    });
  }

  const maximumSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onMaximumFilterClick(): void {
    const kernelSize: number = maximumSliderRef.current ? maximumSliderRef.current.getValue() : 1;

    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new MaximumFilter().apply(image, kernelSize);
    });
  }

  const minimumSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onMinimunFilterClick(): void {
    const kernelSize: number = minimumSliderRef.current ? minimumSliderRef.current.getValue() : 1;

    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new MinimumFilter().apply(image, kernelSize);
    });
  }

  const medianSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onMedianFilterClick(): void {
    const kernelSize: number = medianSliderRef.current ? medianSliderRef.current.getValue() : 1;

    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new MedianFilter().apply(image, kernelSize);
    });
  }

  function onBinaryAndFilterClick(): void {
    filterApplier.applyBinaryFilterToBothImages((firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage => {
      return new BinaryAndFilter().apply(firstImage, secondImage);
    });
  }

  function onBinaryOrFilterClick(): void {
    filterApplier.applyBinaryFilterToBothImages((firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage => {
      return new BinaryOrFilter().apply(firstImage, secondImage);
    });
  }

  function onBinaryNotFilterClick(): void {
    filterApplier.applyBinaryFilterToFirstImage((image: BinaryImage): BinaryImage => {
      return new BinaryNotFilter().apply(image);
    });
  }

  function onBinaryXorFilterClick(): void {
    filterApplier.applyBinaryFilterToBothImages((firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage => {
      return new BinaryXorFilter().apply(firstImage, secondImage);
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

  const commonTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const highlightTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const binaryTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const histogramTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const tabsRef: RefObject<HTMLDivElement>[] = [
    commonTabRef, highlightTabRef, binaryTabRef, histogramTabRef
  ];

  function setFocusedTab(ref: RefObject<HTMLDivElement>): void {
    tabsRef.forEach((tabRef: RefObject<HTMLDivElement>) => {
      if (tabRef.current) {
        tabRef.current.classList.add("hidden");
      }
    });

    if (ref.current) {
      ref.current.classList.remove("hidden");

      if (ref.current != histogramTabRef.current) {
        ref.current.classList.add("flex");
      }
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
    <main className="w-full mt-4 p-2 flex flex-wrap justify-center items-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="p-2 border border-sky-500 w-full">
          <div className="flex justify-between mt-2">
            <div className="flex flex-col flex-wrap">
              <label htmlFor="firstUploadedImage">Upload an image</label>
              <input type="file" name="firstUploadedImage" accept="image/png, image/jpeg" onChange={onFirstImageChange} />
            </div>

            <CustomButton text="Clear" onClick={onClearFirstImageClick} />
          </div>

          <div className="flex justify-center items-center">
            <canvas className="w-[256px] h-[256px] mt-2 outline outline-sky-500" id="firstUploadedImageCanvas" />
          </div>

          <div className="flex justify-between mt-2">
            <div className="flex flex-col flex-wrap">
              <label htmlFor="secondUploadedImage">Upload another image</label>
              <input type="file" name="secondUploadedImage" accept="image/png, image/jpeg" onChange={onSecondImageChange} />
            </div>

            <CustomButton text="Clear" onClick={onClearSecondImageClick} />
          </div>

          <div className="flex justify-center items-center">
            <canvas className="w-[256px] h-[256px] mt-2 outline outline-sky-500" id="secondUploadedImageCanvas" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex-grow p-2 flex flex-col gap-2 items-center justify-center">
        <div className="flex gap-2">
          <button onClick={() => setFocusedTab(commonTabRef)} className="bg-slate-200 p-2">Common</button>
          <button onClick={() => setFocusedTab(highlightTabRef)} className="bg-slate-200 p-2">Highlight</button>
          <button onClick={() => setFocusedTab(binaryTabRef)} className="bg-slate-200 p-2">Binary</button>
          <button onClick={() => setFocusedTab(histogramTabRef)} className="bg-slate-200 p-2">Histogram</button>
        </div>

        <div ref={commonTabRef} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <input type="number" id="cropImageWidthInput" placeholder="width" className="border w-full" />
            <input type="number" id="cropImageHeightInput" placeholder="height" className="border w-full" />
            <CustomButton text="Crop " onClick={onCropImageClick} codeSnippetClass={CropImageFilter} />
          </div>

          <CustomButton text="Negative" onClick={onNegativeFilterClick} />

          <CustomSlider text="Brightness" ref={brightnessSliderRef} onClick={onBrightnessFilterClick} min={0} max={1000} defaultValue={100} step={10}
            renderAditionalText={(value: number): string => { return ` ${value}%` }} />

          <CustomSlider text="Treshold" ref={tresholdSliderRef} onClick={onThresholdFilterClick} min={0} max={255} defaultValue={127} step={1}
            renderAditionalText={(value: number): string => { return ` ${value}` }} />

          <CustomButton text="Flip Left-Right" onClick={onFlipLeftRightClick} />
          <CustomButton text="Flip Top-Down" onClick={onFlipTopDownClick} />
          <CustomButton text="Add" onClick={onAddImagesClick} />
          <CustomButton text="Concat" onClick={onConcatImagesClick} />

          <CustomSlider text="Linear Blending" ref={linearSliderRef} onClick={onLinearBlendingFilterClick} min={0} max={100} defaultValue={50} step={1}
            renderAditionalText={(value: number): string => { return ` ${value}%` }} />
        </div>

        <div ref={highlightTabRef} className="flex-col gap-2 hidden">
          <CustomSlider text="Blur" ref={blurSliderRef} onClick={onBlurFilterClick} min={1} max={5} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${value} X ${value}` }} />
          <CustomSlider text="Maximum" ref={maximumSliderRef} onClick={onMaximumFilterClick} min={1} max={5} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${value} X ${value}` }} />
          <CustomSlider text="Minimum" ref={minimumSliderRef} onClick={onMinimunFilterClick} min={1} max={5} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${value} X ${value}` }} />
          <CustomSlider text="Median" ref={medianSliderRef} onClick={onMedianFilterClick} min={1} max={5} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${value} X ${value}` }} />

        </div>

        <div ref={binaryTabRef} className="flex-col gap-2 hidden">
          <CustomButton text="AND" onClick={onBinaryAndFilterClick} />
          <CustomButton text="OR" onClick={onBinaryOrFilterClick} />
          <CustomButton text="NOT" onClick={onBinaryNotFilterClick} />
          <CustomButton text="XOR" onClick={onBinaryXorFilterClick} />
        </div>

        <div ref={histogramTabRef} className="gap-2 w-full hidden">
          <CustomButton text="Update Histogram" onClick={onUpdateHistogramClick} />
          <HistogramChart ref={histogramChartRef} />

          <CustomButton text="Equalize Histogram" onClick={onEqualizeHistogramClick} />
          <HistogramChart ref={equalizedHistogramChartRef} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="p-2 border border-sky-500">
          <label>Converted image</label>

          <div className="flex justify-center items-center">
            <canvas className="w-[256px] h-[256px] mt-2 outline outline-sky-500" id="convertedImageCanvas" />
          </div>

          <div className="flex flex-column flex-wrap gap-2 mt-2">
            <CustomButton text="Set as First Image" onClick={onSetAsFirstImageClick} />
            <CustomButton text="Sett as Second Image" onClick={onSetAsSecondImageClick} />
            <CustomButton text="Download Image" onClick={onDownloadImageClick} />
          </div>
        </div>
      </div>
    </main >
  );
}
