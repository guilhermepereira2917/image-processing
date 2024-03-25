export enum FilterType {
  negativeFilter,
  brightnessFilter,
}

export const FilterTypeLabel = new Map<number, string>([
  [FilterType.negativeFilter, 'Negative'],
  [FilterType.brightnessFilter, 'Brightness'],
]);