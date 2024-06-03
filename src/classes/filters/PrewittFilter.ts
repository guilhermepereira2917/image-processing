import { RgbImage } from "../RgbImage";
import AddImagesFilter from "./AddImagesFilter";
import KernelFilterApplier from "./KernelFilterApplier";

export default class PrewittFilter {
  apply(image: RgbImage, range: number): RgbImage {
    const horizontalKernel: number[][] = [
      [1, 1, 1],
      [0, 0, 0],
      [-1, -1, -1],
    ];

    const verticalKernel: number[][] = [
      [1, 0, -1],
      [1, 0, -1],
      [1, 0, -1],
    ];

    const imageFirstPass: RgbImage = new KernelFilterApplier().apply(image, range, horizontalKernel);
    const imageSecondPass: RgbImage = new KernelFilterApplier().apply(image, range, verticalKernel);

    return new AddImagesFilter().apply(imageFirstPass, imageSecondPass);
  }
}