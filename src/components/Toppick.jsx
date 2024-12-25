import { Element } from "react-scroll";

const TopPick = () => {
  return (
    <section>
      <Element className="gradient-7 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16" id="toppick">
        <div className="container">
          <div className="flex items-center">
            <div className="relative mr-6 flex-540 max-xl:flex-280 max-lg:flex256 max-md:flex-100">
            <p className="recommendations-t text-p1 text-xl mb-5 max-md:mb-2.5">Top Pick</p>
              <div className="mb-10">
                <img
                  src="/images/tricentis-Logo.png"
                  width={160}
                  height={55}
                  alt="tricentis"
                />
              </div>
              <p className="body-1 mb-10 max-w-md font-space">
              Tricentis Tosca app combines powerful test automation, AI-driven insights, and seamless integration to deliver highly efficient and accurate quality assurance across complex applications.
              </p>
              
              <div className="mt-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://www.tricentis.com/products/automate-continuous-testing-tosca/model-based-test-automation", "_blank");
                  }}
                  className="sm:w-1/2 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center group"
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

            <div className="mb-10 max-md:hidden">
              <div className="rounded-40 relative hd-md w-[925px] border-2 border-s5 p-6">
                <div className="relative rounded-3xl bg-s1 px-6 pb-6 pt-14">
                  <span className="d-dot left-6 bg-p2" />
                  <span className="d-dot left-11 bg-purple-400" />
                  <span className="d-dot left-16 bg-white" />

                  <img
                    src="/images/tricentis.png"
                    width={855}
                    height={655}
                    alt="screen"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};
export default TopPick;
