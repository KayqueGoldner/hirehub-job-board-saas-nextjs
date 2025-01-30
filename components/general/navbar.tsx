import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/general/theme-toggle";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Hire
          <span className="text-primary">Hub</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button>Login</Button>
      </div>
    </nav>
  );
};
