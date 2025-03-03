"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { VscChecklist } from "react-icons/vsc";
import { GoStack, GoHeart } from "react-icons/go";
import { RxGrid } from "react-icons/rx";
import { BsCart2 } from "react-icons/bs";
import { CiGift } from "react-icons/ci";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { FiClipboard } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiPower } from "react-icons/ci";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface NavItem {
  name?: string;
  icon?: JSX.Element;
  href?: string;
  disabled?: boolean;
  type?: string;
  action?: () => void;
}

const VerticalNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: <BiHome />, href: "/dashboard" },
    {
      name: "Commission Overview",
      icon: <RxGrid />,
      href: "/commission-overview",
      disabled: true,
    },
    {
      name: "My Commissions",
      icon: <GoHeart />,
      href: "/my-commissions",
      disabled: true,
    },
    {
      name: "E-Commerce",
      icon: <BsCart2 />,
      href: "/ecommerce",
      disabled: true,
    },
    { name: "Downline", icon: <VscChecklist />, href: "/downline" },
    {
      name: "Direct Members",
      icon: <GoStack />,
      href: "/direct-members",
    },
    { type: "divider" },
    {
      name: "Live Webinars",
      icon: <CiGift />,
      href: "/ecommerce",
      disabled: true,
    },
    {
      name: "Leaderboard",
      icon: <FiClipboard />,
      href: "/downline",
      disabled: true,
    },
    {
      name: "Rank up & Recognition",
      icon: <BsPeople />,
      href: "/direct-affiliates",
      disabled: true,
    },
    {
      name: "List your products",
      icon: <FaRegArrowAltCircleUp />,
      href: "/direct-affiliates",
      disabled: true,
    },
    { type: "divider" },
    {
      name: "Settings",
      icon: <IoSettingsOutline />,
      href: "/direct-affiliates",
      disabled: true,
    },
    {
      name: "Logout",
      icon: <CiPower />,
      type: "button",
      action: handleLogout,
    },
  ];

  return (
    <div
      className={`fixed z-20 left-0 top-0 h-full bg-white text-black flex flex-col p-2 py-4 overflow-x-hidden space-y-2 transition-all duration-300 ease-in-out ${
        expanded ? "w-64 shadow-lg shadow-gray-400" : "w-12"
      }`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          alt={"Connection"}
          className="ml-1 mb-8"
          width={25}
          height={25}
        />
      </Link>
      {navItems.map((item, index) => {
        if (item.type === "divider") {
          return <div key={index} className="border-t border-gray-300 my-2" />;
        }

        if (item.type === "button") {
          return (
            <button
              key={item.name}
              onClick={item.action}
              className={`flex items-center space-x-6 p-2 rounded-md transition ${
                item.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              <div className="text-md">{item.icon}</div>
              <span
                className={`${
                  item.disabled ? "opacity-50" : ""
                } whitespace-nowrap text-sm`}
              >
                {item.name}
              </span>
            </button>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href || "#"}
            className={`flex items-center space-x-6 p-2 rounded-md transition ${
              item.disabled
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-black hover:text-white"
            }`}
          >
            <div className="text-md">{item.icon}</div>
            <span
              className={`${
                item.disabled ? "opacity-50" : ""
              } whitespace-nowrap text-sm`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default VerticalNavbar;
