import { RgbImage, RgbPixel } from "../RgbImage";
import HistogramData from "./HistogramData";

export default class HistogramDataGenerator {
  generateData(image: RgbImage): HistogramData {
    const histogramData: HistogramData = new HistogramData();

    image.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        histogramData.redDataset[pixel.red]++;
        histogramData.greenDataset[pixel.green]++;
        histogramData.blueDataset[pixel.blue]++;
      });
    });

    return histogramData;
  };
}