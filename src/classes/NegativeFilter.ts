import FilterInterface from "./FilterInterface";
import { RgbImage, RgbPixel } from "./RgbImage";

export default class NegativeFilter implements FilterInterface {
  apply(image: RgbImage) {
    const clonedImage: RgbImage = image.clone();

    clonedImage.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        pixel.red = 255 - pixel.red;
        pixel.blue = 255 - pixel.blue;
        pixel.green = 255 - pixel.green;
      });
    });

    return clonedImage;
  }
}