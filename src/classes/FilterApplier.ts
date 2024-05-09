import { BinaryImage } from "./BinaryImage";
import BinaryImageToRgbImageConverter from "./BinaryImageToRgbImageConverter";
import { RgbImage } from "./RgbImage";
import RgbImageToBinaryImageConverter from "./RgbImageToBinaryImageConverter";

export default class FilterApplier {
  firstUploadedImage: RgbImage | null = null;
  secondUploadedImage: RgbImage | null = null;
  convertedImage: RgbImage | null = null;

  onFilterApply: ((convertedImage: RgbImage) => void) | null = null;

  applyFilterToFirstImage(applyFilterFunction: (image: RgbImage) => RgbImage): void {
    if (!this.firstUploadedImage) {
      return;
    }

    this.setConvertedImage(applyFilterFunction(this.firstUploadedImage.clone()));
  }

  applyFilterToBothImages(applyFilterFunction: (firstImage: RgbImage, secondImage: RgbImage) => RgbImage): void {
    if (!this.firstUploadedImage || !this.secondUploadedImage) {
      return;
    }

    this.setConvertedImage(applyFilterFunction(this.firstUploadedImage.clone(), this.secondUploadedImage.clone()));
  }

  applyBinaryFilterToFirstImage(applyFilterFunction: (image: BinaryImage) => BinaryImage): void {
    if (!this.firstUploadedImage) {
      return;
    }

    const binaryImage: BinaryImage = new RgbImageToBinaryImageConverter().convert(this.firstUploadedImage);
    const appliedFilterImage: BinaryImage = applyFilterFunction(binaryImage.clone());
    const resultImage: RgbImage = new BinaryImageToRgbImageConverter().convert(appliedFilterImage);

    this.setConvertedImage(resultImage);
  }

  applyBinaryFilterToBothImages(applyFilterFunction: (firstImage: BinaryImage, secondImage: BinaryImage) => BinaryImage): void {
    if (!this.firstUploadedImage || !this.secondUploadedImage) {
      return;
    }

    const firstBinaryImage: BinaryImage = new RgbImageToBinaryImageConverter().convert(this.firstUploadedImage);
    const secondBinaryImage: BinaryImage = new RgbImageToBinaryImageConverter().convert(this.secondUploadedImage);
    const appliedFilterImage: BinaryImage = applyFilterFunction(firstBinaryImage.clone(), secondBinaryImage.clone());
    const resultImage: RgbImage = new BinaryImageToRgbImageConverter().convert(appliedFilterImage);

    this.setConvertedImage(resultImage);
  }

  setConvertedImage(convertedImage: RgbImage) {
    this.convertedImage = convertedImage.normalize();
    this.doOnFilterApply();
  }

  doOnFilterApply(): void {
    if (this.onFilterApply && this.convertedImage) {
      this.onFilterApply(this.convertedImage);
    }
  }

}