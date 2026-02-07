import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-10 border-t">
      <Title text1="GET IN" text2="TOUCH" />
      <h1 className="text-2xl sm:text-3xl font-medium mb-8 prata-regular">
        Contact Us
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* CONTACT INFO */}
        <div className="lg:w-1/2 shrink-0">
          <div className="mb-8">
            <img
              src={assets.contact_img}
              alt="Contact"
              className="w-full h-auto object-cover max-h-80"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
              <a
                href="tel:+12345678900"
                className="text-gray-700 hover:text-black transition"
              >
                +1-234-567-8900
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
              <a
                href="mailto:contact@afromart.com"
                className="text-gray-700 hover:text-black transition"
              >
                contact@afromart.com
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Address
              </h3>
              <p className="text-gray-700">
                123 Fashion Street
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Support Hours
              </h3>
              <p className="text-gray-700">
                Monday – Friday: 9:00 AM – 6:00 PM
                <br />
                Saturday: 10:00 AM – 4:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="lg:w-1/2">
          <h2 className="text-lg font-medium mb-4">Send us a message</h2>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-6 text-sm">
              Thank you for your message! We&apos;ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 text-sm"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-2 text-sm resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800"
              >
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
