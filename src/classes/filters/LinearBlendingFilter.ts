import { RgbImage, RgbPixel } from "../RgbImage";

export default class LinearBlendingFilter {
  blend(firstImage: RgbImage, secondImage: RgbImage, blendingRatio: number): RgbImage {
    const firstImageBlendingRatio: number = blendingRatio;
    const secondImageBlendingRatio: number = 1 - blendingRatio;

    const resultImage: RgbImage = firstImage.clone();

    resultImage.pixels.forEach((row: RgbPixel[], rowIndex: number) => {
      row.forEach((pixel: RgbPixel, columnIndex: number) => {
        const firstImagePixel: RgbPixel = firstImage.pixels[rowIndex][columnIndex];
        const secondImagePixel: RgbPixel = secondImage.pixels[rowIndex][columnIndex];

        pixel.red = firstImagePixel.red * firstImageBlendingRatio + secondImagePixel.red * secondImageBlendingRatio;
        pixel.green = firstImagePixel.green * firstImageBlendingRatio + secondImagePixel.green * secondImageBlendingRatio;
        pixel.blue = firstImagePixel.blue * firstImageBlendingRatio + secondImagePixel.blue * secondImageBlendingRatio;
      });
    });

    return resultImage;
  };
};