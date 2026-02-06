import { assets } from "./../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="py-10 px-5 md:px-10">
      <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-gray-800">
        <div>
          <img src={assets.logo2} className="mb-5 w-17" alt="Company Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer hover:text-black transition">Home</li>
            <li className="cursor-pointer hover:text-black transition">
              About us
            </li>
            <li className="cursor-pointer hover:text-black transition">
              Delivery
            </li>
            <li className="cursor-pointer hover:text-black transition">
              Privacy policy
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-234-567-8900</li>
            <li>contact@example.com</li>
            <li>123 Street, City, Country</li>
          </ul>
        </div>
      </div>

      <div className="border-t pt-5 text-center text-gray-600 mt-10">
        <p>© 2024 Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
