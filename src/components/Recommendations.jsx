import { recommendationAItools } from "../data/Data.js";
import clsx from "clsx";
import React from 'react';

const RecommendationsItem = ({ tool, containerClassName }) => {
  return (
    <div
      className={clsx("relative px-14 pb-14 pt-11 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-screen after:bg-s2 after:content-[''] max-md:px-0 max-md:pt-11 after:max-md:-right-4",
        containerClassName
      )}
    >
      <div className="flex items-center max-xl:-mr-8">
        <div className="mr-4 flex items-center justify-center size-20 shrink-0 rounded-half border-4 bg-white border-slate-400 p-1.5">
          <img
            src={tool.logo}
            alt={tool.toolName}
            className="w-10 h-10 object-cover"
          />
        </div>
        <div>
          <h4 className="body-2 mb-0.5 text-p1">{tool.category}</h4>
          <p className="s-compact uppercase text-p3">{tool.toolName}</p>
        </div>
      </div>

      <blockquote className="mb-8 text-p4 font-space font-xs">{tool.details}</blockquote>

      <div className="mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(tool.url, "_blank");
          }}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center group"
        >
          <span>Visit Platform</span>
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Recommendations = () => {
  
  const halfLength = Math.floor(recommendationAItools.length / 2);

  return (
    <section className="relative z-2 py-24 md:py-28 lg:py-40">
      <div className="container block lg:flex">
        <div className="recommendations_head-res relative z-2 mr-20 flex-300 text-left">
          <p className="recommendations-t mb-5 max-md:mb-2.5 text-p1">Top Picks for AI in QA</p>
          <h3 className="h5 max-md:h5 text-p4">Our <br/> Favorites</h3>
        </div>

        <div className="recommendations_inner-after recommendations_inner-before relative -my-12 -mr-3 flex items-start max-lg:static max-md:block">
          <div className="recommendations_group-after flex-50">
            {recommendationAItools.slice(0, halfLength).map((tool) => (
              <RecommendationsItem
                key={tool.id}
                tool={tool}
                containerClassName="last:after:hidden last:after:max-md:block"
              />
            ))}
          </div>

          <div className="flex-50">
            {recommendationAItools.slice(halfLength).map((tool) => (
              <RecommendationsItem
                key={tool.id}
                tool={tool}
                containerClassName="last:after:hidden after:right-auto after:left-0 after:max-md:-left-4 md:px-12"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
