import FilterInterface from "./FilterInterface";
import { FilterType } from "./FilterType";
import NegativeFilter from "./NegativeFilter";

export const FilterFactory = {
  createFilter(filterType: FilterType): FilterInterface {
    switch (filterType) {
      case FilterType.negativeFilter:
        return new NegativeFilter();
    }
  }
}