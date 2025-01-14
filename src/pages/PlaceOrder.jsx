import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";

const PlaceOrder = () => {
  
  const [method, setMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if(user && user.address){
      setAddress(user.address);
    }
  }, [user]);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
            type="text" 
            placeholder="First Name" 
            value={address.firstName}
            onChange={(e) => setAddress({...address, firstName: e.target.value})}
          />
          <input 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
            type="text" 
            placeholder="Last Name" 
            value={address.lastName}
            onChange={(e) => setAddress({...address, lastName: e.target.value})}
          />
        </div>
        <input 
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
          type="email" 
          placeholder="Email Address" 
          value={address.email}
          onChange={(e) => setAddress({...address, email: e.target.value})}
        />
        <input 
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
          type="text" 
          placeholder="Street" 
          value={address.street}
          onChange={(e) => setAddress({...address, street: e.target.value})}
        />
        <div className="flex gap-3">
          <input 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
            type="text" 
            placeholder="City" 
            value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
          />
          <input 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
            type="text" 
            placeholder="State" 
            value={address.state}
            onChange={(e) => setAddress({...address, state: e.target.value})}
          />
        </div>
        <div className="flex gap-3">
          <input 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
            type="text" 
            placeholder="Zipcode" 
            value={address.zipcode}
            onChange={(e) => setAddress({...address, zipcode: e.target.value})}
          />
          <input 
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
            type="text" 
            placeholder="Country" 
            value={address.country}
            onChange={(e) => setAddress({...address, country: e.target.value})}
          />
        </div>
        <input 
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full p-2" 
          type="number" 
          placeholder="Phone Number" 
          value={address.phoneNumber}
          onChange={(e) => setAddress({...address, phoneNumber: e.target.value})}
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer w-full'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div onClick={() => setMethod('COD')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer w-full'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={() => navigate('/orders')} className=" bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder