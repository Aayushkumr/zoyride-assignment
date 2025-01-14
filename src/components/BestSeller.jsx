import { useContext, useEffect } from 'react'
import { observer, useLocalObservable } from 'mobx-react-lite';
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = observer(() => {
    const { products } = useContext(ShopContext);
    const store = useLocalObservable(() => ({
        bestSeller: [],
        setBestSeller(items) {
            this.bestSeller = items;
        },
    }));

    useEffect(() => {
        const filtered = products.filter(item => item.bestseller);
        store.setBestSeller(filtered.slice(0, 5));
    }, [products, store]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'Best'} text2={'Sellers'} />
                <p className='w-3/4 m-auto text-sc sm:text-sm md:text-base text-gray-600'>
                    Our Bestsellers from the last 24 Hours
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {store.bestSeller.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    )
})

export default BestSeller