import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import BinaryPixelByPixelFilter from "./BinaryPixelByPixelFilter";

export default class BinaryAndFilter {
  apply(firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage {
    const binaryAndOperation = (firstPixel: BinaryPixel, secondPixel: BinaryPixel): BinaryPixelValueEnum => {
      if (firstPixel.isWhite() && secondPixel.isWhite()) {
        return BinaryPixelValueEnum.white;
      }

      return BinaryPixelValueEnum.black;
    }

    return new BinaryPixelByPixelFilter().applyToTwoImages(firstImage, secondImage, binaryAndOperation);
  }
}