import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";

export default class BinaryAndFilter {
  apply(firstImage: BinaryImage, secondImage: BinaryImage): BinaryImage {

    firstImage.pixels.forEach((row: BinaryPixel[], rowIndex) => {
      row.forEach((firstImagePixel: BinaryPixel, columnIndex) => {
        const secondImagePixel: BinaryPixel = secondImage.pixels[rowIndex][columnIndex];

        if (firstImagePixel.isWhite() && secondImagePixel.isWhite()) {
          firstImagePixel.value = BinaryPixelValueEnum.white;
        } else {
          firstImagePixel.value = BinaryPixelValueEnum.black;
        }
      });
    });

    return firstImage;
  }
}