import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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

const MobileNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="flex h-full bg-background/30 z-1100 backdrop-blur-sm">
        <button
          className="md:hidden p-2 text-foreground z-1100 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-1050 h-screen flex flex-col items-center justify-center
        bg-black/30 backdrop-blur-lg transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-foreground/90 hover:text-primary text-2xl sm:text-3xl transition-colors duration-300"
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

const DesktopNavbar: React.FC = () => {
  return (
    <div className="hidden md:flex space-x-8 px-4 py-2 rounded-md ">
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

const TitleText: React.FC = () => {
  return (
    <a
      className="text-xl font-bold text-primary flex items-center  px-2 py-1 rounded-md "
      href="#hero"
    >
      <span className="relative z-10">
        <span className="text-glow text-foreground">LuisGrigore </span>Portfolio
      </span>
    </a>
  );
};

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full z-1000 transition-all duration-300 shadow-xs">
      <div className="flex items-center justify-between w-full h-[50px]">
        <div className="flex items-center justify-between w-full h-full bg-background/30 backdrop-blur-sm md:px-18 px-4">
          <TitleText />
          <DesktopNavbar />
        </div>
        <MobileNavbar />
      </div>
    </nav>
  );
};
