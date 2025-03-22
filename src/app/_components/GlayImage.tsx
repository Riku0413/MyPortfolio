import Image from "next/image";

type GlayImageProps = {
  title: string;
  url: string;
};

export default function GlayImage({ title, url }: GlayImageProps) {
  return (
    <div className="relative w-full h-[50vh] max-h-[450px]">
      <Image
        src={url}
        alt="Mount Fuji"
        fill
        className="object-cover filter grayscale"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold drop-shadow-md bg-black px-3 py-2">
          {title}
        </h1>
      </div>
    </div>
  );
}
