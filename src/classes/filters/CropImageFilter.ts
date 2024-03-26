import { RgbImage, RgbPixel } from "../RgbImage";

export default class CropImageFilter {
  crop(image: RgbImage, x: number, y: number, width: number, height: number): RgbImage {
    const cropedPixels: RgbPixel[][] = [];

    for (let j = y; j < Math.min(image.height(), y + height); j++) {
      const row: RgbPixel[] = [];
      for (let i = x; i < Math.min(image.width(), x + width); i++) {
        const pixel = image.pixels[j][i];
        row.push(pixel.clone());
      }
      cropedPixels.push(row);
    }

    return new RgbImage(cropedPixels);
  }
}