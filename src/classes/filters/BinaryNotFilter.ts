import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import PixelByPixelFilter from "./BinaryPixelByPixelFilter";

export default class BinaryNotFilter {
  apply(image: BinaryImage): BinaryImage {
    const binaryNotFilter = (pixel: BinaryPixel): BinaryPixelValueEnum => {
      if (pixel.isBlack()) {
        return BinaryPixelValueEnum.white;
      }

      return BinaryPixelValueEnum.black;
    }

    return new PixelByPixelFilter().applyToOneImage(image, binaryNotFilter);
  }
}