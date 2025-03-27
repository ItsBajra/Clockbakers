// import React from "react";

// const ContactUs = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header Section */}
//       <div className="relative w-full">
//   {/* First Row with Two Sub-Rows */}
//   <div className="bg-gray-100 py-6 text-center">
//     <div>
//       <h2 className="text-3xl font-serif">Enjoy fresh items of our</h2>
//     </div>
//     <div>
//       <h1 className="text-4xl font-bold text-pink-600">Clock Bakers</h1>
//     </div>
//   </div>

//   {/* Second Row - Image */}
//   <div className="relative w-full">
//     <img
//       src="src/assets/contactus.png"
//       alt="Header"
//       className="w-full object-cover h-80"
//     />
//   </div>

//   {/* Third Row - Two Sub-Rows with Left Side Text */}
//   <div className="bg-gray-100 py-6 flex flex-col md:flex-row items-center px-6">
//   <div className="md:w-1/2 text-center">
//     <h3 className="text-4xl font-bold">Get in touch with us</h3>

//   </div>
//   <div className="md:w-1/2"></div>
// </div>
// </div>
//       {/* Contact Form Section */}
//       <div className="max-w-5xl mx-auto px-6 py-10">
//         <form className="bg-transparent p-8 rounded-lg shadow-md">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="border p-3 rounded w-full"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="border p-3 rounded w-full"
//             />
//             <input
//               type="text"
//               placeholder="Phone Number (optional)"
//               className="border p-3 rounded w-full"
//             />
//           </div>
//           <textarea
//             placeholder="Message"
//             className="border p-3 rounded w-full h-32 mb-4"
//           ></textarea>
//           <button className="bg-pink-600 text-white px-6 py-3 rounded-lg w-full md:w-auto">
//             Leave us a Message →
//           </button>
//         </form>
//       </div>

//       {/* Contact Info */}
//       {/* <div className="bg-gray-200 py-10 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h3 className="text-xl font-bold mb-4">We are always happy to assist you</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div>
//               <h4 className="font-semibold">Email Address</h4>
//               <p>clockbakers@gmail.com</p>
//               <p className="text-sm">Assistance hours: Saturday - Sunday 24 hours</p>
//             </div>
//             <div>
//               <h4 className="font-semibold">Number</h4>
//               <p>(977) 9861452871</p>
//               <p className="text-sm">Assistance hours: Saturday - Sunday 24 hours</p>
//             </div>
//           </div>
//         </div>
//       </div> */}
//       <div className="bg-gray-200 py-10 px-6">
//   <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//     {/* Left Column */}
//     <div>
//       <h3 className="text-4xl font-bold text-gray-800">
//         We are always
//       </h3>
//       <h3 className="text-4xl font-bold text-gray-800">
//         happy to assist you
//       </h3>
//     </div>

//     {/* Right Column */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Email Address Section */}
//       <div>
//         <h4 className="font-semibold text-lg text-gray-700">Email Address:</h4>
//         <p className="text-gray-600">clockbakers@gmail.com</p>
//         <p className="text-sm text-gray-500">Assistance hours: Saturday - Sunday 24 hours</p>
//       </div>

//       {/* Phone Number Section */}
//       <div>
//         <h4 className="font-semibold text-lg text-gray-700">Number:</h4>
//         <p className="text-gray-600">(977) 9861452871</p>
//         <p className="text-sm text-gray-500">Assistance hours: Saturday - Sunday 24 hours</p>
//       </div>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// };

// export default ContactUs;


import React from "react";
import Header from "./Home/Header";
import Navbar from "../components/navbar";

const ContactUs = () => {
  return (
    <div>
        <Header/>
        <Navbar/>
          <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen"
          style={{backgroundImage: "url('src/assets/Bgpattern.png')"}}>
      {/* Header Section */}
      <div className="relative w-full">
        {/* Text Header */}
        <div className="flex flex-col md:flex-row items-center">
            {/* First Column - Image aligned to the right */}
            <div className="md:w-1/3 flex justify-end">
            <img src="src/assets/contactus/white-wheat.png" alt="Baked Items" className="w-40 md:w-56 object-cover" />
            </div>

            {/* Second Column - Two sub-rows */}
            <div className="md:w-1/3 text-center px-6">
            <div>
                <h2 className="text-2xl md:text-3xl font-light text-gray-700 italic font-[Tangerine]">
                Enjoy fresh items of our
                </h2>
            </div>
            <div className="mt-2">
                <h1 className="text-3xl md:text-5xl font-bold text-pink-600 italic font-[Tangerine]">
                Clock Bakers
                </h1>
            </div>
            </div>

            {/* Third Column - Empty Space */}
            <div className="md:w-1/3 px-6"></div>
        </div>

        {/* Cards Section */}
        <div className="flex justify-center items-center gap-6 bg-transparent py-5">
        {/* Card 1 */}
       
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-44 h-54 flex justify-center items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="src/assets/contactus/img1.png" alt="Baking Dough" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-54 h-64 flex justify-center items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="src/assets/contactus/img2.png" alt="Baking Dough" className="w-full h-full object-cover rounded-2xl" />
        </div>
      

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-64 h-84 flex justify-center items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="src/assets/contactus/img3.png" alt="Decorating Cake" className="w-full h-full object-cover rounded-2xl" />
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-54 h-64 flex justify-center items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="src/assets/contactus/img4.png" alt="Croissant & Coffee" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-44 h-54 flex justify-center items-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img src="src/assets/contactus/img5.png" alt="Croissant & Coffee" className="w-full h-full object-cover rounded-2xl" />
        </div>
       
        </div>


        </div>


      {/* Contact Form Section */}
      <div className="max-w-5xl mx-auto px-6 py-6 md:py-6">
        <div className="bg-transparent rounded-xl shadow-lg overflow-hidden">
          <div className="p-5 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Send us a message
            </h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone (optional)</label>
                  <input
                    type="text"
                    placeholder="+1 (123) 456-7890"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Your Message</label>
                <textarea
                  placeholder="How can we help you?"
                  className="border border-gray-300 p-3 rounded-lg w-full h-32 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
                ></textarea>
              </div>
              <button className="bg-pink-600 hover:bg-pink-800 text-white font-medium px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105 shadow-md">
                Leave us a Message →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-50 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Left Column */}
            <div className="md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                We are always
              </h3>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-100">
                happy to assist you
              </h3>
            </div>

            {/* Right Column */}
            <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-pink-100 p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">
                  Email Address
                </h4>
                <p className="text-gray-600 mb-2">clockbakers@gmail.com</p>
                <p className="text-sm text-gray-500">
                  Assistance hours: Saturday - Sunday 24 hours
                </p>
              </div>
              <div className="bg-pink-100 p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">
                  Phone Number
                </h4>
                <p className="text-gray-600 mb-2">(977) 9861452871</p>
                <p className="text-sm text-gray-500">
                  Assistance hours: Saturday - Sunday 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default ContactUs;