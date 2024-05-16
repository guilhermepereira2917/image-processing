import { RgbImage, RgbPixel } from "../RgbImage";
import RgbPixelByPixelFilter from "./RgbPixelByPixelFilter";

export default class DivideImagesFilter {
  apply(firstImage: RgbImage, secondImage: RgbImage): RgbImage {
    const divideImagesFunction = (firstPixel: RgbPixel, secondPixel: RgbPixel): void => {
      firstPixel.red /= secondPixel.red;
      firstPixel.green /= secondPixel.green;
      firstPixel.blue /= secondPixel.blue;
    }

    return new RgbPixelByPixelFilter().applyToTwoImages(firstImage, secondImage, divideImagesFunction);
  }
}