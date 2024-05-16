import { RgbImage, RgbPixel } from "../RgbImage";
import RgbPixelByPixelFilter from "./RgbPixelByPixelFilter";

export default class ArithmeticMultiplyFilter {
  apply(image: RgbImage, value: number): RgbImage {
    const arithmeticMultiplyOperation = (pixel: RgbPixel): void => {
      pixel.red *= value;
      pixel.green *= value;
      pixel.blue *= value;
    }

    return new RgbPixelByPixelFilter().applyToOneImage(image, arithmeticMultiplyOperation);
  }
}