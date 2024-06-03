import { RgbImage } from "../RgbImage";
import AddImagesFilter from "./AddImagesFilter";
import KernelFilterApplier from "./KernelFilterApplier";

export default class SobelFilter {
  apply(image: RgbImage): RgbImage {
    const horizontalKernel: number[][] = [
      [1, 2, 1],
      [0, 0, 0],
      [-1, -2, -1],
    ];

    const verticalKernel: number[][] = [
      [1, 0, -1],
      [2, 0, -2],
      [1, 0, -1],
    ];

    const imageFirstPass: RgbImage = new KernelFilterApplier().apply(image, horizontalKernel);
    const imageSecondPass: RgbImage = new KernelFilterApplier().apply(image, verticalKernel);

    return new AddImagesFilter().apply(imageFirstPass, imageSecondPass);
  }
}