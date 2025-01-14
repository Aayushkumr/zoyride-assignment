import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import cartStore from '../stores/CartStore';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

class NavbarStore {
    visible = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleVisible() {
        this.visible = !this.visible;
    }
}

const navbarStore = new NavbarStore();

const Navbar = observer(() => {

    const { setShowSearch } = useContext(ShopContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt='' />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative' >
                    <Link to='/login'><img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" /></Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <Link to='/profile' className='cursor-pointer hover:text-black'>My Profile</Link>
                            <Link to='/orders' className='cursor-pointer hover:text-black'>Orders</Link>
                            <Link to='/login' className='cursor-pointer hover:text-black'>Logout</Link>
                        </div>
                    </div>
                </div >
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-8px]'>{cartStore.getCartCount}</p>
                </Link>
                <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" onClick={() => navbarStore.toggleVisible()} />
            </div >
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${navbarStore.visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => navbarStore.toggleVisible()} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <ul className='flex flex-col text-lg'>
                        <NavLink to='/' onClick={() => navbarStore.toggleVisible()} className='py-2 pl-6 border'>HOME</NavLink>
                        <NavLink to='/collection' onClick={() => navbarStore.toggleVisible()} className='py-2 pl-6 border'>COLLECTION</NavLink>
                        <NavLink to='/about' onClick={() => navbarStore.toggleVisible()} className='py-2 pl-6 border'>ABOUT</NavLink>
                        <NavLink to='/contact' onClick={() => navbarStore.toggleVisible()} className='py-2 pl-6 border'>CONTACT</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
});

export default Navbar;
