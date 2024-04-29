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
}

export class RgbImage {
  pixels: RgbPixel[][];

  constructor(pixels: RgbPixel[][]) {
    this.pixels = pixels;
  }

  getPixel(rowIndex: number, columnIndex: number): RgbPixel | undefined {
    if (rowIndex < 0 || rowIndex >= this.height() || columnIndex < 0 || columnIndex >= this.width()) {
      return undefined;
    }

    return this.pixels[rowIndex][columnIndex];
  }

  width(): number {
    return this.pixels[0].length;
  }

  height(): number {
    return this.pixels.length;
  }

  totalPixels(): number {
    return this.width() * this.height();
  }

  clone(): RgbImage {
    const clonedPixels: RgbPixel[][] = [];

    for (let y = 0; y < this.height(); y++) {
      const row: RgbPixel[] = [];
      for (let x = 0; x < this.width(); x++) {
        const pixel = this.pixels[y][x];
        row.push(pixel.clone());
      }
      clonedPixels.push(row);
    }

    return new RgbImage(clonedPixels);
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