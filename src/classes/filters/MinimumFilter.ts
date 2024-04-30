import { RgbImage, RgbPixel } from "../RgbImage";

export default class MinimumFilter {
  apply(image: RgbImage, kernelSize: number): RgbImage {
    const resultImage: RgbImage = image.clone();

    resultImage.pixels.forEach((row: RgbPixel[], bluredImageRowIndex: number) => {
      row.forEach((resultImagePixel: RgbPixel, bluredImageColumnIndex: number) => {
        const kernelPixels: (RgbPixel | undefined)[] =
          image.getPixelRange(bluredImageRowIndex, bluredImageColumnIndex, kernelSize)
            .reduce((previous: (RgbPixel | undefined)[], current: (RgbPixel | undefined)[]): (RgbPixel | undefined)[] => {
              return previous.concat(current);
            });

        const minimumPixel: RgbPixel | undefined = kernelPixels.reduce((previous: RgbPixel | undefined, current: RgbPixel | undefined): RgbPixel | undefined => {
          if (!previous) {
            return current;
          }

          if (!current) {
            return previous;
          }

          const previousTotalValue: number = previous.red + previous.green + previous.blue;
          const currentTotalValue: number = current.red + current.green + current.blue;

          if (previousTotalValue > currentTotalValue) {
            return current;
          }

          return previous;
        });

        if (minimumPixel) {
          resultImagePixel.red = minimumPixel.red;
          resultImagePixel.green = minimumPixel.green;
          resultImagePixel.blue = minimumPixel.blue;

        }
      });
    });


    return resultImage;
  }
}