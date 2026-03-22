import Image from "next/image";

export default function MemoryScrapbook() {
  return (
    <section
      id="memories"
      className="py-16 bg-[url(/bg-memories.png)] bg-cover bg-center overflow-hidden w-full h-full"
    >
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full h-full">
          <div className="sm:-mt-5 md:relative md:left-24 md:-mt-48">
            <div className="flex justify-end">
              <Image
                src="/image-memories-1.png"
                alt="Korea 1"
                height={1000}
                width={1000}
                className="w-50 h-50 -rotate-12 object-contain"
                preload
              />
            </div>
          </div>
          <div className="sm:mt-0 md:relative md:mt-64 md:right-24">
            <div className="flex justify-start">
              <Image
                src="/image-memories-2.png"
                alt="Korea 1"
                height={1000}
                width={1000}
                className="w-50 h-50 rotate-12 object-contain"
                preload
              />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-12 relative px-2">
          <div className="tape-effect"></div>
          <div className="bg-[#f5edd9]/95 p-6 shadow-lg">
            <p className="text-center handwritten text-xl text-foreground">
              &quot;Every memory is a page in our story, and today we start a
              new chapter.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// {
//   memories.map((memory) => (
//     <div
//       key={memory.id}
//       className="relative group"
//       style={{ transform: `rotate(${memory.rotation}deg)` }}
//     >
//       {/* Tape effect */}
//       <div className="tape-effect"></div>

//       {/* Polaroid effect card */}
//       <Card className="polaroid-effect hover:rotate-0 transition-transform duration-300 group-hover:shadow-2xl">
//         <CardContent className="p-4 pt-6">
//           {/* Date */}
//           <div className="flex items-center gap-2 mb-3">
//             <Calendar className="h-4 w-4 text-primary" />
//             <span className="text-sm font-medium text-primary">
//               {memory.date}
//             </span>
//           </div>

//           {/* Title */}
//           <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
//             {memory.title}
//           </h3>

//           {/* Location */}
//           <div className="flex items-center gap-2 text-sm text-secondary mb-3">
//             <MapPin className="h-3 w-3" />
//             {memory.location}
//           </div>

//           {/* Description */}
//           <p className="text-foreground/80 text-sm mb-4">
//             {memory.description}
//           </p>

//           {/* Photo placeholder with scrapbook colors */}
//           <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded relative overflow-hidden border">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <Heart className="h-10 w-10 text-primary/20" />
//             </div>
//             {/* Scrapbook corner */}
//             <div className="absolute top-2 right-2 w-8 h-8">
//               <div className="w-full h-full bg-gradient-to-bl from-transparent 50% to-white 50%"></div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   ));
// }
