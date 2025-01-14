import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Filters from '../components/Filters'; 

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const applyFilter = () => { 
    let productsCopy = products.slice();
    if(showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilteredProducts(productsCopy);
    setCurrentPage(1); // Reset to first page
  }

  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
    setCurrentPage(1); // Reset to first page
  }

  const handleCategoryChange = (value) => {
    if(category.includes(value)){
        setCategory(prev=> prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  }

  const handleSubCategoryChange = (value) => {
    if(subCategory.includes(value)){
      setSubCategory(prev=> prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch])

  useEffect(() => { 
    sortProduct();
  } ,[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter */}
      <Filters 
        categories={['Men', 'Women', 'Kids']} 
        subCategories={['Topwear', 'Bottomwear', 'Winterwear']} 
        onCategoryChange={handleCategoryChange} 
        onSubCategoryChange={handleSubCategoryChange} 
      />
      {/* Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'BROWSE'} text2={'COLLECTIONS'}/>
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 px-2 text-sm'>
            <option value='relevent'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
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
