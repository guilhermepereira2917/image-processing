import { RgbImage, RgbPixel } from "../RgbImage";

export default class MedianFilter {
  apply(image: RgbImage, range: number): RgbImage {
    const resultImage: RgbImage = image.clone();

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const pixels: RgbPixel[] = image.getPixelRange(rowIndex, columnIndex, range).flat()
          .filter((pixel: RgbPixel | undefined) => { return pixel != undefined }) as RgbPixel[];

        const medianPixel: RgbPixel = this.getMedianPixel(pixels);

        pixel.red = medianPixel.red;
        pixel.green = medianPixel.green;
        pixel.blue = medianPixel.blue;
      });
    });

    return resultImage;
  }

  getMedianPixel(pixels: RgbPixel[]): RgbPixel {
    this.sortPixels(pixels);

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

  sortPixels(pixels: RgbPixel[]): void {
    pixels.sort((firstPixel: RgbPixel, secondPixel: RgbPixel): number => {
      const firstPixelSum: number = firstPixel.red + firstPixel.green + firstPixel.blue;
      const secondPixelSum: number = secondPixel.red + secondPixel.green + secondPixel.blue;

      if (firstPixelSum < secondPixelSum) {
        return -1;
      } else if (firstPixelSum == secondPixelSum) {
        return 0;
      } else {
        return 1;
      }
    });
  }
}