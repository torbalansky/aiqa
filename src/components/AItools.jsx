import { Element } from "react-scroll";
import { useState, useEffect, useRef } from "react";
import { aiTestingPlatforms, AItoolsDetails } from '../data/Data.js';
import { FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import { MdAttachMoney } from "react-icons/md";

const Pricing = () => {
  // State Initialization
  const [searchTerm, setSearchTerm] = useState('');
  const [pricingFilter, setPricingFilter] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [expandedToolIndex, setExpandedToolIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dropdownRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState(null);

  // Extract key features from the tools
  const allKeyFeatures = aiTestingPlatforms.tools.flatMap(tool => tool.keyFeatures);

  // Count occurrences of each feature
  const featureCount = allKeyFeatures.reduce((acc, feature) => {
    acc[feature] = (acc[feature] || 0) + 1;
    return acc;
  }, {});

  // Select the most common and important features
  const keyFeaturesOptions = Object.entries(featureCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 30)
    .map(([feature]) => feature);

  // Utility Functions
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : description;
  };

  // Filtering Logic
  const filteredTools = aiTestingPlatforms.tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPricing = pricingFilter ? tool.pricing.includes(pricingFilter) : true;
    const matchesFeatures = selectedFeatures.length === 0 || selectedFeatures.some(feature => tool.keyFeatures.includes(feature));
    const matchesCategory = selectedCategory ? tool.category === selectedCategory : true;
    return matchesSearch && matchesPricing && matchesFeatures && matchesCategory;
  });

  // Pagination Logic
  const totalItems = filteredTools.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTools.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Feature Selection
  const handleFeatureChange = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <section>
      <Element name="pricing">
        <div className="container">
          <div className="space-y-6 p-6 rounded-lg">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">AI Testing Tools</h2>
              
              <div className="mb-8 grid gap-2 md:flex md:items-center md:space-x-4">
                <div className="relative w-full md:w-52">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                
                <div className="relative w-full mt-2 md:w-52" ref={dropdownRef}>
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <div 
                    className="mb-1 cursor-pointer flex items-center pl-10 pr-4 py-2 text-slate-400 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={() => setDropdownOpen(prev => !prev)}
                    tabIndex={0}
                  >
                    Features
                  </div>
                  {dropdownOpen && (
                    <div className="absolute z-10 text-xs bg-gray-800 border border-gray-700 rounded-lg w-[300px] sm:w-[700px] mt-1">
                      <div className="grid sm:grid-cols-3 gap-1 border rounded-lg border-purple-600 p-2 text-md">
                        {keyFeaturesOptions.map((feature, index) => (
                          <div 
                            key={index} 
                            className={`block border border-slate-400 text-white cursor-pointer hover:text-slate-900 hover:bg-p3 p-2 rounded ${selectedFeatures.includes(feature) ? 'bg-purple-600' : ''}`}
                            onClick={() => {
                              setSelectedFeatures(prev => 
                                prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
                              );
                            }}
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative w-full mt-2 md:w-64">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Category</option>
                    <option value="Enterprise Solutions">Enterprise Solutions</option>
                    <option value="AI-Powered Testing">AI-Powered Testing</option>
                    <option value="No-Code/Codeless Testing">No-Code</option>
                    <option value="Framework Enhancements">Framework Enhancements</option>
                    <option value="Test Management">Test Management</option>
                    <option value="Autonomous Testing">Autonomous Testing</option>
                    <option value="End-to-End Testing">End-to-End Testing</option>
                    <option value="Visual Testing">Visual Testing</option>
                    <option value="API Testing">API Testing</option>
                    <option value="Salesforce Testing">Salesforce Testing</option>
                    <option value="Self-Healing Testing">Self-Healing Testing</option>
                  </select>
                </div>
                
                <div className="relative w-full mt-2 md:w-52">
                  <MdAttachMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    value={pricingFilter}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => setPricingFilter(e.target.value)}
                  >
                    <option value="">Pricing Type</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid (with trial)</option>
                    <option value="Open-source">Open Source</option>
                    <option value="Quote-Based">Quote Based</option>
                  </select>
                </div>


                {(searchTerm || pricingFilter || selectedFeatures.length > 0 || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setPricingFilter('');
                      setSelectedFeatures([]);
                      setSelectedCategory('');
                      setCurrentPage(1);
                    }}
                    className="w-full mt-2 md:w-auto px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {currentItems.map((tool, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      const toolDetails = AItoolsDetails.tools.find(t => t.name === tool.name);
                      setSelectedTool(toolDetails);
                    }}
                    className="group block rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden h-full"
                  >

                    <div className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-start">
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="w-10 h-10 rounded-md"/>
                          <h3 className="h6 ml-8 font-semibold text-white group-hover:text-purple-400 transition-colors">
                            {tool.name}
                          </h3>
                        </div>
                     
                          <div className="flex flex-col text-center gap-2">
                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-purple-900 text-purple-200">
                              {tool.category}
                            </span>
                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-900 text-blue-200">
                              {tool.pricing}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <p className="text-gray-400 font-poppins">
                            {expandedToolIndex === index ? tool.description : truncateDescription(tool.description, 10)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex flex-col text-center font-poppins gap-1">
                            {tool.keyFeatures.map((feature, featureIndex) => (
                              <span
                                key={featureIndex}
                                className="px-2 py-1 rounded-full text-sm bg-slate-900 text-slate-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

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
                  </a>
                ))}
              </div>

              {totalItems === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No tools found matching your criteria</p>
                </div>
              )}

              {/* Pagination Controls */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-gray-600 text-white px-2 sm:px-4 py-2 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white text-md">
                  Page {currentPage} of {Math.ceil(filteredTools.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTools.length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredTools.length / itemsPerPage)}
                  className="bg-gray-600 text-white px-2 sm:px-4 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        </div>
      </Element>

      {selectedTool && (
        <div className="fixed inset-0 font-space bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-6xl w-full overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => window.open(selectedTool.url, "_blank")}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
              >
                Visit Platform
              </button>
              <button onClick={() => setSelectedTool(null)} className="text-red-400 hover:text-red-300">
                Close
              </button>
            </div>

            {/* Image with Title Overlay */}
            <div className="relative">
              <img
                src={selectedTool.image}
                alt={selectedTool.name}
                className="w-full h-auto object-cover rounded-t-lg"
              />
              <h2 className="absolute bottom-0 left-0 right-0 text-2xl font-bold text-white bg-black bg-opacity-60 p-2 text-center">
                {selectedTool.name}
              </h2>
            </div>

            <p className="text-gray-200 mt-2 font-poppins font-semibold text-lg">{selectedTool.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Pros and Cons */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-pink-300">Pros and Cons</h3>
                <div className="text-gray-300">
                  <h4 className="font-semibold text-blue-200">Pros:</h4>
                  <ul className="list-disc list-inside">
                    {selectedTool.prosAndCons.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold mt-2 text-blue-200">Cons:</h4>
                  <ul className="list-disc list-inside">
                    {selectedTool.prosAndCons.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Features */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-pink-300">AI Features</h3>
                <ul className="text-gray-300 list-disc list-inside">
                  {Object.entries(selectedTool.aiFeatures).map(([feature, description]) => (
                    <li key={feature}>
                      <strong>{feature.replace(/([A-Z])/g, ' $1')}: </strong>
                      {description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Test Types Supported */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-pink-300">Test Types Supported</h3>
                <ul className="text-gray-300 list-disc list-inside">
                  {Object.entries(selectedTool.testTypesSupported).map(([testType, description]) => (
                    <li key={testType}>
                      <strong>{testType.replace(/([A-Z])/g, ' $1')}: </strong>
                      {description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Curve */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-pink-300">Learning Curve</h3>
                <p className="text-gray-300">{selectedTool.learningCurve.description}</p>
                <h4 className="font-semibold">Resources:</h4>
                <ul className="text-gray-300 list-disc list-inside">
                  {selectedTool.learningCurve.resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Compatibility */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-pink-300">Compatibility</h3>
                <p className="text-gray-300">Browsers: {selectedTool.compatibility.browsers}</p>
                <p className="text-gray-300">Operating Systems: {selectedTool.compatibility.operatingSystems.join(', ')}</p>
                <p className="text-gray-300">Application Types: {selectedTool.compatibility.applicationTypes}</p>
              </div>

              {/* Integrations */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-pink-300">Integrations</h3>
                <h4 className="font-semibold">CI/CD Tools:</h4>
                <ul className="text-gray-300 list-disc list-inside">
                  {selectedTool.integrations.ciCdTools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
                <h4 className="font-semibold">Cloud Platforms:</h4>
                <ul className="text-gray-300 list-disc list-inside">
                  {selectedTool.integrations.cloudPlatforms.map((platform, index) => (
                    <li key={index}>{platform}</li>
                  ))}
                </ul>
                <h4 className="font-semibold">DevOps Tools:</h4>
                <ul className="text-gray-300 list-disc list-inside">
                  {selectedTool.integrations.devOpsTools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* User Ratings and Reviews */}
              <div className="bg-blue-600 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">User Ratings and Reviews</h3>
                <p className="text-gray-200">{selectedTool.userRatingsAndReviews.summary}</p>
              </div>

              {/* Customer Support */}
              <div className="bg-teal-600 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">Customer Support</h3>
                <p className="text-gray-200">Availability: {selectedTool.customerSupport.availability}</p>
                <p className="text-gray-200">Channels: {selectedTool.customerSupport.channels.join(', ')}</p>
                <p className="text-gray-200">Premium Support: {selectedTool.customerSupport.premiumSupport}</p>
              </div>

              {/* Pricing */}
              <div className="bg-red-700 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-white">Pricing</h3>
                <p className="text-gray-200">Model: {selectedTool.pricing.model}</p>
                <p className="text-gray-200">Factors: {selectedTool.pricing.factors.join(', ')}</p>
                <p className="text-gray-200">Additional Details: {selectedTool.pricing.additionalDetails}</p>
              </div>
            </div>
            {/* Close bottom */}
              <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => window.open(selectedTool.url, "_blank")}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
              >
                Visit Platform
              </button>
              <button onClick={() => setSelectedTool(null)} className="text-red-400 hover:text-red-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;