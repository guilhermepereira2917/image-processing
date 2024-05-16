import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import BinaryPixelByPixelFilter from "./BinaryPixelByPixelFilter";

export default class BinaryNotFilter {
  apply(image: BinaryImage): BinaryImage {
    const binaryNotFilter = (pixel: BinaryPixel): BinaryPixelValueEnum => {
      if (pixel.isBlack()) {
        return BinaryPixelValueEnum.white;
      }

      return BinaryPixelValueEnum.black;
    }

    return new BinaryPixelByPixelFilter().applyToOneImage(image, binaryNotFilter);
  }
}