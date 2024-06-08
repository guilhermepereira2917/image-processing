import { BinaryImage, BinaryPixel, BinaryPixelValueEnum } from "../BinaryImage";
import { calculateKernelRange } from "../KernelCalculator";

export default class DilationFilter {
  apply(image: BinaryImage): BinaryImage {
    const structuringElement: number[] = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ].flat();

    const resultImage: BinaryImage = image.clone();
    resultImage.pixels.forEach((row: BinaryPixel[], rowIndex): void => {
      row.forEach((pixel: BinaryPixel, columnIndex: number): void => {
        const neighbors: (BinaryPixel | undefined)[][] = image.getPixelRange(rowIndex, columnIndex, calculateKernelRange(structuringElement.length));
        const hasWhiteNeighbor: boolean = neighbors.flat().some((neighborPixel: BinaryPixel | undefined, neighborIndex: number): boolean => {
          if (!neighborPixel) {
            return false;
          }

          if (structuringElement[neighborIndex] == 0) {
            return false;
          }

          return neighborPixel.isWhite();
        });

        pixel.value = hasWhiteNeighbor ? BinaryPixelValueEnum.white : BinaryPixelValueEnum.black;
      });
    });

    return resultImage;
  }
}