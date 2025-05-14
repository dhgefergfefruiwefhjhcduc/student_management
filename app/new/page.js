// "use client";
// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AddStudent() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const studentData = Object.fromEntries(formData.entries());

//     try {
//       const response = await fetch("https://6823110bb342dce800508581.mockapi.io/api/student/students", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(studentData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         toast.success("Student added successfully!");
//         e.target.reset();
//       } else {
//         const error = await response.json();
//         toast.error(error.error || "Failed to add student");
//       }
//     } catch (err) {
//       console.error("Error adding student:", err);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-800">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl"
//         >
//           <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
//             Add New Student
//           </h2>
//           <div className="mb-4">
//             <label htmlFor="stuid" className="block text-sm font-medium mb-1 text-gray-600">
//               Student ID
//             </label>
//             <input
//               type="number"
//               id="stuid"
//               name="stuid"
//               required
//               min="1"
//               max="2026000"
//               placeholder="Enter Student ID"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-600">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               required
//               pattern="[A-Za-z\s]+"
//               maxLength="50"
//               placeholder="Enter Student Name"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="class" className="block text-sm font-medium mb-1 text-gray-600">
//               Class
//             </label>
//             <input
//               type="text"
//               id="class"
//               name="class"
//               required
//               pattern="\d+"
//               maxLength="2"
//               placeholder="Enter Class (e.g., 10)"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="fatname" className="block text-sm font-medium mb-1 text-gray-600">
//               Father's Name
//             </label>
//             <input
//               type="text"
//               id="fatname"
//               name="fatname"
//               required
//               pattern="[A-Za-z\s]+"
//               maxLength="50"
//               placeholder="Enter Father's Name"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="phnum" className="block text-sm font-medium mb-1 text-gray-600">
//               Mobile No
//             </label>
//             <input
//               type="number"
//               id="phnum"
//               name="phnum"
//               required
//               min="1000000000"
//               max="9999999999"
//               placeholder="Enter Mobile Number"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               placeholder="Enter Email Address"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="address" className="block text-sm font-medium mb-1 text-gray-600">
//               Address
//             </label>
//             <textarea
//               id="address"
//               name="address"
//               required
//               maxLength="200"
//               placeholder="Enter Address"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-md hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
//           >
//             Add Student
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStudent() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const studentData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://6823110bb342dce800508581.mockapi.io/api/student/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );

      if (response.ok) {
        await response.json();
        toast.success("Student added successfully!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
        });
        e.target.reset();
      } else {
        const error = await response.json();
        toast.error("Failed to add student!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
      }
    } catch (err) {
      console.error("Error adding student:", err);
       toast.error("Error !", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-800 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-4xl animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <h2 className="text-3xl font-bold col-span-1 md:col-span-2 text-center text-gray-700 mb-4">
            Add New Student
          </h2>

          <InputField id="stuid" label="Student ID" type="number" min="1" max="2026000" required placeholder="Enter Student ID" />
          <InputField id="name" label="Name" type="text" required pattern="[A-Za-z\s]+" maxLength="50" placeholder="Enter Student Name" />
          <InputField id="class" label="Class" type="text" required pattern="\d+" maxLength="2" placeholder="Enter Class (e.g., 10)" />
          <InputField id="fatname" label="Father's Name" type="text" required pattern="[A-Za-z\s]+" maxLength="50" placeholder="Enter Father's Name" />
          <InputField id="phnum" label="Mobile No" type="number" required min="1000000000" max="9999999999" placeholder="Enter Mobile Number" />
          <InputField id="email" label="Email" type="email" required placeholder="Enter Email Address" />

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium mb-1 text-gray-600">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              maxLength="200"
              placeholder="Enter Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-md hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function InputField({ id, label, type, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
}
