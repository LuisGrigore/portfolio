import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavbar } from "./useNavbar";

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <button
        className="md:hidden p-2 text-foreground z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none hidden"
        }`}
      >
        <div className="flex flex-col space-y-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

const DesktopNavbar = () => {
  return (
    <div className="hidden md:flex space-x-8">
      {navItems.map((item, key) => (
        <a
          key={key}
          href={item.href}
          className="text-foreground/80 hover:text-primary transition-colors duration-300"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};

const TitleText = () => {
  return (
    <a
      className="text-xl font-bold text-primary flex items-center"
      href="#hero"
    >
      <span className="relative z-10">
        <span className="text-glow text-foreground"> LuisGrigore </span>{" "}
        Portfolio
      </span>
    </a>
  );
};

export const Navbar = () => {
  const isScrolled = useNavbar();
  return (
    <nav
      className={
        "fixed w-full z-40 transition-all duration-300 " +
        (isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5")
      }
    >
      <div className="container flex items-center justify-between">
        <TitleText />
        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </nav>
  );
};
