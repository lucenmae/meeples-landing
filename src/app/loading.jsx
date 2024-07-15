import { Boxes } from "@/components/ui/background-boxes";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
               
      <Boxes />
      <div className="absolute top-44 left-0 w-full text-center">
      <h1 class="uppercase font-poppins block font-black text-gray-800 text-4xl md:text-5xl lg:text-6xl">
        fun project 1
      </h1>
      </div>
      <div className="absolute inset-0 w-full h-full bg-[#F3F3F3] z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <div className="loaderViewPort bg-green-500 w-80 aspect-w-1 aspect-h-1 rounded-full border-4 border-black perspective-1000 flex justify-center items-center animate-changeColor">
        <div className="loader transform rotate-x-90 transform-style-preserve-3d animate-revolve">
          <div className="side front transform translate-z-12">
            <div className="dot bg-black rounded-full w-4 h-4"></div>
          </div>
          <div className="side back transform translate-z-neg-12">
            <div className="dotContainer flex justify-around items-center">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
          </div>
          <div className="side left transform rotate-y-90 translate-z-12">
            <div className="dotContainer flex justify-around items-center">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
          </div>
          <div className="side right transform rotate-y-90 translate-z-neg-12">
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
          </div>
          <div className="side top transform translate-y-neg-12 rotate-x-90">
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
          </div>
          <div className="side bottom transform translate-y-12 rotate-x-90">
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
            <div className="subDotContainer flex flex-col justify-around">
              <div className="dot bg-black rounded-full w-4 h-4"></div>
              <div className="dot bg-black rounded-full w-4 h-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
