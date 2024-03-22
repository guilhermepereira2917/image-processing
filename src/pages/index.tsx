import FileToRgbImageConverter from "@/classes/FileToRgbImageConverter";
import { FilterFactory } from "@/classes/FilterFactory";
import FilterInterface from "@/classes/FilterInterface";
import { FilterType, FilterTypeLabel } from "@/classes/FilterType";
import { RgbImage } from "@/classes/RgbImage";
import RgbImageCanvasDrawer from "@/classes/RgbImageCanvasDrawer";
import React from "react";

export default function Home() {

  let uploadedImage: RgbImage | null = null;
  let selectedFilterType: FilterType = FilterType.negativeFilter;

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

  function onFilterTypeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    selectedFilterType = FilterType[event.target.value as keyof typeof FilterType];
  }

  function onNegativeClick(): void {
    if (!uploadedImage) {
      return;
    }

    const filter: FilterInterface = FilterFactory.createFilter(FilterType.negativeFilter);
    const convertedImage: RgbImage = filter.apply(uploadedImage);
    const canvas: HTMLCanvasElement = document.getElementById('convertedImageCanvas') as HTMLCanvasElement;
    const rgbImageCanvasDrawer: RgbImageCanvasDrawer = new RgbImageCanvasDrawer();
    rgbImageCanvasDrawer.draw(convertedImage, canvas);
  }

  const filterTypes = Object
    .keys(FilterType)
    .filter((value: string): boolean => isNaN(Number(value)))
    .map((value: string, key: number) => {
      return (
        <option value={value}>{FilterTypeLabel.get(key)}</option>
      )
    });

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col justify-center outline outline-sky-500">
        <label htmlFor="uploadedImage">Upload an image</label>
        <input type="file" name="uploadedImage" accept="image/png, image/jpeg" onChange={onImageChange} />

        <canvas className="m-2 outline outline-sky-500" id="uploadedImageCanvas" />
      </div>

      <div className="w-96 flex gap-2 items-center justify-center">
        <select name="filterType" id="filterType" onChange={onFilterTypeChange}>
          {filterTypes}
        </select>
        <button onClick={onNegativeClick} className="bg-sky-800 p-2 rounded text-white font-bold">Apply Filter</button>
      </div>

      <div className="outline outline-sky-500">
        <canvas id="convertedImageCanvas" />
      </div>
    </main>
  );
}
