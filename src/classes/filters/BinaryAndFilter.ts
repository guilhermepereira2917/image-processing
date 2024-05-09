import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import BinaryFilter from "./BinaryFilter";

export default class BinaryAndFilter {
  apply(firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage {
    const binaryAndOperation = (firstPixel: BinaryPixel, secondPixel: BinaryPixel): BinaryPixelValueEnum => {
      if (firstPixel.isWhite() && secondPixel.isWhite()) {
        return BinaryPixelValueEnum.white;
      }

      return BinaryPixelValueEnum.black;
    }

    return new BinaryFilter().apply(firstImage, secondImage, binaryAndOperation);
  }
}