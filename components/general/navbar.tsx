import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/app/utils/auth";

import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user-dropdown";

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Hire
          <span className="text-primary">Hub</span>
        </h1>
      </Link>

      {/* desktop navigation */}
      <div className="hidden items-center gap-5 md:flex">
        <ThemeToggle />

        <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
          Post Job
        </Link>

        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            image={session.user.image as string}
            name={session.user.name as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
