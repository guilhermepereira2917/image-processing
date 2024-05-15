import { RgbImage, RgbPixel } from "../RgbImage";

export default class CropImageFilter {
  crop(image: RgbImage, x: number, y: number, width: number, height: number): RgbImage {
    const croppedImage: RgbImage = new RgbImage();

    for (let j = y; j < Math.min(image.getHeight(), y + height); j++) {
      const row: RgbPixel[] = [];

      for (let i = x; i < Math.min(image.getWidth(), x + width); i++) {
        const pixel = image.pixels[j][i];
        row.push(pixel.clone());
      }

      croppedImage.pixels.push(row);
    }

    return croppedImage;
  }
}