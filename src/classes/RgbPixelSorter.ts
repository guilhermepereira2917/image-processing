import { RgbPixel } from "./RgbImage";

export default function sortRgbPixels(pixels: RgbPixel[]): RgbPixel[] {
  return pixels.sort((firstPixel: RgbPixel, secondPixel: RgbPixel): number => {
    const firstPixelSum: number = firstPixel.red + firstPixel.green + firstPixel.blue;
    const secondPixelSum: number = secondPixel.red + secondPixel.green + secondPixel.blue;

    if (firstPixelSum < secondPixelSum) {
      return -1;
    } else if (firstPixelSum == secondPixelSum) {
      return 0;
    } else {
      return 1;
    }
  });
}