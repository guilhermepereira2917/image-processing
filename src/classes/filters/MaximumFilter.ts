import { RgbImage, RgbPixel } from "../RgbImage";

export default class MaximumFilter {
  apply(image: RgbImage, kernelSize: number): RgbImage {
    const resultImage: RgbImage = image.clone();

    resultImage.pixels.forEach((row: RgbPixel[], bluredImageRowIndex: number) => {
      row.forEach((resultImagePixel: RgbPixel, bluredImageColumnIndex: number) => {
        const kernelPixels: (RgbPixel | undefined)[] =
          image.getPixelRange(bluredImageRowIndex, bluredImageColumnIndex, kernelSize)
            .reduce((previous: (RgbPixel | undefined)[], current: (RgbPixel | undefined)[]): (RgbPixel | undefined)[] => {
              return previous.concat(current);
            });

        const maximumPixel: RgbPixel | undefined = kernelPixels.reduce((previous: RgbPixel | undefined, current: RgbPixel | undefined): RgbPixel | undefined => {
          if (!previous) {
            return current;
          }

          if (!current) {
            return previous;
          }

          const previousTotalValue: number = previous.red + previous.green + previous.blue;
          const currentTotalValue: number = current.red + current.green + current.blue;

          if (previousTotalValue > currentTotalValue) {
            return previous;
          }

          return current;
        });

        if (maximumPixel) {
          resultImagePixel.red = maximumPixel.red;
          resultImagePixel.green = maximumPixel.green;
          resultImagePixel.blue = maximumPixel.blue;

        }
      });
    });


    return resultImage;
  }
}