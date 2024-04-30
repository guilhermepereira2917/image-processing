import { RgbImage, RgbPixel } from "../RgbImage"

export default class ResizeFilter {
  resize(image: RgbImage, width: number, height: number): RgbImage {
    const pixels: RgbPixel[][] = [];

    let scaleX = image.width() / width;
    let scaleY = image.height() / height;

    for (let y = 0; y < height; y++) {
      const row: RgbPixel[] = [];

      for (let x = 0; x < width; x++) {
        const originalPixel: RgbPixel = image.pixels[Math.floor(y * scaleY)][Math.floor(x * scaleX)];
        const pixel: RgbPixel = new RgbPixel(originalPixel.red, originalPixel.green, originalPixel.blue);

        row.push(pixel);
      }

      pixels.push(row);
    }
    
    return new RgbImage(pixels);
  };
};