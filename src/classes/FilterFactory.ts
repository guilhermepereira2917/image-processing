import FilterInterface from "./FilterInterface";
import NegativeFilter from "./NegativeFilter";

export enum FilterType {
  negativeFilter
}

export class FilterFactory {
  createFilter(filterType: FilterType): FilterInterface {
    switch (filterType) {
      case FilterType.negativeFilter:
        return new NegativeFilter();
    }
  }
}