
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const usersession = sessionStorage.getItem("user");

  const [students, setStudents] = useState([]);
  const [originalStudents, setOriginalStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setsearch] = useState("");

  useEffect(() => {
    if (!loading && (!user || !usersession)) {
      router.push("/signup");
    }
  }, [user, usersession, loading, router]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://6823110bb342dce800508581.mockapi.io/api/student/students");
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
        setOriginalStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handelserach = (e) => setsearch(e.target.value);

  const handelfind = () => {
    const filtered = originalStudents.filter((student) =>
      [student.name, student.stuid, student.class, student.fatname]
        .some((field) =>
          field.toString().toLowerCase().includes(search.toLowerCase())
        )
    );
    if (filtered.length === 0) {
      alert("No students found");
    } else {
      setStudents(filtered);
    }
    setsearch("");
  };

  const handelall = () => setStudents(originalStudents);
  const handleEdit = (id) => router.push(`/edit?id=${id}`);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`https://6823110bb342dce800508581.mockapi.io/api/student/students/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setStudents((prev) => prev.filter((s) => s.id !== id));
          setOriginalStudents((prev) => prev.filter((s) => s.id !== id));
          alert("Student deleted successfully!");
        } else {
          alert("Failed to delete student");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "linear-gradient(to right, #4f46e5, #9333ea, #ec4899)", color: "white" }}>
      
      {/* Hero Section */}
    {/* Hero Section */}
<div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
  <img
    src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc"
    alt="Hero"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "brightness(50%)",
    }}
  />
  <div
    style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      zIndex: 10,
      backdropFilter: "blur(8px)",
      backgroundColor: "rgba(239, 68, 68, 0.4)", // red with transparency
      padding: "10px 20px",
      borderRadius: "6px",
    }}
  >
    <button
      onClick={() => {
        signOut(auth);
        sessionStorage.removeItem("user");
      }}
      style={{
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Logout
    </button>
  </div>
  <div style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    animation: "bounce 2s infinite"
  }}>
    <h1 style={{
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#fff",
      textShadow: "2px 2px 10px black",
    }}>
      Student Management System
    </h1>
  </div>
</div>


      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -48%); }
          50% { transform: translate(-50%, -52%); }
        }
      `}</style>
      

      {/* Main */}
      <main style={{ padding: "2rem" }}>
        {/* Search + Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <button
            onClick={() => router.push("/new")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none"
            }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            Add New Student
          </button>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <input
            value={search}
            onChange={handelserach}
            placeholder="Search by Name, ID, Class, Section"
            type="search"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white"
            }}
          />
          <button
            onClick={handelfind}
            style={{
              backgroundColor: "#facc15",
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/wjyqkiew.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#000000"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
          </button>
          <button
            onClick={handelall}
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Show All
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <div style={{ overflowX: "auto", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {["S.No", "Student ID", "Name", "Class", "Father Name", "Mobile No", "Email", "Address", "Actions"].map((head, idx) => (
                    <th key={idx} style={{ padding: "10px", textAlign: "center" }}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={idx} onClick={() => router.push(`/detail?id=${student.id}`)} style={{ cursor: "pointer", transition: "0.2s" }}>
                    <td style={{ padding: "10px", textAlign: "center" }}>{idx + 1}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{student.stuid}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{student.name}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{student.class}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{student.fatname}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{student.phnum}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{student.email}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>{student.address}</td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(student.id);
                        }}
                        style={{
                          marginRight: "6px",
                          padding: "6px",
                          borderRadius: "6px",
                          backgroundColor: "#10b981",
                          border: "none"
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#ffffff"
                          style={{ width: "20px", height: "20px" }}
                        ></lord-icon>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(student.id);
                        }}
                        style={{
                          padding: "6px",
                          borderRadius: "6px",
                          backgroundColor: "#f43f5e",
                          border: "none"
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#ffffff"
                          style={{ width: "20px", height: "20px" }}
                        ></lord-icon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer style={{
        backgroundColor: "rgba(255,255,255,0.1)",
        textAlign: "center",
        padding: "1rem",
        color: "#d1d5db",
        marginTop: "2rem"
      }}>
        © 2025 School Management System. All rights reserved.
      </footer>
    </div>
  );
}
