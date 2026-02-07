import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import OurPolicy from "../components/OurPolicy";

function About() {
  return (
    <div className="py-10 border-t">
      <Title text1="ABOUT" text2="AFROMART" />
      <h1 className="text-2xl sm:text-3xl font-medium mb-8 prata-regular">
        Celebrating African Style
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="w-full lg:w-1/2 shrink-0">
          <img
            src={assets.about_img}
            alt="AfroMart"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <p className="text-gray-600 leading-relaxed mb-4">
            AfroMart is your destination for authentic African-inspired fashion.
            We bring together traditional craftsmanship with modern design,
            offering a curated collection of clothing that celebrates heritage
            while fitting seamlessly into contemporary life.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            From vibrant prints to comfortable everyday wear, our collections
            for Men, Women, and Kids are designed with quality and style in
            mind. Every piece tells a story—of culture, community, and the
            timeless appeal of African aesthetics.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe fashion is more than what you wear—it&apos;s an
            expression of identity. Explore our collections and find pieces that
            resonate with you.
          </p>
          <Link
            to="/collections"
            className="inline-block mt-8 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800"
          >
            SHOP COLLECTIONS
          </Link>
        </div>
      </div>

      <OurPolicy />

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium">
            ✓
          </div>
          <h3 className="font-medium mb-2">Quality Assured</h3>
          <p className="text-sm text-gray-500">
            Every product is carefully selected for quality and durability.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium">
            ⚡
          </div>
          <h3 className="font-medium mb-2">Fast Delivery</h3>
          <p className="text-sm text-gray-500">
            Quick and reliable shipping to your doorstep.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium">
            ↩
          </div>
          <h3 className="font-medium mb-2">Easy Returns</h3>
          <p className="text-sm text-gray-500">
            7-day hassle-free return policy on all orders.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
