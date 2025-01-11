import { assets } from "../assets/assets"

const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">Hassle-free exchange</p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">30 Days Exchange</p>
        <p className="text-gray-400">Tags and Original Packing shouldn&apos;t be damaged
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">24/7 Customer Support</p>
        <p className="text-gray-400">Call Us on our toll-free number</p>
      </div>
    </div>
  )
}

export default Policy
