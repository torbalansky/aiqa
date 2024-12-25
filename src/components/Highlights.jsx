import { Element } from "react-scroll";
import { useState } from "react";
import { aiTestingText } from '../data/Data.js';
import clsx from "clsx";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

const HighlightsItem = ({ item, index }) => {
  const [activeId, setActiveId] = useState(null);
  const active = activeId === item.id;

  const handleToggle = () => {
    setActiveId(activeId === item.id ? null : item.id);
  };

  return (
    <div className="relative z-2 mb-4 cursor-pointer" onClick={handleToggle}>
      <div className="flex items-center justify-between px-7 py-4">
        <div className="flex items-center flex-1">
          <div className="small-compact mb-2 mr-4 text-p3 max-lg:hidden">
            {index < 10 ? "0" : ""}
            {index}
          </div>
          <div
            className={`text-sm md:text-xl transition-colors duration-500 max-md:flex max-md:min-h-20 max-md:items-center ${active ? "max-lg:text-p1" : ""}`}
          >
            {item.title}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <span className={`absolute h-0.5 w-3 bg-p3 ${active ? 'rotate-0' : 'rotate-90'}`} />
          <span className={`absolute h-0.5 w-3 bg-p3 ${active ? 'rotate-90' : 'rotate-0'}`} />
          {active ? (
            <span className="text-lg">−</span>
          ) : (
            <span className="text-lg">+</span>
          )}
        </div>
      </div>

      <SlideDown>
        {activeId === item.id && (
          <div className="body-3 px-7 py-3.5">
            <ul className="list-disc list-inside pl-5">
              {item.points.map((point, idx) => (
                <li key={idx} className="mb-2 text-slate-200 text-md font-space">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </SlideDown>

      <div
        className={clsx(
          "gradient-5 -bottom-7 -top-7 left-0 right-0 -z-1 rounded-3xl opacity-0 transition-opacity duration-500",
          active && "opacity-100",
        )}
      >
        <div className="gradient-4 absolute inset-0.5 -z-1 rounded-3xl" />
        <div className="absolute left-8 top-0 h-0.5 w-40 bg-p3" />
      </div>
    </div>
  );
};

const Highlights = () => {
  const halfLength = Math.ceil(aiTestingText.length / 2);

  return (
    <section>
      <Element className="relative">
        <div className="container relative z-2 py-28">
          <div className="icon-questions-line-after w-0.5 h-full absolute left-[calc(50%-1px)] top-0 -z-1 bg-s2" />
        </div>

        <div className="icon-questions-glow-before relative z-2 border-2 border-s2 bg-s1">
          <div className="container flex flex-col gap-10 max-lg:block">

            <div className="text-left">
              <p className="text-white h6 mt-20">Highlights and Top Picks</p>
            </div>

            <div className="flex justify-between">
              <div className="relative flex-1 pt-24">
                {aiTestingText.slice(0, halfLength).map((item, index) => (
                  <HighlightsItem key={item.id} item={item} index={index + 1} />
                ))}
              </div>

              <div className="relative flex-1 pt-24">
                {aiTestingText.slice(halfLength).map((item, index) => (
                  <HighlightsItem key={item.id} item={item} index={index + halfLength + 1} />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute left-[calc(50%-1px)] top-0 -z-1 h-full w-0.5 bg-s2 max-lg:hidden" />
        </div>
      </Element>
    </section>
  );
};

export default Highlights;
