import { useEffect, useState } from "react";


export const useNavbar = (): boolean => {
	  const [isScrolled, setIsScrolled] = useState<boolean>(false);
	
	  useEffect(() => {
		const handleScroll = () => {
		  setIsScrolled(window.screenY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	  }, []);

	  return isScrolled;
}

