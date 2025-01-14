import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import cartStore from "../stores/CartStore";

const Cart = observer(() => {
  const { products, currency, navigate } = useContext(ShopContext);

  useEffect(() => {
    console.log("Cart Data:", cartStore.cartData);
    console.log("Products:", products);
  }, [cartStore.cartData, products]);

  const handleQuantityChange = (e, id, size) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      cartStore.updateQuantity(id, size, value);
    }
  };


  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div>
        {cartStore.cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          if (!productData) {
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700">
                <p>Product not found</p>
              </div>
            );
          }

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={productData.image[0]} alt="" className="w-16 sm:w-20" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => handleQuantityChange(e, item._id, item.size)}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => cartStore.updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                alt="delete"
                className="w-4 mr-4 sm:w-5 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Cart;