"use client";

import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const navlinks = [
  { title: "Home", href: "/" },
  { title: "Announcement", href: "/admin/announcement" },
  { title: "Hero Banner", href: "/admin/hero-banner" },
  { title: "Footer", href: "/admin/footer" },
];
export default function TheDesignPage() {
  const router = useRouter();

  const goBackHandler = () => {
    router.push("/admin");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center justify-between pr-5 border-b">
        <h1 className="uppercase text-xl tracking-wider pl-5 py-5">
          design page
        </h1>
        <ArrowLeftCircle size={30} cursor="pointer" onClick={goBackHandler} />
      </div>
      <div className="pl-3 pt-5">
        <ul className="flex flex-col gap-2 relative w-full">
          {navlinks.map((link) => (
            <li
              key={link.href}
              className="flex items-center text-left uppercase p-3 w-full rounded-sm transition duration-300 ease-out hover:bg-gray-100"
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}