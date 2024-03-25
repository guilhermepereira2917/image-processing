import FilterInterface from "./FilterInterface";
import { FilterType } from "./FilterType";
import BrightnessFilter from "./filters/BrightnessFilter";
import NegativeFilter from "./filters/NegativeFilter";

export const FilterFactory = {
  createFilter(filterType: FilterType): FilterInterface {
    switch (filterType) {
      case FilterType.negativeFilter:
        return new NegativeFilter();
      case FilterType.brightnessFilter:
        return new BrightnessFilter();
    }
  }
}