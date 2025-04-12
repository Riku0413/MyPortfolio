'use client';

import { useEffect, useState } from 'react';

export default function ImagePageWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const waitForImages = () => {
      const images = Array.from(document.images);
      const unloaded = images.filter((img) => !img.complete);

      if (unloaded.length === 0) {
        setIsReady(true);
        return;
      }

      Promise.all(
        unloaded.map((img) =>
          new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
        )
      ).then(() => {
        setIsReady(true);
      });
    };

    // 少し描画を待ってから画像チェック（重要！）
    const timeout = setTimeout(waitForImages, 1000); // ← この100msが大事

    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) {
    return <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      Loading images...
    </div>;
  }

  return <>{children}</>;
}
