import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import PixelByPixelFilter from "./BinaryPixelByPixelFilter";

export default class BinaryOrFilter {
  apply(firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage {
    const binaryOrFilter = (firstPixel: BinaryPixel, secondPixel: BinaryPixel): BinaryPixelValueEnum => {
      if (firstPixel.isWhite() || secondPixel.isWhite()) {
        return BinaryPixelValueEnum.white;
      }

      return BinaryPixelValueEnum.black;
    }

    return new PixelByPixelFilter().applyToTwoImages(firstImage, secondImage, binaryOrFilter);
  }
}