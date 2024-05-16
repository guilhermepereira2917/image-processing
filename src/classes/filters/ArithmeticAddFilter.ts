import { RgbImage, RgbPixel } from "../RgbImage";
import RgbPixelByPixelFilter from "./RgbPixelByPixelFilter";

export default class ArithmeticAddFilter {
  apply(image: RgbImage, value: number): RgbImage {
    const arithmeticAddOperation = (pixel: RgbPixel): void => {
      pixel.red += value;
      pixel.green += value;
      pixel.blue += value;
    }

    return new RgbPixelByPixelFilter().applyToOneImage(image, arithmeticAddOperation);
  }
}