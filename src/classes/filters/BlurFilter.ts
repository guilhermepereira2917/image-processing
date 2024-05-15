import { RgbImage, RgbPixel } from "../RgbImage";

export default class BlurFilter {
  blur(image: RgbImage, range: number): RgbImage {
    const blurredImage: RgbImage = image.clone();

    blurredImage.pixels.forEach((row: RgbPixel[], blurredImageRowIndex: number) => {
      row.forEach((blurredImagePixel: RgbPixel, blurredImageColumnIndex: number) => {
        let red: number = 0;
        let green: number = 0;
        let blue: number = 0;
        let pixelCount: number = 0;

        image.getPixelRange(blurredImageRowIndex, blurredImageColumnIndex, range).forEach((imageRow: (RgbPixel | undefined)[]) => {
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

        blurredImagePixel.red = red / pixelCount;
        blurredImagePixel.green = green / pixelCount;
        blurredImagePixel.blue = blue / pixelCount;
      });
    });

    return blurredImage;
  }
}