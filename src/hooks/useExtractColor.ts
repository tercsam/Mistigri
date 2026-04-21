export function extractDominantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    if (!imageUrl) { resolve('#c41e3a'); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1; canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve('#c41e3a'); return; }
        ctx.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        const brightness = (r + g + b) / 3;
        if (brightness < 40) {
          resolve('#' + [r, g, b].map((c) => Math.min(255, c + 50).toString(16).padStart(2, '0')).join(''));
        } else {
          resolve('#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join(''));
        }
      } catch { resolve('#c41e3a'); }
    };
    img.onerror = () => resolve('#c41e3a');
    img.src = imageUrl;
  });
}
