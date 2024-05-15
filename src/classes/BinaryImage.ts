class BinaryImage {
  pixels: BinaryPixel[][] = [];

  getPixel(rowIndex: number, columnIndex: number): BinaryPixel | undefined {
    if (rowIndex < 0 || rowIndex >= this.getHeight() || columnIndex < 0 || columnIndex >= this.getWidth()) {
      return undefined;
    }

    return this.pixels[rowIndex][columnIndex];
  }

  clone(): BinaryImage {
    const clonedImage: BinaryImage = new BinaryImage();

    for (let y = 0; y < this.getHeight(); y++) {
      const row: BinaryPixel[] = [];
      for (let x = 0; x < this.getWidth(); x++) {
        const pixel = this.pixels[y][x];
        row.push(pixel.clone());
      }
      clonedImage.pixels.push(row);
    }

    return clonedImage;
  }

  getWidth(): number {
    return this.pixels[0].length;
  }

  getHeight(): number {
    return this.pixels.length;
  }
}

class BinaryPixel {
  value: BinaryPixelValueEnum;

  constructor(value: BinaryPixelValueEnum) {
    this.value = value;
  }

  clone(): BinaryPixel {
    return new BinaryPixel(this.value);
  }

  isBlack(): boolean {
    return this.value == BinaryPixelValueEnum.black;
  }

  isWhite(): boolean {
    return this.value == BinaryPixelValueEnum.white;
  }
}

enum BinaryPixelValueEnum {
  black,
  white
}

export { BinaryImage, BinaryPixel, BinaryPixelValueEnum }