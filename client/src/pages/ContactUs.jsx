import { useState } from "react";
import axios from "axios";
import contactBg from "../assets/bgImage.png";
import contactImg from "../assets/contact.svg";

function ContactUs() {

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
message:""
});

const [success,setSuccess] = useState("");

const handleChange = (e) => {
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e) => {

e.preventDefault();

try{

await axios.post("https://shiksha18.onrender.com/api/contact",form);

setSuccess("Message sent successfully!");

setForm({
name:"",
email:"",
phone:"",
message:""
});

}catch(err){
console.log(err);
}

};

  return (
    <div className="w-full">

      {/* HERO SECTION */}
<div
  className="h-[260px] bg-cover bg-center flex items-center justify-center mt-[124px] relative"
  style={{ backgroundImage: `url(${contactBg})` }}
>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* TEXT */}
  <div className="relative text-center text-white max-w-3xl px-6">

    <h1 className="text-4xl font-bold">
      Contact Us
    </h1>

    <p className="mt-2 text-lg">
      Get the latest news, updates and tips
    </p>

  </div>

</div>

      {/* CONTACT INFO */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="bg-gray-100 rounded-lg grid md:grid-cols-3 gap-6 p-6 text-center">

          <div>
            <h3 className="font-semibold text-blue-900 ">Address</h3>
            <p className="text-gray-600">Office N0. 531, Mandi, Himachal Pradesh</p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-900">Phone</h3>
            <p className="text-gray-600">+91 9857002222</p>
          </div>

          <div>
            <h3 className="font-semibold text-blue-900">Email</h3>
            <p className="text-gray-600">info@collegechale.com</p>
          </div>

        </div>
      </div>

      {/* CONTACT FORM SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE FORM */}
        <div>

          <p className="text-blue-600 text-sm">Contact us</p>

          <h2 className="text-3xl font-bold mt-2">
            Get in touch
          </h2>

          <p className="text-gray-500 mt-2 mb-6">
            The right move at the right time saves your investment.
            live the dream of expanding your business.
          </p>

          <form onSubmit={handleSubmit}>

          {/* INPUT ROW */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="border rounded-md p-3 w-full"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="border rounded-md p-3 w-full"
              required
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="border rounded-md p-3 w-full"
              required
            />

          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="border rounded-md p-3 w-full h-36 mb-5"
            required
          />

          <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition"
          >
            Send Message
          </button>

          </form>

          {success && (
            <p className="text-green-600 mt-4">{success}</p>
          )}

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center">

          <img
            src={contactImg}
            alt="contact"
            className="w-[420px]"
          />

        </div>

      </div>

    </div>
  );
}

export default ContactUs;