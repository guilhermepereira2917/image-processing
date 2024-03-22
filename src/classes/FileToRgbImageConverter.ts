import { RgbImage, RgbPixel } from "./RgbImage";

export default class FileToRgbImageConverter {
  convert(file: File): Promise<RgbImage> {
    return new Promise<RgbImage>((resolve: (value: RgbImage) => void) => {
      const fileReader: FileReader = new FileReader;

      fileReader.onload = (event: ProgressEvent<FileReader>): void => {
        const image = new Image();

        image.onload = (): void => {
          const canvas: HTMLCanvasElement = document.createElement('canvas');
          const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

          if (!context) {
            return;
          }

          canvas.width = image.width;
          canvas.height = image.height;

          context.drawImage(image, 0, 0);

          const imageData: ImageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const data: Uint8ClampedArray = imageData.data;

          const pixels: RgbPixel[][] = []
          let pixelsRow: RgbPixel[] = [];

          for (let i = 0; i < data.length; i += 4) {
            const red: number = data[i];
            const green: number = data[i + 1];
            const blue: number = data[i + 2];
            const alpha: number = data[i + 3];

            const pixel: RgbPixel = new RgbPixel(red, green, blue, alpha);
            pixelsRow.push(pixel);

            if (pixelsRow.length >= canvas.width) {
              pixels.push(pixelsRow);
              pixelsRow = [];
            }
          }

          resolve(new RgbImage(pixels));
        }

        image.src = event.target?.result as string;
      }

      fileReader.readAsDataURL(file);
    });
  }
}