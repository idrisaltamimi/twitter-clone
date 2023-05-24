import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";

const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 px-2 py-4">
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
        <li>
          <Link href={"/"}>
            <NavItem Icon={VscHome} name="Home" />
          </Link>
        </li>
        {user != null && (
          <li>
            <Link href={`/profiles/${user.id}`}>
              <NavItem Icon={VscAccount} name="Profile" />
            </Link>
          </li>
        )}

        {user == null ? (
          <li>
            <button onClick={() => void signIn()}>
              <NavItem Icon={VscSignIn} name="Log In" color="green" />
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()}>
              <NavItem Icon={VscSignOut} name="Log Out" color="red" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

type NavItemProps = {
  Icon: IconType;
  name: string;
  color?: string | null;
};

function NavItem({ Icon, name, color = null }: NavItemProps) {
  return (
    <IconHoverEffect>
      <span className="flex items-center gap-4">
        <Icon className={`h-8 w-8 ${color ? `fill-${color}-500` : ""}`} />
        <span
          className={`hidden text-lg md:inline ${
            color ? (color ? `text-${color}-500` : "") : ""
          }`}
        >
          {name}
        </span>
      </span>
    </IconHoverEffect>
  );
}

export default SideNav;
