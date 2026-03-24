const QRCode = require('qrcode');
const fs = require('fs');

// QR verwijst naar de landingspagina op GitHub Pages
const url = 'https://carlo651.github.io/PaasTournooi2026/landing.html';

QRCode.toDataURL(url, { width: 300, margin: 2 }, (err, dataUrl) => {
  if (err) { console.error(err); return; }

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>QR Code - Domino's IJmuiden</title>
  <style>
    @media print { .no-print { display: none; } body { margin: 0; } }
    body { font-family: Arial, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: white; padding: 20px; }
    .card { border: 3px solid #e31837; border-radius: 16px; padding: 32px 40px; text-align: center; max-width: 420px; width: 100%; }
    .logo { font-size: 28px; font-weight: bold; color: #e31837; margin-bottom: 4px; }
    .subtitle { font-size: 14px; color: #666; margin-bottom: 24px; }
    img { display: block; margin: 0 auto 24px; }
    .instruction { font-size: 18px; font-weight: bold; color: #1a1a1a; margin-bottom: 8px; }
    .steps { font-size: 14px; color: #444; line-height: 1.8; text-align: left; margin-bottom: 20px; }
    .coupon-box { background: #fff3cd; border: 2px dashed #e31837; border-radius: 8px; padding: 10px 16px; font-size: 15px; color: #333; margin-bottom: 8px; }
    .coupon-code { font-size: 22px; font-weight: bold; color: #e31837; letter-spacing: 3px; }
    .address { font-size: 13px; color: #888; margin-top: 16px; }
    .print-btn { margin-top: 24px; padding: 12px 32px; background: #e31837; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">🍕 Domino's Pizza IJmuiden</div>
    <div class="subtitle">Bestel gemakkelijk online</div>
    <img src="${dataUrl}" width="220" height="220" alt="QR Code">
    <div class="instruction">Scan & Bestel</div>
    <div class="steps">
      1. Scan de QR code<br>
      2. Klik op "Bestel nu"<br>
      3. Vul adres in: Waterloolaan 1, Driehuis<br>
      4. Kies je pizza's en gebruik de couponcode
    </div>
    <div class="coupon-box">🎟️ Couponcode: <span class="coupon-code">65414</span></div>
    <div class="address">📍 Bezorgadres: Waterloolaan 1, Driehuis</div>
  </div>
  <button class="print-btn no-print" onclick="window.print()">🖨️ Printen</button>
</body>
</html>`;

  fs.writeFileSync('qr-print.html', html);
  console.log('Klaar! Open qr-print.html om te printen.');
});
