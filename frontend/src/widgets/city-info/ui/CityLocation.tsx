import { MiniMap } from "@/shared/ui/mini-map";

interface CityLocationProps {
  latitude: number;
  longitude: number;
}

export function CityLocation({ latitude, longitude }: CityLocationProps) {
  return (
    <div className="flex-1">
      <MiniMap lat={latitude} lng={longitude} />
    </div>
  );
}
