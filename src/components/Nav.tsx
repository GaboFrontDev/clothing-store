import Image from "next/image";
import {
  ShoppingBag,
  Account,
  Search,
  Menu,
} from "@/components/Icon";
import { Routes } from "./Routes";

export function Nav() {
  return (
    <nav className="grid grid-cols-3 ">
      <section className="flex justify-start items-center">
        <div
          className="md:block h-fit hidden cursor-pointer p-2"
          id="search-feature"
        >
          <Search />
        </div>
        <div
          className="md:hidden block h-fit cursor-pointer p-2"
          id="menu-feature"
        >
          <Menu />
        </div>
      </section>
      <section className="flex items-center justify-center z">
        <a
          title="home"
          href="/"
          className="max-w-[180px] w-[15vw] min-w-[120px]"
        >
          <Image
            alt="logo"
            src="/logo.webp"
            width={180}
            height={180}
            priority={true}
          />
        </a>
      </section>
      <section className="flex justify-end items-center">
        <div className="flex justify-evenly items-center w-fit">
          <div
            className="h-fit w-fit cursor-pointer p-2 md:hidden flex"
            id="search-feature-mobile"
          >
            <Search />
          </div>
          <div className="h-fit w-fit cursor-pointer p-2 hidden md:flex">
            <Account />
          </div>
          <div className="h-fit w-fit cursor-pointer p-2">
            <a href="/cart">
              <ShoppingBag />
            </a>
          </div>
        </div>
      </section>
      <section className="col-span-3 hidden md:flex justify-evenly items-center h-[100px] ">
        <Routes />
      </section>
    </nav>
  );
}
