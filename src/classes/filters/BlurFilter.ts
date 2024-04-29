import { RgbImage, RgbPixel } from "../RgbImage";

export default class BlurFilter {
  blur(image: RgbImage): RgbImage {
    const bluredImage: RgbImage = image.clone();

    bluredImage.pixels.forEach((row: RgbPixel[], bluredImageRowIndex: number) => {
      row.forEach((bluredImagePixel: RgbPixel, bluredImageColumnIndex: number) => {
        let red: number = 0;
        let green: number = 0;
        let blue: number = 0;
        let pixelCount: number = 0;

        for (let row = bluredImageRowIndex - 1; row <= bluredImageRowIndex + 1; row++) {
          for (let column = bluredImageColumnIndex - 1; column <= bluredImageColumnIndex + 1; column++) {
            const pixel: RgbPixel | undefined = image.getPixel(row, column);

            if (!pixel) {
              continue;
            }

            red += pixel.red;
            green += pixel.green;
            blue += pixel.blue;

            pixelCount++;
          }
        }

        bluredImagePixel.red = red / pixelCount;
        bluredImagePixel.green = green / pixelCount;
        bluredImagePixel.blue = blue / pixelCount;
      });
    });

    return bluredImage;
  }
}