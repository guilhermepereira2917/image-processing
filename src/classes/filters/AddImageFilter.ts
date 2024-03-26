import { RgbImage, RgbPixel } from "../RgbImage";

export default class AddImageFilter {
  apply(firstImage: RgbImage, secondImage: RgbImage): RgbImage {
    const resultImage: RgbImage = firstImage.clone();

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const otherPixel = secondImage.pixels[rowIndex][columnIndex];

        pixel.red = (pixel.red + otherPixel.red) / 2;
        pixel.green = (pixel.green + otherPixel.green) / 2;
        pixel.blue = (pixel.blue + otherPixel.blue) / 2;
      });
    });

    return resultImage;
  }
}