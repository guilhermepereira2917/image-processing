import { RgbImage, RgbPixel } from "../RgbImage";

export default class NegativeFilter {
  apply(image: RgbImage): RgbImage {
    image.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        pixel.red = 255 - pixel.red;
        pixel.blue = 255 - pixel.blue;
        pixel.green = 255 - pixel.green;
      });
    });

    return image;
  }
}