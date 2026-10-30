import {
  ShowerHead,
  BellRing,
  Cylinder,
  Waves,
  Gauge,
  Wrench,
  HardHat,
  DraftingCompass,
  ClipboardList,
  PackageCheck,
  BadgeCheck,
  Siren,
  Network,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────────  Contact  ───────────────────────── */

export const PHONES = [
  { raw: "01039661221", intl: "+201039661221" },
] as const;

/* ─────────────────────────  Partners  ───────────────────────── */

export const PARTNERS = [
  "SEFICO",
  "BRISTOL",
  "TEX",
  "APOLLO",
  "DAHUA",
  "HST",
  "BAVTO",
  "HAMMER",
  "TRENTO",
  "HONEYWELL",
] as const;

/* ─────────────────────────  Stats (values)  ───────────────────────── */

export const STATS = [
  { value: 10, suffix: "+" },
  { value: 8, suffix: "" },
  { value: 5, suffix: "" },
  { value: 2, suffix: "" }, // direct contact channels: phone + WhatsApp
] as const;

/* ─────────────────────────  Service icons (order matches i18n items)  ── */

export const SERVICE_ICONS: LucideIcon[] = [
  ShowerHead, // automatic sprinklers
  Gauge, // fire pumps & stations
  Siren, // alarm & early detection
  Cylinder, // clean agent suppression
  Waves, // foam systems
  Network, // fire networks & hydrants
  Wrench, // supply / install / maintain
  HardHat, // industrial safety & HSE
];

/* ─────────────────────────  Process icons (order matches i18n steps)  ── */

export const PROCESS_ICONS: LucideIcon[] = [
  ClipboardList, // site survey & study
  DraftingCompass, // engineering design
  PackageCheck, // premium supply
  Wrench, // installation & testing
  BadgeCheck, // handover & maintenance
];

/* ─────────────────────────  Gallery images (order matches i18n items)  ── */

export const GALLERY_IMAGES = [
  "/images/machine-diesel.jpg",
  "/images/machine-control.jpg",
  "/images/machine-piping.jpg",
  "/images/machine-unit.jpg",
  "/images/machine-pumps.jpg",
  "/images/machine-assembly.jpg",
] as const;
