import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";

export default class BinaryPixelByPixelFilter {
  applyToOneImage(image: BinaryImage, binaryOperation: (pixel: BinaryPixel) => BinaryPixelValueEnum): BinaryImage {
    image.pixels.forEach((row: BinaryPixel[]) => {
      row.forEach((pixel: BinaryPixel) => {
        pixel.value = binaryOperation(pixel);
      });
    });

    return image;
  }

  applyToTwoImages(firstImage: BinaryImage, secondImage: BinaryImage, binaryOperation: (firstPixel: BinaryPixel, secondPixel: BinaryPixel) => BinaryPixelValueEnum): BinaryImage {
    firstImage.pixels.forEach((row: BinaryPixel[], rowIndex: number) => {
      row.forEach((firstImagePixel: BinaryPixel, columnIndex: number) => {
        const secondImagePixel: BinaryPixel = secondImage.pixels[rowIndex][columnIndex];

        firstImagePixel.value = binaryOperation(firstImagePixel, secondImagePixel);
      });
    });

    return firstImage;
  }
}