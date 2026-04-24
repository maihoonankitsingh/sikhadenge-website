"use client";

import { useEffect, useState } from "react";
import CounsellingModal from "../../components/CounsellingModal";

export default function CounsellingGlobal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("sd:open-counselling", onOpen);
    return () => window.removeEventListener("sd:open-counselling", onOpen);
  }, []);

  return <CounsellingModal open={open} onClose={() => setOpen(false)} />;
}
