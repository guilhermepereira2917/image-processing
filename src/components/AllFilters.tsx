'use client';

import { BinaryImage } from "@/classes/BinaryImage";
import FilterApplier from "@/classes/FilterApplier";
import { calculateKernelWidth } from "@/classes/KernelCalculator";
import { RgbImage } from "@/classes/RgbImage";
import AddImagesFilter from "@/classes/filters/AddImagesFilter";
import ArithmeticAddFilter from "@/classes/filters/ArithmeticAddFilter";
import ArithmeticDivideFilter from "@/classes/filters/ArithmeticDivideFilter";
import ArithmeticMultiplyFilter from "@/classes/filters/ArithmeticMultiplyFilter";
import ArithmeticSubtractFilter from "@/classes/filters/ArithmeticSubtractFilter";
import BinaryAndFilter from "@/classes/filters/BinaryAndFilter";
import BinaryNotFilter from "@/classes/filters/BinaryNotFilter";
import BinaryOrFilter from "@/classes/filters/BinaryOrFilter";
import BinaryXorFilter from "@/classes/filters/BinaryXorFilter";
import BlurFilter from "@/classes/filters/BlurFilter";
import BrightnessFilter from "@/classes/filters/BrightnessFilter";
import ClosingFilter from "@/classes/filters/ClosingFilter";
import ConcatImageFilter from "@/classes/filters/ConcatImageFilter";
import ContourFilter from "@/classes/filters/ContourFilter";
import CropImageFilter from "@/classes/filters/CropImageFilter";
import DilationFilter from "@/classes/filters/DilationFilter";
import DivideImagesFilter from "@/classes/filters/DivideImagesFilter";
import EqualizeHistogramFilter from "@/classes/filters/EqualizeHistogramFilter";
import ErosionFilter from "@/classes/filters/ErosionFilter";
import FlipLeftRightFilter from "@/classes/filters/FlipLeftRightFilter";
import FlipTopDownFilter from "@/classes/filters/FlipTopDownFilter";
import GaussianFilter from "@/classes/filters/GaussianFilter";
import LaplacianFilter from "@/classes/filters/LaplacianFilter";
import LinearBlendingFilter from "@/classes/filters/LinearBlendingFilter";
import MaximumFilter from "@/classes/filters/MaximumFilter";
import MedianFilter from "@/classes/filters/MedianFilter";
import MinimumFilter from "@/classes/filters/MinimumFilter";
import MultiplyImagesFilter from "@/classes/filters/MultiplyImagesFilter";
import NegativeFilter from "@/classes/filters/NegativeFilter";
import OpeningFilter from "@/classes/filters/OpeningFilter";
import OrderFilter from "@/classes/filters/OrderFilter";
import PrewittFilter from "@/classes/filters/PrewittFilter";
import SmoothingFilter from "@/classes/filters/SmoothingFilter";
import SobelFilter from "@/classes/filters/SobelFilter";
import SubtractImagesFilter from "@/classes/filters/SubtractImagesFilter";
import TresholdFilter from "@/classes/filters/TresholdFilter";
import { ReactNode, RefObject, useRef } from "react";
import CustomButton from "./CustomButton";
import CustomInputNumber from "./CustomInputNumber";
import CustomSlider from "./CustomSlider";
import HistogramChart from "./HistogramChart";
import RgbImageCanvas from "./RgbImageCanvas";

