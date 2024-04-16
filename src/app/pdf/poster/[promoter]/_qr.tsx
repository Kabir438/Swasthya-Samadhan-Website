"use client";
import { QRCode } from "react-qrcode-logo";

export default function QR({
  promoter
}: {
  promoter: string;
}) {
  return (
    <div
        className="grid -z-40 w-[180px] h-[180px] place-items-center absolute top-[calc(15px+50%)] left-[50%] -translate-x-[50%] -translate-y-[55%]"
    >
      <QRCode value={`${process.env.NEXT_PUBLIC_URL}/redirect?promoter=${promoter}`} ecLevel="Q" id="qr" logoImage="/qr-icon-logo.png" logoPadding={2} logoPaddingStyle="square" logoWidth={42.5} fgColor="#ce0000" removeQrCodeBehindLogo={!false} qrStyle="squares" eyeRadius={8} />
    </div>
  );
}
