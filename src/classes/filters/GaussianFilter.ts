import applyKernel from "../KernelApplier";
import { calculateKernelWidth } from "../KernelCalculator";
import { RgbImage, RgbPixel } from "../RgbImage";

export default class GaussianFilter {
  apply(image: RgbImage, range: number, deviation: number): RgbImage {
    const resultImage: RgbImage = image.clone();
    const gaussianKernel: number[][] = this.getGaussianKernel(range, deviation);

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const pixels: (RgbPixel | undefined)[][] = image.getPixelRange(rowIndex, columnIndex, range);
        const pixelWithKernelApplied = applyKernel(pixels, gaussianKernel);

        pixel.red = pixelWithKernelApplied.red;
        pixel.green = pixelWithKernelApplied.green;
        pixel.blue = pixelWithKernelApplied.blue;
      });
    });

    return resultImage;
  }

  getGaussianKernel(range: number, deviation: number): number[][] {
    const gaussianKernel: number[][] = [];

    for (let i: number = 0; i < calculateKernelWidth(range); i++) {
      gaussianKernel.push([]);
    }

    for (let row: number = -range; row <= range; row++) {
      for (let column: number = -range; column <= range; column++) {
        const realRow: number = row + range;
        const realColumn: number = column + range;

        gaussianKernel[realRow][realColumn] = this.getGaussianValue(row, column, deviation);
      }
    }

    return this.normalizeGaussianKernel(gaussianKernel);
  }

  normalizeGaussianKernel(gaussianKernel: number[][]): number[][] {
    const allElementsSum: number = gaussianKernel.flat()
      .reduce((previousValue: number, currentValue: number): number => {
        return previousValue + currentValue;
      });

    return gaussianKernel.map((row: number[]): number[] => {
      return row.map((value: number): number => {
        return value / allElementsSum;
      });
    });
  }

  getGaussianValue(x: number, y: number, deviation: number): number {
    return 1 / (2 * Math.PI * deviation * deviation) * Math.pow(Math.E, -((x * x + y * y) / (2 * deviation * deviation)));
  }
}