import { BinaryImage } from "../BinaryImage";
import DilationFilter from "./DilationFilter";
import ErosionFilter from "./ErosionFilter";

export default class OpeningFilter {
  apply(image: BinaryImage): BinaryImage {
    const erodedImage: BinaryImage = new ErosionFilter().apply(image);
    return new DilationFilter().apply(erodedImage);
  }
}