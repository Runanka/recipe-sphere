import { SecondaryFont } from "./_components/fonts";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="absolute h-svh w-svw bg-background pt-12 z-0">
      <div className="fixed top-0 left-0 w-full h-12 flex justify-between items-center bg-primary text-white z-50">
        <SecondaryFont className="mx-4 text-lg md:text-xl lg:text-2xl font-semibold">
          Recipe Sphere
        </SecondaryFont>
      </div>
      {children}
    </main>
  );
}
