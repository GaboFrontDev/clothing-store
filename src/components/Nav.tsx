import Image from "next/image";
import { ShoppingBag, Account, Search } from "@/components/Icon";

export function Nav() {
  return (
    <nav className="grid grid-cols-3 py-6">
      <section className="flex justify-start">
        <div className="md:flex hidden">
          <Search />
        </div>
      </section>
      <section className="flex items-center justify-center">
        <Image alt="logo" src="/logo.webp" width={100} height={100}></Image>
      </section>
      <section className="flex justify-end">
        <div className="flex justify-evenly w-[100px]">
          <div className="md:hidden block">
            <Search />
          </div>
          <Account />
          <ShoppingBag />
        </div>
      </section>
    </nav>
  );
}
