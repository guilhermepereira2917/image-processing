import { BinaryImage } from "../BinaryImage";
import DilationFilter from "./DilationFilter";
import ErosionFilter from "./ErosionFilter";

export default class ClosingFilter {
  apply(image: BinaryImage): BinaryImage {
    const dilatedImage: BinaryImage = new DilationFilter().apply(image);
    return new ErosionFilter().apply(dilatedImage);
  }
}