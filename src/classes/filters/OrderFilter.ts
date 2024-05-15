import { calculateKernelSize } from "../KernelCalculator";
import { RgbImage, RgbPixel } from "../RgbImage";
import sortRgbPixels from "../RgbPixelSorter";

export default class OrderFilter {
  apply(image: RgbImage, range: number, order: number): RgbImage {
    const resultImage: RgbImage = image.clone();

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const pixels: RgbPixel[] = image.getPixelRangeWithinImageBounds(rowIndex, columnIndex, range);
        sortRgbPixels(pixels);

        const orderIndex: number = this.remap(order, 1, calculateKernelSize(range), 0, pixels.length - 1);
        const orderPixel: RgbPixel = pixels[orderIndex];

        pixel.red = orderPixel.red;
        pixel.green = orderPixel.green;
        pixel.blue = orderPixel.blue;
      });
    });

    return resultImage;
  }

  remap(value: number, low1: number, high1: number, low2: number, high2: number) {
    return Math.round(low2 + (high2 - low2) * (value - low1) / (high1 - low1));
  }
}