export class RgbPixel {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(red: number, green: number, blue: number, alpha?: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;

    if (alpha) {
      this.alpha = alpha;
    } else {
      this.alpha = 255;
    }
  }

  clone(): RgbPixel {
    return new RgbPixel(this.red, this.green, this.blue, this.alpha);
  }

  normalize(): void {
    this.red = Math.min(Math.max(this.red, 0), 255);
    this.green = Math.min(Math.max(this.green, 0), 255);
    this.blue = Math.min(Math.max(this.blue, 0), 255);
  }

  isWhite(): boolean {
    return this.red == 255 && this.green == 255 && this.blue == 255;
  }

  isBlack(): boolean {
    return this.red == 0 && this.green == 0 && this.blue == 0;
  }
}

export class RgbImage {
  pixels: RgbPixel[][] = [];

  getPixel(rowIndex: number, columnIndex: number): RgbPixel | undefined {
    if (rowIndex < 0 || rowIndex >= this.getHeight() || columnIndex < 0 || columnIndex >= this.getWidth()) {
      return undefined;
    }

    return this.pixels[rowIndex][columnIndex];
  }

  getPixelRange(rowIndex: number, columnIndex: number, range: number): (RgbPixel | undefined)[][] {
    const pixelRange: (RgbPixel | undefined)[][] = [];

    for (let row: number = rowIndex - range; row <= rowIndex + range; row++) {
      const pixelRangeRow: (RgbPixel | undefined)[] = [];

      for (let column: number = columnIndex - range; column <= columnIndex + range; column++) {
        pixelRangeRow.push(this.getPixel(row, column));
      }

      pixelRange.push(pixelRangeRow);
    }

    return pixelRange;
  }

  getPixelRangeWithinImageBounds(rowIndex: number, columnIndex: number, range: number): RgbPixel[] {
    return this.getPixelRange(rowIndex, columnIndex, range).flat()
      .filter((pixel: RgbPixel | undefined) => { return pixel != undefined }) as RgbPixel[];
  }

  getWidth(): number {
    return this.pixels[0].length;
  }

  getHeight(): number {
    return this.pixels.length;
  }

  getTotalPixels(): number {
    return this.getWidth() * this.getHeight();
  }

  clone(): RgbImage {
    const clonedImage: RgbImage = new RgbImage();

    for (let y = 0; y < this.getHeight(); y++) {
      const row: RgbPixel[] = [];
      for (let x = 0; x < this.getWidth(); x++) {
        const pixel = this.pixels[y][x];
        row.push(pixel.clone());
      }
      clonedImage.pixels.push(row);
    }

    return clonedImage;
  }

  normalize(): RgbImage {
    const normalizedImage = this.clone();

    normalizedImage.pixels.forEach((row: RgbPixel[]) => {
      row.forEach((pixel: RgbPixel) => {
        pixel.normalize();
      })
    });

    return normalizedImage;
  }
}