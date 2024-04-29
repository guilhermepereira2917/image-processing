import { RgbImage, RgbPixel } from "../RgbImage";

export default class BlurFilter {
  blur(image: RgbImage, range: number): RgbImage {
    const bluredImage: RgbImage = image.clone();

    bluredImage.pixels.forEach((row: RgbPixel[], bluredImageRowIndex: number) => {
      row.forEach((bluredImagePixel: RgbPixel, bluredImageColumnIndex: number) => {
        let red: number = 0;
        let green: number = 0;
        let blue: number = 0;
        let pixelCount: number = 0;

        image.getPixelRange(bluredImageRowIndex, bluredImageColumnIndex, range).forEach((imageRow: (RgbPixel | undefined)[]) => {
          imageRow.forEach((pixel: RgbPixel | undefined) => {
            if (!pixel) {
              return;
            }

            red += pixel.red;
            green += pixel.green;
            blue += pixel.blue;

            pixelCount++;
          });
        });

        bluredImagePixel.red = red / pixelCount;
        bluredImagePixel.green = green / pixelCount;
        bluredImagePixel.blue = blue / pixelCount;
      });
    });

    return bluredImage;
  }
}