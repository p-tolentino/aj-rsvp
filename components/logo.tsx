import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex w-full h-full items-center justify-center px-4 sm:px-6 md:px-8">
      <Image
        src="/image-aj-blk.png"
        alt="AJ Logo"
        preload
        unoptimized
        width={1000}
        height={1000}
        className="w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 2xl:w-[500px] h-auto object-contain"
      />
    </div>
  );
};

export default Logo;
