import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Pagination from 'react-bootstrap/Pagination';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relevent');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
        setCategory(prev=> prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

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

    const toggleSubCategory = (e) => {
      if(subCategory.includes(e.target.value)){
        setSubCategory(prev=> prev.filter(item => item !== e.target.value));
      } else {
        setSubCategory(prev => [...prev, e.target.value]);
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
	  <div className='min-w-60'>
		<p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
      <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
    </p>
    {/* Category Filter */}
		<div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
      <p className='mb-3 text-sm font-medium'>Categories</p>
      <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
        <p className='flex gap-2'>
        <input type='checkbox' className='w-3' value={'Men'} onChange={toggleCategory}/>  Men
        </p>
        <p className='flex gap-2'>
        <input type='checkbox' className='w-3' value={'Women'} onChange={toggleCategory}/>  Women
        </p>
        <p className='flex gap-2'>
        <input type='checkbox' className='w-3' value={'Kids'} onChange={toggleCategory}/>  Kids
        </p>
		</div>
	  </div>
    {/* Subcategory Filter */}
    <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
      <p className='mb-3 text-sm font-medium'>Type</p>
      <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
        <p className='flex gap-2'>
        <input type='checkbox' className='w-3' value={'Topwear'} onChange={toggleSubCategory}/>  Topwear
        </p>
        <p className='flex gap-2'>
        <input type='checkbox' className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/>  Bottomwear
        </p>
        <p className='flex gap-2'>
        <input type='checkbox' className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/>  Winterwear
        </p>
		</div>
	  </div>
    </div>
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
      <Pagination className='mt-4 flex justify-center'>
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
          <Pagination.Item 
            key={number + 1} 
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-200 ${number + 1 === currentPage ? 'bg-gray-300' : ''}`}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
	</div>
  );
}

export default Collection
