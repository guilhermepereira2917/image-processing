import { RgbImage, RgbPixel } from "../RgbImage";
import RgbPixelByPixelFilter from "./RgbPixelByPixelFilter";

export default class ArithmeticDivideFilter {
  apply(image: RgbImage, value: number): RgbImage {
    const arithmeticDivideOperation = (pixel: RgbPixel): void => {
      pixel.red /= value;
      pixel.green /= value;
      pixel.blue /= value;
    }

    return new RgbPixelByPixelFilter().applyToOneImage(image, arithmeticDivideOperation);
  }
}