export default function AllFilters(): ReactNode {
  const convertedRgbImageCanvasRef: RefObject<RgbImageCanvas> = useRef(null);

  const filterApplier = new FilterApplier();
  filterApplier.onFilterApply = (image: RgbImage) => {
    convertedRgbImageCanvasRef.current?.draw(image);
  }

  function onFirstImageChange(image: RgbImage): void {
    filterApplier.firstUploadedImage = image;
  }

  function onSecondImageChange(image: RgbImage): void {
    filterApplier.secondUploadedImage = image;
  }

  const cropImageWidthInputRef: RefObject<CustomInputNumber> = useRef(null);
  const cropImageHeightInputRef: RefObject<CustomInputNumber> = useRef(null);
  function onCropImageClick(): void {
    return filterApplier.applyFilterToFirstImage((image: RgbImage) => {
      const width: number = cropImageWidthInputRef.current?.getValue() || image.getWidth();
      const height: number = cropImageHeightInputRef.current?.getValue() || image.getHeight();

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
      return new AddImagesFilter().apply(firstImage, secondImage);
    });
  }

  function onSubtractImagesClick(): void {
    filterApplier.applyFilterToBothImages((firstImage: RgbImage, secondImage: RgbImage) => {
      return new SubtractImagesFilter().apply(firstImage, secondImage);
    });
  }

  function onMultiplyImagesClick(): void {
    filterApplier.applyFilterToBothImages((firstImage: RgbImage, secondImage: RgbImage) => {
      return new MultiplyImagesFilter().apply(firstImage, secondImage);
    });
  }

  function onDivideImagesClick(): void {
    filterApplier.applyFilterToBothImages((firstImage: RgbImage, secondImage: RgbImage) => {
      return new DivideImagesFilter().apply(firstImage, secondImage);
    });
  }

  const addImageInputRef: RefObject<CustomInputNumber> = useRef<CustomInputNumber>(null);
  function onArithmeticAddImageClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      const value: number = addImageInputRef.current?.getValue() || 0;

      return new ArithmeticAddFilter().apply(image, value);
    });
  }

  const subtractImageInputRef: RefObject<CustomInputNumber> = useRef<CustomInputNumber>(null);
  function onArithmeticSubtractImageClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      const value: number = subtractImageInputRef.current?.getValue() || 0;

      return new ArithmeticSubtractFilter().apply(image, value);
    });
  }

  const multiplyImageInputRef: RefObject<CustomInputNumber> = useRef<CustomInputNumber>(null);
  function onArithmeticMultiplyImageClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      const value: number = multiplyImageInputRef.current?.getValue() || 1;

      return new ArithmeticMultiplyFilter().apply(image, value);
    });
  }

  const divideImageInputRef: RefObject<CustomInputNumber> = useRef<CustomInputNumber>(null);
  function onArithmeticDivideImageClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      const value: number = divideImageInputRef.current?.getValue() || 1;

      return new ArithmeticDivideFilter().apply(image, value);
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

  const orderSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  const orderIndexRef: RefObject<CustomInputNumber> = useRef<CustomInputNumber>(null);
  function onOrderSliderRefClick(): void {
    const kernelSize: number = orderSliderRef.current ? orderSliderRef.current.getValue() : 1;
    const orderIndex: number = orderIndexRef.current ? orderIndexRef.current.getValue() : 1;

    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new OrderFilter().apply(image, kernelSize, orderIndex);
    });
  }

  const smoothingSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  function onSmoothingFilterClick(): void {
    const kernelSize: number = smoothingSliderRef.current ? smoothingSliderRef.current.getValue() : 1;

    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new SmoothingFilter().apply(image, kernelSize);
    });
  }

  const gaussianSliderRef: RefObject<CustomSlider> = useRef<CustomSlider>(null);
  const gaussianDeviationInputRef: RefObject<CustomInputNumber> = useRef<CustomInputNumber>(null);
  function onGaussianFilterClick(): void {
    const kernelSize: number = gaussianSliderRef.current ? gaussianSliderRef.current.getValue() : 1;
    const deviation: number = gaussianDeviationInputRef.current?.getValue() || 1;

    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new GaussianFilter().apply(image, kernelSize, deviation);
    });
  }

  function onPrewittFilterClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new PrewittFilter().apply(image);
    });
  }

  function onSobelFilterclick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new SobelFilter().apply(image);
    });
  }

  function onLaplacianFilterClick(): void {
    filterApplier.applyFilterToFirstImage((image: RgbImage): RgbImage => {
      return new LaplacianFilter().apply(image);
    });
  }

  function onDilationFilterClick(): void {
    filterApplier.applyBinaryFilterToFirstImage((image: BinaryImage): BinaryImage => {
      return new DilationFilter().apply(image);
    });
  }

  function onErosionFilterClick(): void {
    filterApplier.applyBinaryFilterToFirstImage((image: BinaryImage): BinaryImage => {
      return new ErosionFilter().apply(image);
    });
  }

  function onOpeningFilterClick(): void {
    filterApplier.applyBinaryFilterToFirstImage((image: BinaryImage): BinaryImage => {
      return new OpeningFilter().apply(image);
    });
  }

  function onClosingFilterClick(): void {
    filterApplier.applyBinaryFilterToFirstImage((image: BinaryImage): BinaryImage => {
      return new ClosingFilter().apply(image);
    });
  }

  function onContourFilterClick(): void {
    filterApplier.applyBinaryFilterToFirstImage((image: BinaryImage): BinaryImage => {
      return new ContourFilter().apply(image);
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
  const borderDetectionTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const morphologicalTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const arithmeticTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const binaryTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const histogramTabRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const tabsRef: RefObject<HTMLDivElement>[] = [
    commonTabRef, highlightTabRef, borderDetectionTabRef, morphologicalTabRef, arithmeticTabRef, binaryTabRef, histogramTabRef
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

  const firstRgbImageCanvasRef: RefObject<RgbImageCanvas> = useRef(null);
  function onSetAsFirstImageClick(): void {
    if (!filterApplier.convertedImage) {
      return;
    }

    filterApplier.firstUploadedImage = filterApplier.convertedImage.clone();
    firstRgbImageCanvasRef.current?.draw(filterApplier.firstUploadedImage);
  }

  const secondRgbImageCanvasRef: RefObject<RgbImageCanvas> = useRef(null);
  function onSetAsSecondImageClick(): void {
    if (!filterApplier.convertedImage) {
      return;
    }

    filterApplier.secondUploadedImage = filterApplier.convertedImage.clone();
    secondRgbImageCanvasRef.current?.draw(filterApplier.secondUploadedImage);
  }

  function onDownloadImageClick(): void {
    if (!filterApplier.convertedImage) {
      return;
    }

    const dataUrl = convertedRgbImageCanvasRef.current?.toDataUrl('image/png');
    if (!dataUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'converted_image.png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <main className="w-full mt-4 p-2 flex flex-wrap items-center">
      <div className="flex-1 flex flex-col justify-center items-center p-2">
        <RgbImageCanvas allowUpload={true} text="Upload First Image"
          ref={firstRgbImageCanvasRef} onImageChanged={onFirstImageChange} />

        <RgbImageCanvas allowUpload={true} text="Upload Second Image"
          ref={secondRgbImageCanvasRef} onImageChanged={onSecondImageChange} />
      </div>

      <div className="flex-1 flex-grow p-2 flex flex-col gap-2 items-center justify-center self-start">
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => setFocusedTab(commonTabRef)} className="bg-slate-200 p-2">Common</button>
          <button onClick={() => setFocusedTab(highlightTabRef)} className="bg-slate-200 p-2">Highlight</button>
          <button onClick={() => setFocusedTab(borderDetectionTabRef)} className="bg-slate-200 p-2">Border Detection</button>
          <button onClick={() => setFocusedTab(morphologicalTabRef)} className="bg-slate-200 p-2">Morphological</button>
          <button onClick={() => setFocusedTab(arithmeticTabRef)} className="bg-slate-200 p-2">Arithmetic</button>
          <button onClick={() => setFocusedTab(binaryTabRef)} className="bg-slate-200 p-2">Binary</button>
          <button onClick={() => setFocusedTab(histogramTabRef)} className="bg-slate-200 p-2">Histogram</button>
        </div>

        <div ref={commonTabRef} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <CustomInputNumber ref={cropImageWidthInputRef} placeholder="Width" min={1} max={256} />
            <CustomInputNumber ref={cropImageHeightInputRef} placeholder="Height" min={1} max={256} />
            <CustomButton text="Crop " onClick={onCropImageClick} codeSnippetClass={CropImageFilter} />
          </div>

          <CustomButton text="Negative" onClick={onNegativeFilterClick} />

          <CustomSlider text="Brightness" ref={brightnessSliderRef} onClick={onBrightnessFilterClick} min={0} max={1000} defaultValue={100} step={10}
            renderAditionalText={(value: number): string => { return ` ${value}%` }} />

          <CustomSlider text="Treshold" ref={tresholdSliderRef} onClick={onThresholdFilterClick} min={0} max={255} defaultValue={127} step={1}
            renderAditionalText={(value: number): string => { return ` ${value}` }} />

          <CustomButton text="Flip Left-Right" onClick={onFlipLeftRightClick} />
          <CustomButton text="Flip Top-Down" onClick={onFlipTopDownClick} />
          <CustomButton text="Concat" onClick={onConcatImagesClick} />

          <CustomSlider text="Linear Blending" ref={linearSliderRef} onClick={onLinearBlendingFilterClick} min={0} max={100} defaultValue={50} step={1}
            renderAditionalText={(value: number): string => { return ` ${value}%` }} />
        </div>

        <div ref={highlightTabRef} className="flex-col gap-2 hidden">
          <CustomSlider text="Blur" ref={blurSliderRef} onClick={onBlurFilterClick} min={1} max={3} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${calculateKernelWidth(value)} X ${calculateKernelWidth(value)}` }} />
          <CustomSlider text="Maximum" ref={maximumSliderRef} onClick={onMaximumFilterClick} min={1} max={3} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${calculateKernelWidth(value)} X ${calculateKernelWidth(value)}` }} />
          <CustomSlider text="Minimum" ref={minimumSliderRef} onClick={onMinimunFilterClick} min={1} max={3} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${calculateKernelWidth(value)} X ${calculateKernelWidth(value)}` }} />
          <CustomSlider text="Median" ref={medianSliderRef} onClick={onMedianFilterClick} min={1} max={3} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${calculateKernelWidth(value)} X ${calculateKernelWidth(value)}` }} />

          <CustomSlider text="Order" ref={orderSliderRef} onClick={onOrderSliderRefClick} min={1} max={3} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${calculateKernelWidth(value)} X ${calculateKernelWidth(value)}` }} >
            <CustomInputNumber ref={orderIndexRef} placeholder="Order Index" min={1} max={49} />
          </CustomSlider>

          <CustomSlider text="Smoothing" ref={smoothingSliderRef} onClick={onSmoothingFilterClick} min={1} max={3} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${calculateKernelWidth(value)} X ${calculateKernelWidth(value)}` }} />

          <CustomSlider text="Gaussian" ref={gaussianSliderRef} onClick={onGaussianFilterClick} min={1} max={3} defaultValue={1} step={1}
            renderAditionalText={(value: number): string => { return ` ${calculateKernelWidth(value)} X ${calculateKernelWidth(value)}` }} >
            <CustomInputNumber ref={gaussianDeviationInputRef} placeholder="Deviation" min={0.01} max={10} />
          </CustomSlider>
        </div>


        <div ref={borderDetectionTabRef} className="flex-col gap-2 hidden">
          <CustomButton text="Prewitt" onClick={onPrewittFilterClick} />
          <CustomButton text="Sobel" onClick={onSobelFilterclick} />
          <CustomButton text="Laplacian" onClick={onLaplacianFilterClick} />
        </div>

        <div ref={morphologicalTabRef} className="flex-col gap-2 hidden">
          <CustomButton text="Dilation" onClick={onDilationFilterClick} />
          <CustomButton text="Erosion" onClick={onErosionFilterClick} />
          <CustomButton text="Opening" onClick={onOpeningFilterClick} />
          <CustomButton text="Closing" onClick={onClosingFilterClick} />
          <CustomButton text="Countour" onClick={onContourFilterClick} />
        </div>

        <div ref={arithmeticTabRef} className="flex-col gap-2 hidden">
          <CustomButton text="Add" onClick={onAddImagesClick} />
          <CustomButton text="Subtract" onClick={onSubtractImagesClick} />
          <CustomButton text="Multiply" onClick={onMultiplyImagesClick} />
          <CustomButton text="Divide" onClick={onDivideImagesClick} />

          <div className="flex flex-col gap-1">
            <CustomInputNumber ref={addImageInputRef} placeholder="Value" min={1} max={256} />
            <CustomButton text="Add" onClick={onArithmeticAddImageClick} />
          </div>
          <div className="flex flex-col gap-1">
            <CustomInputNumber ref={subtractImageInputRef} placeholder="Value" min={1} max={256} />
            <CustomButton text="Subtract" onClick={onArithmeticSubtractImageClick} />
          </div>
          <div className="flex flex-col gap-1">
            <CustomInputNumber ref={multiplyImageInputRef} placeholder="Value" min={1} max={256} />
            <CustomButton text="Multiply" onClick={onArithmeticMultiplyImageClick} />
          </div>
          <div className="flex flex-col gap-1">
            <CustomInputNumber ref={divideImageInputRef} placeholder="Value" min={1} max={256} />
            <CustomButton text="Divide" onClick={onArithmeticDivideImageClick} />
          </div>
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

      <div className="flex-1 flex gap-2 flex-col items-center justify-center">
        <RgbImageCanvas allowUpload={false} ref={convertedRgbImageCanvasRef} text="Converted Image" />

        <CustomButton text="Set as First Image" onClick={onSetAsFirstImageClick} />
        <CustomButton text="Set as Second Image" onClick={onSetAsSecondImageClick} />
        <CustomButton text="Download Image" onClick={onDownloadImageClick} />
      </div>
    </main >
  );
}