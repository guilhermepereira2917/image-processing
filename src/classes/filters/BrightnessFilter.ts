import { RgbImage, RgbPixel } from "../RgbImage";

export default class BrightnessFilter {
  apply(image: RgbImage, brightness: number): RgbImage {
    image.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        pixel.red = pixel.red * brightness;
        pixel.blue = pixel.blue * brightness;
        pixel.green = pixel.green * brightness;
      });
    });

    return image;
  }
}