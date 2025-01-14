import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Filters from '../components/Filters'; 
import { getFilterObjectFromQuery, getUniqueFilters, getFilteredProducts } from '../utils/filterUtils';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        category: [],
        type: [],
        sortAsc: true,
        sortBy: 'relevant',
        rows: 8,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8); 

    useEffect(() => {
        const initialFilter = getFilterObjectFromQuery(searchParams);
        setFilters(initialFilter);
        setProductsPerPage(initialFilter.rows); 
    }, [searchParams]);

    useEffect(() => {
        applyFilter();
    }, [products, search, showSearch, filters]);

    const applyFilter = () => { 
        let filtered = getFilteredProducts(products, filters);

        if (showSearch && search) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredProducts(filtered);
        setCurrentPage(1); 
    }

    const handleCategoryChange = (selectedCategories) => {
        const updatedFilters = { ...filters, category: selectedCategories };
        setFilters(updatedFilters);
        updateURLParams(updatedFilters);
    }

    const handleSubCategoryChange = (selectedSubCategories) => {
        const updatedFilters = { ...filters, type: selectedSubCategories };
        setFilters(updatedFilters);
        updateURLParams(updatedFilters);
    }

    const handleClearFilters = () => {
        navigate('/collection');
        setFilters({
            category: [],
            type: [],
            sortAsc: true,
            sortBy: 'relevant',
            rows: 8,
        });
        setProductsPerPage(8); 
        setSearchParams({});
    }

    const updateURLParams = (updatedFilters) => {
        const params = {};

        if (updatedFilters.category.length > 0) {
            params.category = updatedFilters.category.join(',');
        }

        if (updatedFilters.type.length > 0) {
            params.type = updatedFilters.type.join(',');
        }

        params.sortAsc = updatedFilters.sortAsc;
        params.sortBy = updatedFilters.sortBy;
        params.rows = updatedFilters.rows; 

        setSearchParams(params);
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const uniqueFilters = getUniqueFilters(products);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filter */}
            <Filters 
                categories={uniqueFilters.category} 
                subCategories={uniqueFilters.type} 
                onCategoryChange={handleCategoryChange} 
                onSubCategoryChange={handleSubCategoryChange} 
                onClearFilters={handleClearFilters}
                selectedCategories={filters.category}
                selectedSubCategories={filters.type}
            />
            {/* Products */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'BROWSE'} text2={'COLLECTIONS'}/>
                    <div className='flex items-center'>
                        <select 
                            onChange={(e) => {
                                const value = e.target.value;
                                let sortBy = 'relevant';
                                let sortAsc = true;
                                if (value === 'low-high') {
                                    sortBy = 'price';
                                    sortAsc = true;
                                } else if (value === 'high-low') {
                                    sortBy = 'price';
                                    sortAsc = false;
                                }
                                const updatedFilters = { ...filters, sortBy, sortAsc };
                                setFilters(updatedFilters);
                                updateURLParams(updatedFilters);
                            }} 
                            className='border-2 border-gray-300 px-2 text-sm mr-2'
                            value={
                                filters.sortBy === 'price' 
                                    ? (filters.sortAsc ? 'low-high' : 'high-low') 
                                    : 'relevant'
                            }
                        >
                            <option value='relevant'>Sort by: Relevant</option>
                            <option value='low-high'>Sort by: Low to High</option>
                            <option value='high-low'>Sort by: High to Low</option>
                        </select>
                        <select 
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setProductsPerPage(value); // Update productsPerPage state
                                const updatedFilters = { ...filters, rows: value };
                                setFilters(updatedFilters);
                                updateURLParams(updatedFilters);
                            }} 
                            className='border-2 border-gray-300 px-2 text-sm'
                            value={productsPerPage} // Bind to productsPerPage state
                        >
                            <option value={4}>4 per page</option>
                            <option value={8}>8 per page</option>
                            <option value={12}>12 per page</option>
                            <option value={16}>16 per page</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        currentProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                        ))
                    }
                </div>
                <div className='mt-4 flex justify-center'>
                    <button 
                        onClick={prevPage} 
                        className='mx-1 px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-200'
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
                        <button 
                            key={number + 1} 
                            onClick={() => paginate(number + 1)}
                            className={`mx-1 px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 ${number + 1 === currentPage ? 'bg-gray-300' : ''}`}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <button 
                        onClick={nextPage} 
                        className='mx-1 px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-200'
                        disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Collection;