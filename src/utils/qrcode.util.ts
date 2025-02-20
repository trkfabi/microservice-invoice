import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export default async function generateQRCode(qrUrl: string, uuid: string) {
  console.log("QR URL:", qrUrl);

  try {
    // Generar el código QR como una imagen base64
    const qrCodeBase64 = await QRCode.toDataURL(qrUrl);
    console.log("QR Code Base64:", qrCodeBase64);

    // Guardar el QR como un archivo de imagen
    await QRCode.toFile(path.resolve(`./src/qrcodes/${uuid}.png`), qrUrl, {
      width: 300, // Tamaño del QR
      color: {
        dark: "#000000", // Color de los píxeles
        light: "#FFFFFF", // Color del fondo
      },
    });

    console.log(`QR Code guardado como '../qrcodes/${uuid}.png'`);
    return qrCodeBase64;
  } catch (error) {
    console.error("Error generando el código QR:", error);
    return null;
  }
}
