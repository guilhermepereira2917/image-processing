'use client';

import { BarElement, CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Component, ReactNode, createRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { RgbImage } from "../RgbImage";
import HistogramData from "./HistogramData";
import HistogramDataGenerator from "./HistogramDataGenerator";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface State {
  image: RgbImage | null;
}

export default class HistogramChart extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      image: null,
    }
  }

  render(): ReactNode {
    let histogramData = new HistogramData();

    if (this.state.image) {
      histogramData = new HistogramDataGenerator().generateData(this.state.image);
    }

    const data = {
      labels: Array.from({ length: 255 }, (_, index) => String(index)),
      datasets: [
        {
          fill: true,
          label: 'Red',
          data: histogramData.redDataset,
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
        },
        {
          fill: true,
          label: 'Green',
          data: histogramData.greenDataset,
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
        },
        {
          fill: true,
          label: 'Blue',
          data: histogramData.blueDataset,
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
        },
      ],
    };

    return (
      <div className="border">
        <Bar data={data} />
      </div>
    );
  };

  updateHistogram(image: RgbImage | null) {
    this.setState({ image: image });
  };
};