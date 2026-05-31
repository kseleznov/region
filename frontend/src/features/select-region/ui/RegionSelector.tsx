import { Chips } from "@/shared/ui";
import { regions } from "../model/regions";
import { useState } from "react";

export function RegionSelector() {
  const [active, setActive] = useState("1");

  return <Chips chips={regions} activeId={active} onChange={setActive} />;
}
