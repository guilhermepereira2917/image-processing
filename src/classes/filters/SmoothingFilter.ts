import { RgbImage, RgbPixel } from "../RgbImage";
import sortRgbPixels from "../RgbPixelSorter";

export default class SmoothingFilter {
  apply(image: RgbImage, range: number): RgbImage {
    const resultImage: RgbImage = image.clone();

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const middlePixel: RgbPixel = image.getPixel(rowIndex, columnIndex) as RgbPixel;
        const neighbors: RgbPixel[] = image.getPixelRangeWithinImageBounds(rowIndex, columnIndex, range)
          .filter((neighborPixel: RgbPixel) => { return neighborPixel != middlePixel });

        sortRgbPixels(neighbors);

        const minimumPixel: RgbPixel = neighbors[0];
        const maximumPixel: RgbPixel = neighbors[neighbors.length - 1];

        const pixelSum: number = middlePixel.red + middlePixel.green + middlePixel.blue;
        const minimumPixelSum: number = minimumPixel.red + minimumPixel.green + minimumPixel.blue;
        const maximumPixelSum: number = maximumPixel.red + maximumPixel.green + maximumPixel.blue;

        let smoothingPixel: RgbPixel = middlePixel;
        if (pixelSum < minimumPixelSum) {
          smoothingPixel = minimumPixel;
        } else if (pixelSum > maximumPixelSum) {
          smoothingPixel = maximumPixel;
        }
        
        pixel.red = smoothingPixel.red;
        pixel.green = smoothingPixel.green;
        pixel.blue = smoothingPixel.blue;
      });
    });

    return resultImage;
  }
}