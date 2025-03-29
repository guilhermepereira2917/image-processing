import { RgbImage, RgbPixel } from "../RgbImage";

export default class ConcatImageFilter {
  concat(firstImage: RgbImage, secondImage: RgbImage): RgbImage {
    secondImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((_, columnIndex: number) => {
        const otherPixel: RgbPixel = firstImage.pixels[rowIndex][columnIndex];

        row.push(otherPixel);
      });
    });

    return secondImage;
  }
}