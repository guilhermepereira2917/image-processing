import { RgbImage, RgbPixel } from "../RgbImage";

export default class RgbPixelByPixelFilter {
  applyToOneImage(image: RgbImage, rgbOperation: (pixel: RgbPixel) => void): RgbImage {
    image.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        rgbOperation(pixel);
      });
    });

    return image;
  }

  applyToTwoImages(firstImage: RgbImage, secondImage: RgbImage, rgbOperation: (firstPixel: RgbPixel, secondPixel: RgbPixel) => void): RgbImage {
    firstImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((firstImagePixel: RgbPixel, columnIndex: number) => {
        const secondImagePixel: RgbPixel = secondImage.pixels[rowIndex][columnIndex];

        rgbOperation(firstImagePixel, secondImagePixel);
      });
    });

    return firstImage;
  }
}