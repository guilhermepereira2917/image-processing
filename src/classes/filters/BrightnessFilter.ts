import FilterInterface from "../FilterInterface";
import { RgbImage, RgbPixel } from "../RgbImage";

export default class BrightnessFilter implements FilterInterface {
  brightness: number = 0.5;

  apply(image: RgbImage): RgbImage {
    const clonedImage: RgbImage = image.clone();

    clonedImage.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        pixel.red = pixel.red * this.brightness;
        pixel.blue = pixel.blue * this.brightness;
        pixel.green = pixel.green * this.brightness;
      });
    });

    return clonedImage;
  }
}