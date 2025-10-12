import { ThemeToggle } from "../components/theme_toggle/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/*Theme toggle*/}
	  <div className="fixed max-sm:hidden top-5 right-5 z-50 p-2 ">
		<ThemeToggle />
	  </div>
      
      {/*Background*/}

      {/*Nav Bar*/}

      {/*Body*/}

      {/*Footer*/}
    </div>
  );
}
