import { BinaryImage, BinaryPixel } from "./BinaryImage";
import { RgbImage, RgbPixel } from "./RgbImage";

export default class BinaryImageToRgbImageConverter {
  convert(image: BinaryImage): RgbImage {
    const rgbImage: RgbImage = new RgbImage();

    image.pixels.forEach((row: BinaryPixel[]) => {
      const rgbRow: RgbPixel[] = [];

      row.forEach((pixel: BinaryPixel) => {
        if (pixel.isWhite()) {
          rgbRow.push(new RgbPixel(255, 255, 255));
        } else {
          rgbRow.push(new RgbPixel(0, 0, 0));
        }
      });

      rgbImage.pixels.push(rgbRow);
    });

    return rgbImage;
  }
}