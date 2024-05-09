import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";

export default class BinaryFilter {
  apply(firstImage: BinaryImage, secondImage: BinaryImage, binaryOperation: (firstPixel: BinaryPixel, secondPixel: BinaryPixel) => BinaryPixelValueEnum): BinaryImage {

    firstImage.pixels.forEach((row: BinaryPixel[], rowIndex) => {
      row.forEach((firstImagePixel: BinaryPixel, columnIndex) => {
        const secondImagePixel: BinaryPixel = secondImage.pixels[rowIndex][columnIndex];

        firstImagePixel.value = binaryOperation(firstImagePixel, secondImagePixel);
      });
    });

    return firstImage;
  }
}