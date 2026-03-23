import Image from "next/image";
import { Separator } from "./ui/separator";

export const deadline = "April 20, 2026";

const faqs = [
  {
    imageUrl: "/image-guests.png",
    question: "On Guest List...",
    answer: `You are one of the few people we personally handpicked to celebrate this once-in-a-lifetime moment with us. Whether you've been part of our lives as we grew into the people we are today, a dear friend, a family member who has shared this journey with us until this special day — your presence means the world to us. This invitation is extended exclusively to you, with a seat personally reserved in your honor as we celebrate our intimate gathering.`,
  },
  {
    imageUrl: "/image-kids.png",
    question: "Can I bring my kids or a +1?",
    answer: `As this is a small and intimate gathering, we kindly ask that only those listed in the invitation attend. While we absolutely adore your little ones, we're keeping the event adults-only and only able to accommodate children for a few close guests.`,
  },
  {
    imageUrl: "/image-rsvp.png",
    question: "Do we need to RSVP?",
    answer: [
      `To help us prepare thoughtfully, we kindly ask that you complete your RSVP through this official website at www.ajthewedding.com on or before ${deadline}.`,
      `For your convenience, your name has already been included in our website guest list, along with your assigned seat.`,
      `The final list will be provided to our wedding coordinator ahead of time. We sincerely ask for your kind cooperation in confirming your attendance in advance. Your response truly means the world to us. Thank you for being part of this very special moment in our lives.`,
    ],
    multipleLineAnswer: true,
  },
  {
    imageUrl: "/image-car.png",
    question: "Where should I park?",
    answer: `There is free parking at the church and reception venue and a few free street parking slots available.`,
  },
  {
    imageUrl: "/image-clock.png",
    question: "What happens when I arrive late?",
    answer: `Your presence from the beginning means a lot to us. Kindly arrive on time, as doors will be closed once the ceremony and reception begin.`,
  },
];

export default function FAQs() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-[url(/bg-faqs.png)] bg-cover bg-center overflow-hidden">
      <div
        id="faqs"
        className="flex flex-col lg:flex-row w-full gap-8 sm:gap-12 lg:gap-16"
      >
        {/* Heading */}
        <div className="flex flex-col text-center lg:text-start lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0 lg:w-1/3">
          <h1 className="text-8xl xl:text-9xl 2xl:text-[180px] drop-shadow-md font-beautifully-delicious">
            <span className="block">Frequently</span>
            <span className="block -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6 xl:-mt-8 2xl:-mt-12">
              asked
            </span>
            <span className="block -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6 xl:-mt-8 2xl:-mt-16">
              questions
            </span>
          </h1>
        </div>

        {/* FAQ Items */}
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start space-y-6 sm:space-y-8 md:space-y-10 w-full">
              {faqs.map((item, index) => (
                <div key={index} className="flex flex-col w-full">
                  {/* FAQ Item */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8">
                    {/* Image */}
                    <div className="flex justify-center items-center flex-shrink-0">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64">
                        <Image
                          src={item.imageUrl}
                          alt={item.question}
                          width={500}
                          height={500}
                          preload
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center sm:text-left">
                      {/* Question */}
                      <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
                        {item.question}
                      </div>

                      {/* Answer */}
                      <div className="text-sm sm:text-base md:text-lg lg:text-xl flex flex-col space-y-3 sm:space-y-4 text-gray-700">
                        {!item.multipleLineAnswer ? (
                          <p>{item.answer}</p>
                        ) : (
                          item.answer.map((answer, idx) => (
                            <p key={idx}>{answer}</p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index !== faqs.length - 1 && (
                    <Separator className="bg-black/40 my-6 sm:my-8 md:my-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
