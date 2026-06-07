import { ImagesSlider } from "@/shared/ui/images-slider";

interface CityImagesProps {
  images: {
    url: string;
    name?: string;
  }[];
}

export function CityImages({ images }: CityImagesProps) {
  return (
    <div className="mx-4 rounded-2xl overflow-hidden relative h-[250px] mb-[20px]">
      <ImagesSlider images={images} />
    </div>
  );
}
