import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "./BinaryImage";
import { RgbImage, RgbPixel } from "./RgbImage";
import TresholdFilter from "./filters/TresholdFilter";

export default class RgbImageToBinaryImageConverter {
  convert(image: RgbImage): BinaryImage {
    const tresholdImage: RgbImage = new TresholdFilter().apply(image, 255 / 2);
    const binaryImage: BinaryImage = new BinaryImage();

    tresholdImage.pixels.forEach((row: RgbPixel[]) => {
      const binaryRow: BinaryPixel[] = [];

      row.forEach((pixel: RgbPixel) => {
        if (pixel.isWhite()) {
          binaryRow.push(new BinaryPixel(BinaryPixelValueEnum.white));
        } else if (pixel.isBlack()) {
          binaryRow.push(new BinaryPixel(BinaryPixelValueEnum.black));
        } else {
          throw new Error("Tried to convert RgbImage to BinaryImage but pixel was neither black or white.");
        }
      });

      binaryImage.pixels.push(binaryRow);
    });

    return binaryImage;
  }
}