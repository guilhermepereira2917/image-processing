import { RgbImage } from "../RgbImage";
import KernelFilterApplier from "./KernelFilterApplier";

export default class LaplacianFilter {
  apply(image: RgbImage): RgbImage {
    const verticalKernel: number[][] = [
      [1, 1, 1],
      [1, -8, 1],
      [1, 1, 1],
    ];

    return new KernelFilterApplier().apply(image, verticalKernel);
  }
}