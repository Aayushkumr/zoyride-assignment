import { observer } from 'mobx-react-lite';
import cartStore from '../stores/cartStore';
import Title from './Title';

const CartTotal = observer(() => {
  const { currency, delivery_fee } = cartStore;

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {cartStore.getCartAmount}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency} {delivery_fee}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency} {cartStore.getCartAmount === 0 ? 0 : cartStore.getCartAmount + delivery_fee}.00</b>
        </div>
      </div>
    </div>
  );
});

export default CartTotal;
