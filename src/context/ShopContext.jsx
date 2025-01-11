import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/assets";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const currency = '₹';
    const delivery_fee = 100;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();


    const addToCart = async (itemId, size) => {

        if(!size) {
            toast.error('Please select a size');
            return;
        }

        let cartCopy = structuredClone(cartItems);
        
        if (cartCopy[itemId]) {
            if(cartCopy[itemId][size]) {
                cartCopy[itemId][size] += 1;
            }
         else {
            cartCopy[itemId][size] = 1;
        }
    } else {
        cartCopy[itemId] = {};
        cartCopy[itemId][size] = 1;
    }
        setCartItems(cartCopy);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) => { 
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => { 
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]) {
                totalAmount += itemInfo.price * cartItems[items][item];
            }
        }
        return totalAmount;
    }
    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCartItems(JSON.parse(localStorage.getItem('cart')));
        }
    }, [cartItems])

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )

}

ShopContextProvider.propTypes = {
    children: PropTypes.node
}

export default ShopContextProvider;
