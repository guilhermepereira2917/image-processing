import { RgbImage } from "./RgbImage";

export default interface FilterInterface {
  apply(image: RgbImage): RgbImage;
}