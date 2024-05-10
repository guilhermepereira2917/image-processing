import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import BinaryFilter from "./BinaryFilter";

export default class BinaryOrFilter {
  apply(firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage {
    const binaryOrFilter = (firstPixel: BinaryPixel, secondPixel: BinaryPixel): BinaryPixelValueEnum => {
      if (firstPixel.isWhite() || secondPixel.isWhite()) {
        return BinaryPixelValueEnum.white;
      }

      return BinaryPixelValueEnum.black;
    }

    return new BinaryFilter().applyToTwoImages(firstImage, secondImage, binaryOrFilter);
  }
}