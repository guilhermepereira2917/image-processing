import { RgbImage, RgbPixel } from "../RgbImage";

export default class TresholdFilter {
  apply(image: RgbImage, treshold: number): RgbImage {
    const blackPixel = new RgbPixel(0, 0, 0);
    const whitePixel = new RgbPixel(255, 255, 255);

    image.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        let valuesHigherThanThreshold: number = 0;
        let valuesLowerThanTreshold: number = 0;

        const checkThreshold = (pixelValue: number) => {
          if (pixelValue >= treshold) {
            valuesHigherThanThreshold++;
          } else {
            valuesLowerThanTreshold++;
          }
        }

        checkThreshold(pixel.red);
        checkThreshold(pixel.green);
        checkThreshold(pixel.blue);

        if (valuesHigherThanThreshold < valuesLowerThanTreshold) {
          image.pixels[rowIndex][columnIndex] = blackPixel.clone();
        } else {
          image.pixels[rowIndex][columnIndex] = whitePixel.clone();
        }
      });
    });

    return image;
  }
}