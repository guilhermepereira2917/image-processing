import { RgbImage, RgbPixel } from "../RgbImage";
import PixelByPixelFilter from "./BinaryPixelByPixelFilter";
import RgbPixelByPixelFilter from "./RgbPixelByPixelFilter";

export default class AddImageFilter {
  apply(firstImage: RgbImage, secondImage: RgbImage): RgbImage {
    const addImagesFunction = (firstPixel: RgbPixel, secondPixel: RgbPixel): void => {
      firstPixel.red = (firstPixel.red + secondPixel.red) / 2;
      firstPixel.green = (firstPixel.green + secondPixel.green) / 2;
      firstPixel.blue = (secondPixel.blue + secondPixel.blue) / 2;
    }


    return new RgbPixelByPixelFilter().applyToTwoImages(firstImage, secondImage, addImagesFunction);
  }
}