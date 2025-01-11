import { assets } from "../assets/assets"
import Newsletter from "../components/Newsletter"
import Title from "../components/Title"

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>ShopSphere was born out of a passion for innovation and a desire to revolutionize the shopping experience.</p>
          <p>Since our inception, we&apos;ve worked tirelessly to curate a diverse selection of products that cater to all your needs.</p>
          <p>We believe in providing our customers with the best quality products at competitive prices.</p>
          <p>Our team is dedicated to ensuring that your shopping experience is seamless and enjoyable.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at ShopSphere is to empower customers with choice, convenience, and quality.</p>
          <p>We strive to be your go-to destination for all your shopping needs, offering a wide range of products and exceptional customer service.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <p>Quality Assurance:</p>
          <p>We ensure that all our products go through rigorous quality checks to meet the highest standards.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <p>Customer Satisfaction:</p>
          <p>Our customers are at the heart of everything we do. We are committed to providing exceptional service and support.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <p>Wide Range of Products:</p>
          <p>We offer a diverse selection of products to cater to all your needs, from everyday essentials to unique finds.</p>
        </div>
      </div>
      <Newsletter />
    </div>
  )
}

export default About
