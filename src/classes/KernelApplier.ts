import { RgbPixel } from "./RgbImage";

export default function applyKernel(pixels: (RgbPixel | undefined)[][], kernel: number[][]): RgbPixel {
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