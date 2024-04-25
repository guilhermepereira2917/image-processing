import { RgbImage, RgbPixel } from "../RgbImage";
import HistogramData from "../histogram/HistogramData";
import HistogramDataGenerator from "../histogram/HistogramDataGenerator";

export default class EqualizeHistogramFilter {
  equalize(image: RgbImage): RgbImage {
    const histogramData: HistogramData = new HistogramDataGenerator().generateData(image);

    const getCdf = (histogram: number[]): number[] => {
      const cdf: number[] = [histogram[0]];

      for (let i = 1; i < histogram.length; i++) {
        cdf[i] = cdf[i - 1] + histogram[i];
      }

      for (let i = 0; i < cdf.length; i++) {
        cdf[i] = cdf[i] / image.totalPixels() * 255;
      }

      return cdf;
    };

    const redCdf: number[] = getCdf(histogramData.redDataset);
    const greenCdf: number[] = getCdf(histogramData.greenDataset);
    const blueCdf: number[] = getCdf(histogramData.blueDataset);

    image.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        pixel.red = Math.round(redCdf[pixel.red]);
        pixel.green = Math.round(greenCdf[pixel.green]);
        pixel.blue = Math.round(blueCdf[pixel.blue]);
      });
    });

    return image;
  };
};