class BinaryImage {
  pixels: BinaryPixel[][] = [];

  getPixel(rowIndex: number, columnIndex: number): BinaryPixel | undefined {
    if (rowIndex < 0 || rowIndex >= this.height() || columnIndex < 0 || columnIndex >= this.width()) {
      return undefined;
    }

    return this.pixels[rowIndex][columnIndex];
  }

  clone(): BinaryImage {
    const clonedImage: BinaryImage = new BinaryImage();

    for (let y = 0; y < this.height(); y++) {
      const row: BinaryPixel[] = [];
      for (let x = 0; x < this.width(); x++) {
        const pixel = this.pixels[y][x];
        row.push(pixel.clone());
      }
      clonedImage.pixels.push(row);
    }

    return clonedImage;
  }

  width(): number {
    return this.pixels[0].length;
  }

  height(): number {
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