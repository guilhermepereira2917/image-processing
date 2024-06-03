import { calculateKernelRange } from "../KernelCalculator";
import { RgbImage, RgbPixel } from "../RgbImage";

export default class KernelFilterApplier {
  apply(image: RgbImage, kernel: number[][]): RgbImage {
    const resultImage: RgbImage = image.clone();

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const pixels: (RgbPixel | undefined)[][] = image.getPixelRange(rowIndex, columnIndex, calculateKernelRange(kernel.length));
        const pixelWithKernelApplied = this.applyKernel(pixels, kernel);

        pixel.red = pixelWithKernelApplied.red;
        pixel.green = pixelWithKernelApplied.green;
        pixel.blue = pixelWithKernelApplied.blue;
      });
    });

    return resultImage;
  }

  applyKernel(pixels: (RgbPixel | undefined)[][], kernel: number[][]): RgbPixel {
    const appliedKernelPixel: RgbPixel = new RgbPixel(0, 0, 0);

    pixels.forEach((row: (RgbPixel | undefined)[], rowIndex: number): void => {
      row.forEach((pixel: RgbPixel | undefined, columnIndex: number): void => {
        if (!pixel) {
          return;
        }

        const kernelValue: number = kernel[rowIndex][columnIndex];

        appliedKernelPixel.red += pixel.red * kernelValue;
        appliedKernelPixel.green += pixel.green * kernelValue;
        appliedKernelPixel.blue += pixel.blue * kernelValue;
      });
    });

    return appliedKernelPixel;
  }
}