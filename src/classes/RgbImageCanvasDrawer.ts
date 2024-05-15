import { RgbImage } from "./RgbImage";

export default class RgbImageCanvasDrawer {
  draw(image: RgbImage | null, canvas: HTMLCanvasElement): void {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (!context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!image) {
      return;
    }

    canvas.width = image.getWidth();
    canvas.height = image.getHeight();

    const imageData: ImageData = context.createImageData(canvas.width, canvas.height);

    for (let y = 0; y < image.pixels.length; y++) {
      for (let x = 0; x < image.pixels[y].length; x++) {
        const pixel = image.pixels[y][x];
        const startIndex = (y * canvas.width + x) * 4;
        imageData.data[startIndex] = pixel.red;
        imageData.data[startIndex + 1] = pixel.green;
        imageData.data[startIndex + 2] = pixel.blue;
        imageData.data[startIndex + 3] = pixel.alpha;
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
}