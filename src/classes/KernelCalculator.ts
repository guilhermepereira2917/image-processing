export function calculateKernelSize(range: number): number {
  return Math.pow(calculateKernelWidth(range), 2);
}

export function calculateKernelWidth(range: number): number {
  return range * 2 + 1;
}

export function calculateKernelRange(kernelWidth: number): number {
  return (kernelWidth - 1) / 2;
}