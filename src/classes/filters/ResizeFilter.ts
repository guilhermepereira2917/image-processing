import { RgbImage, RgbPixel } from "../RgbImage"

export default class ResizeFilter {
  resize(image: RgbImage, width: number, height: number): RgbImage {
    const resizedImage: RgbImage = new RgbImage();

    let scaleX = image.getWidth() / width;
    let scaleY = image.getHeight() / height;

    for (let y = 0; y < height; y++) {
      const row: RgbPixel[] = [];

      for (let x = 0; x < width; x++) {
        const originalPixel: RgbPixel = image.pixels[Math.floor(y * scaleY)][Math.floor(x * scaleX)];
        const pixel: RgbPixel = new RgbPixel(originalPixel.red, originalPixel.green, originalPixel.blue);

        row.push(pixel);
      }

      resizedImage.pixels.push(row);
    }
    
    return resizedImage;
  };
};