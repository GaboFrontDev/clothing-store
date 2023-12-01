import { HomeGallery } from "@/components/HomeGallery";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between md:px-10 lg:px-16 px-10">
      <HomeGallery />
    </main>
  );
}
