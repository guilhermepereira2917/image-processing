import { BinaryImage } from "../BinaryImage";
import BinaryXorFilter from "./BinaryXorFilter";
import ErosionFilter from "./ErosionFilter";

export default class ContourFilter {
  apply(image: BinaryImage): BinaryImage {
    const erodedImage: BinaryImage = new ErosionFilter().apply(image);
    return new BinaryXorFilter().apply(image, erodedImage);
  }
}