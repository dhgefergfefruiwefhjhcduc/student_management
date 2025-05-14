// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function EditStudent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const studentId = searchParams.get("id"); // Get the student ID from the query params
//   const [student, setStudent] = useState(null); // Store the student's current data
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await fetch(`https://6823110bb342dce800508581.mockapi.io/api/student/students/${studentId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch student data");
//         }
//         const data = await response.json();
//         setStudent(data);
//       } catch (error) {
//         console.error("Error fetching student:", error);
//         toast.error("Failed to fetch student data");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (studentId) {
//       fetchStudent();
//     }
//   }, [studentId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const updatedStudent = Object.fromEntries(formData.entries());

//     try {
//       const response = await fetch(`https://6823110bb342dce800508581.mockapi.io/api/student/students/${studentId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedStudent),
//       });

//       if (response.ok) {
//         toast.success("Student updated successfully!");
//         setTimeout(() => {
//             router.push("/Home"); // Redirect to the home page
//         }, 2000);
//       } else {
//         const error = await response.json();
//         toast.error(error.error || "Failed to update student");
//       }
//     } catch (err) {
//       console.error("Error updating student:", err);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return <p className="text-center text-gray-500">Loading...</p>;
//   }

//   if (!student) {
//     return <p className="text-center text-red-500">Student not found</p>;
//   }

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-800">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl"
//         >
//           <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
//             Edit Student
//           </h2>
//           <div className="mb-4">
//             <label htmlFor="id" className="block text-sm font-medium mb-1 text-gray-600">
//               Student ID
//             </label>
//             <input
//               type="text"
//               id="id"
//               name="id"
//               defaultValue={student.id}
//               readOnly
//               className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
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
//               defaultValue={student.name}
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
//               defaultValue={student.class}
//               required
//               pattern="\d+"
//               maxLength="2"
//               placeholder="Enter Class (e.g., 10)"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="fatherName" className="block text-sm font-medium mb-1 text-gray-600">
//               Father's Name
//             </label>
//             <input
//               type="text"
//               id="fatherName"
//               name="fatherName"
//               defaultValue={student.fatname}
//               required
//               pattern="[A-Za-z\s]+"
//               maxLength="50"
//               placeholder="Enter Father's Name"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="mobile" className="block text-sm font-medium mb-1 text-gray-600">
//               Mobile No
//             </label>
//             <input
//               type="number"
//               id="mobile"
//               name="mobile"
//               defaultValue={student.phnum}
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
//               defaultValue={student.email}
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
//               defaultValue={student.address}
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
//             Update Student
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditStudent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get("id"); // Get the student ID from the query params
  const [student, setStudent] = useState(null); // Store the student's current data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`https://6823110bb342dce800508581.mockapi.io/api/student/students/${studentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
        toast.error("Failed to fetch data!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
      } finally {
        setIsLoading(false);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedStudent = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://6823110bb342dce800508581.mockapi.io/api/student/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      if (response.ok) {
        toast.success("Updated successfully!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
        });
        setTimeout(() => {
            router.push("/Home"); // Redirect to the home page
        }, 2000);
      } else {
        const error = await response.json();
        toast.error("Failed update!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (err) {
      console.error("Error updating student:", err);
      toast.error("Error!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
        });
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!student) {
    return <p className="text-center text-red-500">Student not found</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-800 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-2xl w-full max-w-2xl animate-fadeIn grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700 col-span-2">
            Edit Student
          </h2>

          <InputField id="id" label="Student ID" value={student.id} readOnly />
          <InputField id="name" label="Name" value={student.name} required />
          <InputField id="class" label="Class" value={student.class} required />
          <InputField id="fatherName" label="Father's Name" value={student.fatname} required />
          <InputField id="mobile" label="Mobile No" value={student.phnum} required />
          <InputField id="email" label="Email" value={student.email} required />
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium mb-1 text-gray-600">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              defaultValue={student.address}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-md hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function InputField({ id, label, value, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-600">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        defaultValue={value}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />
    </div>
  );
}
