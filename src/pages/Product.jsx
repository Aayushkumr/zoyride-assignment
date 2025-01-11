import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  
  const fetchProductData = async () => {
    products.map((item) => {
    if(item._id === productId) {
      setProductData(item);
      setImage(item.image[0]);
      return null;
    }
  }
  )}


  useEffect(() => {
    fetchProductData();
  }, [productId]);


  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justfiy-normal sm:w-[18.7%] w-full">
              {
              productData.image.map((item, index) => (
                <img key={index} src={item} alt={productData.name} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
              ))
              }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="w-full h-auto" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="rating" className="h-5"></img>
            <img src={assets.star_icon} alt="rating" className="h-5"></img>
            <img src={assets.star_icon} alt="rating" className="h-5"></img>
            <img src={assets.star_icon} alt="rating" className="h-5"></img>
            <img src={assets.star_dull_icon} alt="rating" className="h-5"></img>
              <p className="pl-2">(122)</p>
          </div>

          <p className="text-3xl font-medium mt-5">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={()=>setSize(item)} key={index} className={`border bg-gray-100 px-4 py-2 ${item === size ? 'border-black border-2': ''}`}>{item}</button>
              ))}
            </div>
          </div>
              <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white py-3 px-8 text-sm active:bg-gray-400">ADD TO CART</button>
              <hr className="mt-8 sm:w-4/5 "/>
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original</p>
                <p>Cash on delivery available.</p>
                <p>Easy return and exchange policy within 7days.</p>
              </div>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="flex">
            <b className="border px-5 py-3 text-sm">Description</b>
            <p className="border px-5 py-3 text-sm">Reviews (214)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>This premium quality clothing item is designed to offer both style and comfort. Made from high-quality materials, it ensures durability and a perfect fit. Whether you&apos;re dressing up for a special occasion or keeping it casual, this versatile piece is a must-have in your wardrobe. </p>
            <p>Available in various sizes to cater to your needs, it promises to enhance your fashion quotient effortlessly.</p>
          </div>
        </div>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className="opacity-0"></div>
}

export default Product
