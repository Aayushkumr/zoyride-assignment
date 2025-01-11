import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="" />
        <p className="w-full md:w-2/3 text-gray-400">
            © 2025 ShopSphere. All rights reserved.
        </p>
      </div>
      <div>
        <p className="font-medium text-xl mb-5">Company</p>
        <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>New Collection</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
        </ul>
      </div>
      <div>
        <p className="font-medium text-xl mb-5">Contact Us!</p>
        <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9136658663</li>
            <li>aayushkumr25@gmail.com</li>
        </ul>
      </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-center text-sm text-gray-800">Designed & Developed by Aayush Kumar.</p>
      </div>
    </div>
  )
}

export default Footer
