import { Facebook, Instagram } from "./Icon";

export default function Footer() {
  return (
    <div className="flex flex-grow-1 justify-evenly">
      <a href="https://www.facebook.com/hdzlpaloma" target="_blank">
        <Facebook />
      </a>
      <a href="https://www.instagram.com/hdzlpaloma/" target="_blank">
        <Instagram />
      </a>
    </div>
  );
}
