export default class HistogramData {
  redDataset: number[] = Array.from(Array(255).keys()).map(n => 0);
  greenDataset: number[] = Array.from(Array(255).keys()).map(n => 0);
  blueDataset: number[] = Array.from(Array(255).keys()).map(n => 0);
};