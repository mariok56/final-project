import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const slides = [
  {
    title: "Professional Service",
    description: "Professionalism at its peak",
    image: "/hair-barber-vector-1-1.png",
  },
  {
    title: "Expert Stylists",
    description: "Get styled by the best in the industry",
    image: "/hair-barber-vector-1-1.png",
  },
  {
    title: "Book Instantly",
    description: "Schedule your appointment with ease",
    image: "/hair-barber-vector-1-1.png",
  },
];

export const Onboarding = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <div className="bg-white min-h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-[390px] h-screen relative px-5">
        {/* Status Bar */}
        <header className="w-full h-12 justify-between py-[50px] flex items-center fixed top-0 left-0 right-0 max-w-[390px] mx-auto px-5 bg-white/80 backdrop-blur-sm z-10">
          <img
            className="relative w-[54px] h-[21px] mt-[-36.50px] mb-[-36.50px]"
            alt="Time"
            src="/time---light.svg"
          />

          <div className="flex items-center gap-1 mt-[-33.00px] mb-[-33.00px]">
            <img
              className="relative w-5 h-3.5"
              alt="Network signal"
              src="/network-signal---light.svg"
            />
            <img
              className="relative w-4 h-3.5"
              alt="Wifi signal"
              src="/wifi-signal---light.svg"
            />
            <img
              className="relative w-[25px] h-3.5"
              alt="Battery"
              src="/battery---light.svg"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center pt-24 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="border-none shadow-none w-full">
                <CardContent className="p-0">
                  <img
                    className="w-full h-[494px] object-cover rounded-lg"
                    alt={slides[currentSlide].title}
                    src={slides[currentSlide].image}
                  />
                  <h1 className="font-bold text-2xl mt-5 font-['Poppins',Helvetica] text-black text-center">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="font-normal text-base mt-4 font-['Poppins',Helvetica] text-black text-center">
                    {slides[currentSlide].description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-[#005e54] w-4" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </main>

        {/* Navigation Buttons */}
        <div className="absolute bottom-[94px] left-0 right-0 px-5 flex justify-between">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="w-[167px] h-[49px] rounded-[10px] border-2 border-[#005e54] font-['Poppins',Helvetica] text-black"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            className="w-[167px] h-[49px] rounded-[10px] bg-[#005e54] font-['Poppins',Helvetica] text-white"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};