import { observer } from 'mobx-react-lite'
import { makeAutoObservable } from 'mobx'
import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from './ProductItem'

class NewCollectionStore {
    latestProducts = []

    constructor() {
        makeAutoObservable(this)
    }

    setLatestProducts(data) {
        this.latestProducts = data
    }
}

const newCollectionStore = new NewCollectionStore()

const NewCollection = observer(() => {
    const { products } = useContext(ShopContext)

    useEffect(() => {
        newCollectionStore.setLatestProducts(products.slice(0, 10))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1='Latest' text2='Collection' />
                <p className='w-3/4 m-auto text-xs sm:text-sm text-gray-600'>
                    Shop the Latest Winter A/W 2024 Collection
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {newCollectionStore.latestProducts.map((item,index) => (
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

export default NewCollection
