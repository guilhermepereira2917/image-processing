import { RgbImage, RgbPixel } from "../RgbImage";
import sortRgbPixels from "../RgbPixelSorter";

export default class MedianFilter {
  apply(image: RgbImage, range: number): RgbImage {
    const resultImage: RgbImage = image.clone();

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const pixels: RgbPixel[] = image.getPixelRangeWithinImageBounds(rowIndex, columnIndex, range);
        const medianPixel: RgbPixel = this.getMedianPixel(pixels);

        pixel.red = medianPixel.red;
        pixel.green = medianPixel.green;
        pixel.blue = medianPixel.blue;
      });
    });

    return resultImage;
  }

  getMedianPixel(pixels: RgbPixel[]): RgbPixel {
    sortRgbPixels(pixels);

    const half = Math.floor(pixels.length / 2);

    if (pixels.length % 2 == 0) {
      return pixels[half];
    }

    const firstMedianPixel: RgbPixel = pixels[half - 1];
    const secondMedianPixel: RgbPixel = pixels[half];

    const redMedian: number = (firstMedianPixel.red + secondMedianPixel.red) / 2;
    const greenMedian: number = (firstMedianPixel.green + secondMedianPixel.green) / 2;
    const blueMedian: number = (firstMedianPixel.blue + secondMedianPixel.blue) / 2;

    return new RgbPixel(redMedian, greenMedian, blueMedian);
  }
}