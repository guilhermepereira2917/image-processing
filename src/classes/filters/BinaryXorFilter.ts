import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import BinaryPixelByPixelFilter from "./BinaryPixelByPixelFilter";

export default class BinaryXorFilter {
  apply(firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage {
    const binaryXorOperation = (firstPixel: BinaryPixel, secondPixel: BinaryPixel): BinaryPixelValueEnum => {
      if (firstPixel.isWhite() != secondPixel.isWhite()) {
        return BinaryPixelValueEnum.white;
      }

      return BinaryPixelValueEnum.black;
    }

    return new BinaryPixelByPixelFilter().applyToTwoImages(firstImage, secondImage, binaryXorOperation);
  }
}