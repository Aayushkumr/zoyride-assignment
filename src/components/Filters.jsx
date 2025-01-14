import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const Filters = ({ categories, subCategories, onCategoryChange, onSubCategoryChange }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Clear URL params on mount
        searchParams.delete('categories');
        searchParams.delete('subCategories');
        setSearchParams(searchParams);
    }, []);

    const updateQueryParams = (selected, paramName) => {
        searchParams.delete(paramName);
        if (selected.length) searchParams.set(paramName, selected.join(','));
        setSearchParams(searchParams);
    };

    const toggleCategory = (e) => {
        const value = e.target.value;
        setSelectedCategories((prev) => {
            const newCategories = prev.includes(value) ? prev.filter((category) => category !== value) : [...prev, value];
            onCategoryChange(value);
            updateQueryParams(newCategories, 'categories');
            return newCategories;
        });
    };

    const onClearFilters = () => {
        setSelectedCategories([]);
        setSelectedSubCategories([]);
        searchParams.delete('categories');
        searchParams.delete('subCategories');
        setSearchParams(searchParams);
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSelectedSubCategories((prev) => {
            const newSubCategories = prev.includes(value) ? prev.filter((subCategory) => subCategory !== value) : [...prev, value];
            onSubCategoryChange(value);
            updateQueryParams(newSubCategories, 'subCategories');
            return newSubCategories;
        });
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedSubCategories([]);
        searchParams.delete('categories');
        searchParams.delete('subCategories');
        setSearchParams(searchParams);
    };

    return (
        <div className='min-w-60'>
            <div className='flex justify-between items-center'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src='/path/to/dropdown_icon' alt="" />
                </p>
                <button onClick={onClearFilters} className=' bg-black text-white text-xs px-10 text-sm px-3 py-2 rounded hover:bg-gray-200'>
                    Clear Filters
                </button>
            </div>
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Categories</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    {categories.map((category, index) => (
                        <p key={index} className='flex gap-2'>
                            <input
                                type='checkbox'
                                className='w-3'
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={toggleCategory}
                            /> {category}
                        </p>
                    ))}
                </div>
            </div>
            <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                <p className='mb-3 text-sm font-medium'>Type</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    {subCategories.map((subCategory, index) => (
                        <p key={index} className='flex gap-2'>
                            <input
                                type='checkbox'
                                className='w-3'
                                value={subCategory}
                                checked={selectedSubCategories.includes(subCategory)}
                                onChange={toggleSubCategory}
                            /> {subCategory}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

Filters.propTypes = {
    categories: PropTypes.array.isRequired,
    subCategories: PropTypes.array.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onSubCategoryChange: PropTypes.func.isRequired,
};

export default Filters;
