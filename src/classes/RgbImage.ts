export class RgbPixel {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(red: number, green: number, blue: number, alpha: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  clone(): RgbPixel {
    return new RgbPixel(this.red, this.green, this.blue, this.alpha);
  }
}

export class RgbImage {
  pixels: RgbPixel[][];

  constructor(pixels: RgbPixel[][]) {
    this.pixels = pixels;
  }

  width(): number {
    return this.pixels[0].length;
  }

  height(): number {
    return this.pixels.length;
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
}