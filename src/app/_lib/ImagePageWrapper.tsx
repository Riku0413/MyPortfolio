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

    const timeout = setTimeout(waitForImages, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}
