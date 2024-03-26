import { RgbImage } from "./RgbImage";

export default class FilterApplier {
  firstUploadedImage: RgbImage | null = null;
  secondUploadedImage: RgbImage | null = null;
  convertedImage: RgbImage | null = null;

  onFilterApply: ((convertedImage: RgbImage) => void) | null = null;

  applyFilterToFirstImage(applyFilterFunction: (image: RgbImage) => RgbImage): void {
    if (!this.firstUploadedImage) {
      return;
    }

    this.convertedImage = applyFilterFunction(this.firstUploadedImage.clone()).normalize();

    if (this.onFilterApply) {
      this.onFilterApply(this.convertedImage);
    }
  }

  applyFilterToBothImages(applyFilterFunction: (firstImage: RgbImage, secondImage: RgbImage) => RgbImage): void {
    if (!this.firstUploadedImage || !this.secondUploadedImage) {
      return;
    }

    this.convertedImage = applyFilterFunction(this.firstUploadedImage.clone(), this.secondUploadedImage.clone()).normalize();

    if (this.onFilterApply) {
      this.onFilterApply(this.convertedImage);
    }
  }

}