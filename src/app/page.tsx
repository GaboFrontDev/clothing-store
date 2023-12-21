import dynamic from 'next/dynamic';

const HomeGallery = dynamic(() =>
  import('@/components/HomeGallery').then((mod) => mod.HomeGallery)
)
export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between md:px-10 lg:px-16 px-10">
      <HomeGallery />
    </main>
  );
}
