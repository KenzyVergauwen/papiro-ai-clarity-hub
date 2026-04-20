import logo from "@/assets/papiro-logo.png";

interface Props {
  className?: string;
  invert?: boolean;
}

export const Logo = ({ className = "h-7", invert = false }: Props) => (
  <img
    src={logo}
    alt="Papiro"
    className={`${className} w-auto select-none ${invert ? "invert" : ""}`}
    draggable={false}
  />
);
