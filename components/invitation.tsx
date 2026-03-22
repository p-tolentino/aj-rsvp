import Image from "next/image";

export default function Invitation() {
  return (
    <section
      id="invitation"
      className="py-16 bg-[url(/bg-invitation-registry.png)] bg-cover bg-center overflow-hidden w-full h-full"
    >
      <div className="flex flex-col sm:relative h-full w-full items-center justify-center">
        {/* Text */}
        <div className="block sm:absolute -rotate-12 left-16 -top-8 sm:left-14 md:left-28 lg:left-28 xl:left-44 xl:top-0 2xl:left-96 z-9999">
          <h1 className="flex flex-col text-start text-8xl lg:text-[150px] mb-2 drop-shadow-md font-beautifully-delicious">
            <span>Celebration</span>
            <span className="-mt-10 lg:-mt-14">in the heart</span>
            <span className="-mt-10 lg:-mt-14">of The</span>
            <span className="-mt-10 lg:-mt-14">Philippines</span>
          </h1>
        </div>

        {/* Letter Image */}

        <div className="flex items-center justify-center h-full w-full">
          <Image
            src="/image-invitation.png"
            alt="Letter"
            height={600}
            width={600}
            preload
            className="w-50 h-50"
          />
        </div>

        {/* Invitation Element */}

        <div className="block sm:absolute right-4 sm:right-8 md:right-12 -bottom-24 sm:bottom-8 md:bottom-12 lg:right-40 lg:bottom-20 xl:right-52 2xl:right-[480px] z-10 rotate-3 sm:rotate-8 md:rotate-10 lg:rotate-12">
          <div className="bg-[#f5edd9] shadow-xl rounded-lg w-[260px] h-[280px] sm:w-[260px] sm:h-[320px] md:w-[300px] md:h-[400px] p-4 sm:p-5 md:p-6 border border-amber-200/50">
            {/* Fold/tape effect */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-[#FFE8B5] rounded-b-lg shadow-sm"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-[#FFE0A0] rounded-b-lg"></div>

            {/* Content */}
            <div className="flex flex-col space-y-3 sm:space-y-4 text-center items-center justify-center h-full">
              <span className="text-xs sm:text-sm md:text-base leading-relaxed">
                Anne & Jacob <br />
                together with our families <br /> <br />
                request the pleasure of your company <br />
                to celebrate our marriage
              </span>
              <span className="text-sm sm:text-base md:text-lg font-semibold">
                ON 20TH OF JUNE, 2026 <br /> AT 7:00 AM
              </span>
              <span className="text-xs sm:text-sm md:text-base">
                at Sacred Heart of Jesus, Alabang
              </span>
              <span className="text-sm sm:text-base md:text-lg font-semibold">
                reception from 11:00 am
              </span>
              <span className="text-xs sm:text-sm md:text-base">
                at Brittany Palazzo
              </span>
            </div>

            {/* Decorative bottom line */}
            <div className="absolute bottom-3 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
