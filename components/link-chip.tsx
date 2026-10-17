import type { TripLink } from "@/lib/trip";
import { GlobeIcon, PinIcon, TicketIcon } from "./icons";

const defaults = {
  maps: { label: "Google Maps", Icon: PinIcon },
  site: { label: "Site oficial", Icon: GlobeIcon },
  tickets: { label: "Ingressos", Icon: TicketIcon },
};

export function LinkChip({ link }: { link: TripLink }) {
  const { label, Icon } = defaults[link.kind];
  const isTickets = link.kind === "tickets";

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors duration-150 pointer-coarse:min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${
        isTickets
          ? "bg-(--accent) text-white hover:brightness-115"
          : "border border-line bg-white text-ink hover:border-(--accent) hover:text-(--accent)"
      }`}
    >
      <Icon className="size-3.5" />
      {link.label ?? label}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
