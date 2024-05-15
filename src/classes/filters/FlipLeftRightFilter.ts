import { RgbImage, RgbPixel } from "../RgbImage";

export default class FlipLeftRightFilter {
  apply(image: RgbImage): RgbImage {
    const clonedImage: RgbImage = image.clone();

    clonedImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const otherPixel = image.pixels[rowIndex][image.getWidth() - columnIndex - 1];

        pixel.red = otherPixel.red;
        pixel.green = otherPixel.green;
        pixel.blue = otherPixel.blue;
      });
    });

    return clonedImage;
  }
}