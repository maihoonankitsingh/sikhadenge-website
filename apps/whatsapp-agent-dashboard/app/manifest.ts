import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SikhaDenge EngageOS",
    short_name: "EngageOS",
    description: "SikhaDenge counselor inbox and engagement operations.",
    start_url: "/inbox",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
  };
}
