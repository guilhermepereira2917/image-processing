import { RgbImage } from "./RgbImage";

export default class FilterApplier {
  uploadedImage: RgbImage | null = null;
  convertedImage: RgbImage | null = null;
  onFilterApply: ((convertedImage: RgbImage) => void) | null = null;

  applyFilter(applyFilterFunction: (image: RgbImage) => RgbImage): void {
    if (!this.uploadedImage) {
      return;
    }

    this.convertedImage = applyFilterFunction(this.uploadedImage);

    if (this.onFilterApply) {
      this.onFilterApply(this.convertedImage);
    }
  }
}