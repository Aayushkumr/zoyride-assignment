import { makeAutoObservable } from "mobx";
import { toast } from 'react-toastify';
import { products } from "../assets/assets"; 

class CartStore {
    cartItems = {};
    currency = '₹';
    delivery_fee = 100;

    constructor() {
        makeAutoObservable(this);
    }

    addToCart(itemId, size, quantity) {
        if (!size || quantity <= 0) {
            toast.error('Please select a valid size and quantity');
            return;
        }

        if (this.cartItems[itemId]) {
            if (this.cartItems[itemId][size]) {
                this.cartItems[itemId][size] += quantity;
            } else {
                this.cartItems[itemId][size] = quantity;
            }
        } else {
            this.cartItems[itemId] = { [size]: quantity };
        }

        toast.success('Item added to cart');
        console.log("Cart Items after addToCart:", this.cartItems);
    }

    updateQuantity(itemId, size, quantity) {
        if (this.cartItems[itemId] && this.cartItems[itemId][size]) {
            this.cartItems[itemId][size] = quantity;
        }

        console.log("Cart Items after updateQuantity:", this.cartItems);
    }

    removeItem(itemId, size) {
        if (this.cartItems[itemId] && this.cartItems[itemId][size]) {
            delete this.cartItems[itemId][size];
            if (Object.keys(this.cartItems[itemId]).length === 0) {
                delete this.cartItems[itemId];
            }
        }

        console.log("Cart Items after removeItem:", this.cartItems);
    }

    clearCart() {
        this.cartItems = {};
        console.log("Cart Items after clearCart:", this.cartItems);
    }

    get cartData() {
        const tempData = [];
        for (const items in this.cartItems) {
            for (const item in this.cartItems[items]) {
                if (this.cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: this.cartItems[items][item],
                    });
                }
            }
        }
        return tempData;
    }

    get totalItems() {
        let total = 0;
        for (const items in this.cartItems) {
            for (const item in this.cartItems[items]) {
                total += this.cartItems[items][item];
            }
        }
        return total;
    }

    get getCartCount() {
        let totalCount = 0;
        for (const items in this.cartItems) {
            for (const item in this.cartItems[items]) {
                try {
                    if (this.cartItems[items][item] > 0) {
                        totalCount += this.cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    }

    get getCartAmount() {
        let totalAmount = 0;
        for (const items in this.cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in this.cartItems[items]) {
                totalAmount += itemInfo.price * this.cartItems[items][item];
            }
        }
        return totalAmount;
    }
}

const cartStore = new CartStore();
export default cartStore;