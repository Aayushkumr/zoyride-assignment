import { useState } from 'react';
import PropTypes from 'prop-types';

const Filters = ({ 
    categories, 
    subCategories, 
    onCategoryChange, 
    onSubCategoryChange, 
    onPriceChange, 
    onClearFilters, 
    selectedCategories, 
    selectedSubCategories,
    priceRange 
}) => {
    const [showFilter, setShowFilter] = useState(false);
    const [localPrice, setLocalPrice] = useState(priceRange || [1000, 3500]); 

    const toggleCategory = (e) => {
        const value = e.target.value;
        let updatedCategories = [...selectedCategories];
        if (updatedCategories.includes(value)) {
            updatedCategories = updatedCategories.filter(category => category !== value);
        } else {
            updatedCategories.push(value);
        }
        onCategoryChange(updatedCategories);
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        let updatedSubCategories = [...selectedSubCategories];
        if (updatedSubCategories.includes(value)) {
            updatedSubCategories = updatedSubCategories.filter(subCategory => subCategory !== value);
        } else {
            updatedSubCategories.push(value);
        }
        onSubCategoryChange(updatedSubCategories);
    };

    const handlePriceChange = (e) => {
        const value = Number(e.target.value);
        setLocalPrice([1000, value]); // Assuming minimum price is fixed at 1000
        onPriceChange([1000, value]);
    };

    return (
        <div className='min-w-60'>
            <div className='flex justify-between items-center'>
                <p 
                    onClick={() => setShowFilter(!showFilter)} 
                    className='my-2 text-xl flex items-center cursor-pointer gap-2'
                >
                    FILTERS
                    <img 
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} 
                        src='/path/to/dropdown_icon' 
                        alt="Toggle Filters" 
                    />
                </p>
                <button 
                    onClick={onClearFilters} 
                    className='bg-black text-white text-xs px-3 py-2 rounded hover:bg-gray-200'
                >
                    Clear Filters
                </button>
            </div>
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Categories</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    {categories.map((category, index) => (
                        <label key={index} className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-3 h-3'
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={toggleCategory}
                            /> 
                            {category}
                        </label>
                    ))}
                </div>
            </div>
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Type</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    {subCategories.map((subCategory, index) => (
                        <label key={index} className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='w-3 h-3'
                                value={subCategory}
                                checked={selectedSubCategories.includes(subCategory)}
                                onChange={toggleSubCategory}
                            /> 
                            {subCategory}
                        </label>
                    ))}
                </div>
            </div>
            {/* New Price Slider Section */}
            <div className={`border border-gray-300 pl-5 py-3 mb-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Price Range</p>
                <div className='flex items-center gap-4'>
                    <span>₹1000</span>
                    <input
                        type='range'
                        min='1000'
                        max='3500'
                        value={localPrice[1]}
                        onChange={handlePriceChange}
                        className='w-full'
                    />
                    <span>₹3500</span>
                </div>
                <p className='text-sm font-light text-gray-700 mt-2'>
                    Up to: ₹{localPrice[1]}
                </p>
            </div>
        </div>
    );
};

Filters.propTypes = {
    categories: PropTypes.array.isRequired,
    subCategories: PropTypes.array.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onSubCategoryChange: PropTypes.func.isRequired,
    onPriceChange: PropTypes.func.isRequired, // New prop type
    onClearFilters: PropTypes.func.isRequired,
    selectedCategories: PropTypes.array.isRequired,
    selectedSubCategories: PropTypes.array.isRequired,
    priceRange: PropTypes.array // New prop type
};

export default Filters;
