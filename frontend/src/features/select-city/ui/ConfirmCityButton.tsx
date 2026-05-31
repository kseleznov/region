"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/ui";
import { useSelectCityStore } from "../model/useSelectCityStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

export function ConfirmCityButton() {
  const { selectedCity } = useSelectCityStore();
  const router = useRouter();

  function onClick() {
    router.push(ROUTES.overview);
  }

  return (
    <AnimatePresence>
      {selectedCity && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 px-[20px] pb-[32px]"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Button variant="confirmCity" onClick={onClick}>
            Continue with {selectedCity}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
