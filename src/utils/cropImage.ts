import { Area } from "react-easy-crop";

export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
): Promise<Blob> {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");

      // 🔥 LIMIT SIZE BIAR GAK GEDE
      const MAX_SIZE = 512;

      const cropWidth = pixelCrop.width;
      const cropHeight = pixelCrop.height;

      const scale = Math.min(MAX_SIZE / cropWidth, MAX_SIZE / cropHeight, 1);

      const finalWidth = cropWidth * scale;
      const finalHeight = cropHeight * scale;

      canvas.width = finalWidth;
      canvas.height = finalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No context");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        cropWidth,
        cropHeight,
        0,
        0,
        finalWidth,
        finalHeight,
      );

      // 🔥 COMPRESS DI SINI (KUNCI UTAMA)
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject("Failed to create blob");
          
        },
        
        "image/jpeg", // ❗ ganti dari PNG ke JPEG
        0.7, // ❗ quality (0.6 - 0.8 ideal)
      );
      
    };

    image.onerror = (err) => reject(err);
  });
}
