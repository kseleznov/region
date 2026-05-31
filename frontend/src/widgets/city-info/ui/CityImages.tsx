import { ImagesSlider } from "@/shared/ui/images-slider";

export function CityImages({ images }: { images: { url: string; name?: string }[] }) {
  return (
    <div className="mx-4 rounded-2xl overflow-hidden relative h-[250px] mb-[20px]">
      <ImagesSlider images={images} />
    </div>
  );
}
