import { type IconType } from "react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import { BsPerson } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";

import IconHoverEffect from "./IconHoverEffect";

const SideNav = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 h-[100vh] px-2 py-4">
      <ul className="flex h-full flex-col items-start gap-2 whitespace-nowrap">
        <li className="w-full">
          <Link href={"/"}>
            <NavItem logo={twitterSvgIcon} name={""} />
          </Link>
        </li>
        <li className="w-full">
          <Link href={"/"}>
            {session.status !== "authenticated" ? (
              <NavItem Icon={FaHashtag} name="Explore" />
            ) : (
              <NavItem Icon={VscHome} name="Home" />
            )}
          </Link>
        </li>
        {user != null && (
          <li className="w-full">
            <Link href={`/profiles/${user.id}`}>
              <NavItem Icon={BsPerson} name="Profile" />
            </Link>
          </li>
        )}

        {user == null ? (
          <li className="w-full">
            <button onClick={() => void signIn()}>
              <NavItem Icon={VscSignIn} name="Log In" color="green" />
            </button>
          </li>
        ) : (
          <li className="mt-auto w-full">
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
  Icon?: IconType;
  logo?: JSX.Element;
  name: string;
  color?: string | null;
};

function NavItem({ Icon, name, color = null, logo }: NavItemProps) {
  return (
    <IconHoverEffect>
      <span className="flex items-center gap-4">
        <>
          {Icon ? (
            <Icon className={`h-8 w-8 ${color ? `fill-${color}-500` : ""}`} />
          ) : null}
          {logo ? logo : ""}
        </>
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

const twitterSvgIcon: JSX.Element = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0,0,256,256"
    width="256px"
    height="256px"
    fill-rule="nonzero"
    className={`h-8 w-8`}
  >
    <defs>
      <linearGradient
        x1="32"
        y1="9.936"
        x2="32"
        y2="52.195"
        gradientUnits="userSpaceOnUse"
        id="color-1"
      >
        <stop offset="0" stop-color="#1a6dff"></stop>
        <stop offset="1" stop-color="#c822ff"></stop>
      </linearGradient>
      <linearGradient
        x1="38.903"
        y1="9.936"
        x2="38.903"
        y2="52.195"
        gradientUnits="userSpaceOnUse"
        id="color-2"
      >
        <stop offset="0" stop-color="#1a6dff"></stop>
        <stop offset="1" stop-color="#c822ff"></stop>
      </linearGradient>
      <linearGradient
        x1="42"
        y1="17.979"
        x2="42"
        y2="21.528"
        gradientUnits="userSpaceOnUse"
        id="color-3"
      >
        <stop offset="0" stop-color="#6dc7ff"></stop>
        <stop offset="1" stop-color="#e6abff"></stop>
      </linearGradient>
    </defs>
    <g
      fill="#ffffff"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <path
        d="M64,256c-35.34622,0 -64,-28.65378 -64,-64v-128c0,-35.34622 28.65378,-64 64,-64h128c35.34622,0 64,28.65378 64,64v128c0,35.34622 -28.65378,64 -64,64z"
        id="shape"
      ></path>
    </g>
    <g
      fill="none"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <g transform="scale(4,4)">
        <path
          d="M57.595,16.086c-0.286,-0.341 -0.762,-0.45 -1.17,-0.271c-0.614,0.271 -1.245,0.512 -1.891,0.719c0.824,-1.035 1.462,-2.216 1.874,-3.491c0.127,-0.396 -0.002,-0.827 -0.326,-1.087c-0.324,-0.261 -0.774,-0.295 -1.131,-0.083c-1.777,1.041 -3.672,1.788 -5.641,2.223c-2.066,-1.974 -4.861,-3.096 -7.755,-3.096c-6.169,0 -11.189,4.978 -11.189,11.097c0,0.404 0.022,0.81 0.067,1.214c-7.41,-0.705 -14.289,-4.343 -19.027,-10.103c-0.207,-0.252 -0.518,-0.385 -0.85,-0.362c-0.325,0.025 -0.618,0.207 -0.784,0.488c-0.993,1.679 -1.519,3.613 -1.519,5.593c0,2.447 0.807,4.78 2.247,6.68c-0.292,-0.123 -0.579,-0.26 -0.859,-0.412c-0.311,-0.167 -0.686,-0.161 -0.988,0.021c-0.303,0.181 -0.488,0.507 -0.488,0.859v0.119c0,3.708 1.868,7.073 4.786,9.104c-0.012,-0.002 -0.024,-0.005 -0.036,-0.007c-0.35,-0.065 -0.699,0.062 -0.93,0.327c-0.231,0.265 -0.306,0.631 -0.198,0.966c1.182,3.648 4.149,6.371 7.769,7.332c-3.003,1.771 -6.401,2.697 -9.957,2.697c-0.786,0 -1.563,-0.046 -2.308,-0.137c-0.467,-0.059 -0.906,0.218 -1.063,0.657c-0.157,0.44 0.012,0.931 0.407,1.181c4.843,3.066 10.429,4.686 16.155,4.686c18.772,0 29.989,-15.119 29.989,-29.736c0,-0.271 -0.005,-0.541 -0.014,-0.81c1.907,-1.423 3.552,-3.159 4.896,-5.169c0.247,-0.37 0.22,-0.858 -0.066,-1.199zM51.167,21.143c-0.279,0.197 -0.438,0.523 -0.422,0.865c0.02,0.415 0.034,0.834 0.034,1.256c0,13.633 -10.469,27.736 -27.989,27.736c-3.982,0 -7.894,-0.84 -11.499,-2.452c4.226,-0.321 8.198,-1.85 11.575,-4.468c0.335,-0.26 0.47,-0.702 0.336,-1.104c-0.134,-0.402 -0.506,-0.677 -0.93,-0.686c-3.381,-0.065 -6.404,-1.952 -7.948,-4.835c1.115,0.038 2.203,-0.099 3.276,-0.393c0.447,-0.123 0.751,-0.537 0.735,-1c-0.017,-0.464 -0.35,-0.854 -0.804,-0.945c-3.773,-0.752 -6.632,-3.773 -7.244,-7.449c1.122,0.403 2.297,0.631 3.468,0.667c0.459,0.011 0.848,-0.271 0.983,-0.696c0.136,-0.426 -0.027,-0.89 -0.399,-1.137c-2.558,-1.698 -4.084,-4.53 -4.084,-7.575c0,-1.135 0.21,-2.25 0.614,-3.287c5.319,5.827 12.784,9.361 20.714,9.76c0.328,0.022 0.617,-0.116 0.817,-0.357c0.202,-0.241 0.278,-0.563 0.207,-0.868c-0.16,-0.685 -0.24,-1.384 -0.24,-2.077c0,-5.016 4.122,-9.097 9.189,-9.097c2.537,0 4.979,1.047 6.7,2.871c0.235,0.248 0.581,0.359 0.917,0.296c1.385,-0.267 2.739,-0.671 4.048,-1.209c-0.729,1.007 -1.665,1.865 -2.759,2.514c-0.407,0.242 -0.589,0.735 -0.436,1.184c0.153,0.447 0.597,0.73 1.068,0.669c0.952,-0.117 1.886,-0.292 2.797,-0.525c-0.831,0.865 -1.741,1.648 -2.724,2.342z"
          fill="url(#color-1)"
        ></path>
        <path
          d="M30.772,45.786l0.621,1.9c7.123,-2.326 12.824,-7.914 15.642,-15.33l-1.869,-0.711c-1.53,4.026 -5.433,11.214 -14.394,14.141z"
          fill="url(#color-2)"
        ></path>
        <g fill="url(#color-3)">
          <circle cx="42" cy="20" r="2"></circle>
        </g>
      </g>
    </g>
  </svg>
);
