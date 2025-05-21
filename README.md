# Student Management System

Welcome to the **Student Management System**!  
This is a modern, responsive web application for managing student records, built with **Next.js**, **React**, and **Firebase Authentication**. The project demonstrates best practices in authentication, CRUD operations, and responsive UI design.

---

## 🚀 Features

- **User Authentication:** Secure login/logout using Firebase Authentication.
- **Student CRUD:** Add, edit, delete, and view student records.
- **Search & Filter:** Quickly find students by name, ID, class, or section.
- **Responsive Design:** Fully mobile-friendly and desktop-ready.
- **Modern UI:** Clean interface with Lordicon animated icons and Tailwind-inspired styling.
- **Mock API:** Uses [MockAPI](https://mockapi.io/) for student data storage and retrieval.

---

## 🛠️ Technologies Used

- **Next.js** (App Router)
- **React**
- **Firebase Authentication**
- **MockAPI** (for student data)
- **Tailwind CSS** (utility classes and custom styles)
- **Lordicon** (animated SVG icons)
- **React Toastify** (notifications)

---

## 📁 Project Structure

```
student_management/
├── app/
│   ├── Home/
│   │   └── page.js         # Dashboard & student list
│   ├── new/
│   │   └── page.js         # Add new student
│   ├── edit/
│   │   └── page.js         # Edit student details
│   ├── layout.jsx          # Root layout and global providers
│   └── globals.css         # Global styles
├── firebase/
│   └── config.js           # Firebase configuration
├── public/
│   └── assets/             # Static assets (images, icons)
└── README.md
```

---

## 🔑 Authentication Flow

- On visiting the app, users are checked for a valid Firebase session and a session token in `sessionStorage`.
- If not authenticated, users are redirected to `/signup`.
- After login/signup, users are redirected to the Home page.

---

## 📋 Main Pages & Components

### Home Page (`/Home`)
- **Hero Section:** Eye-catching banner with animated heading and logout button.
- **Student Table:** Responsive table listing all students with edit/delete actions.
- **Search & Actions:** Search bar, "Add New Student", and "Show All" buttons.
- **Logout:** Securely logs out the user and clears session data.

### Add New Student (`/new`)
- Form to add a student with validation for all fields.
- On success, shows a toast notification and redirects to Home.

### Edit Student (`/edit?id=...`)
- Pre-fills form with selected student data.
- Responsive, two-column layout on desktop, single-column on mobile.
- On update, shows a toast and redirects to Home.

---

## 🌐 API Endpoints (MockAPI)

| Method | Endpoint                                         | Description              |
|--------|--------------------------------------------------|--------------------------|
| GET    | `/students`                                      | Fetch all students       |
| POST   | `/students`                                      | Add a new student        |
| PUT    | `/students/{id}`                                 | Update student details   |
| DELETE | `/students/{id}`                                 | Delete a student         |

---

## 📱 Responsive Design

- Uses Tailwind CSS utility classes and custom styles for mobile-first layouts.
- Tables are horizontally scrollable on small screens.
- Forms and buttons adapt to all device sizes.

---

## 🧑‍💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/student_management.git
   cd student_management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Add your Firebase config to `firebase/config.js`.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Visit the app:**
   ```
   http://localhost:3000
   ```

---

## 📝 Example Code Snippets

### Fetch Students
```javascript
useEffect(() => {
  const fetchStudents = async () => {
    const response = await fetch("https://6823110bb342dce800508581.mockapi.io/api/student/students");
    const data = await response.json();
    setStudents(data);
    setOriginalStudents(data);
    setIsLoading(false);
  };
  fetchStudents();
}, []);
```

### Add/Edit Student
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const studentData = Object.fromEntries(formData.entries());
  await fetch("https://6823110bb342dce800508581.mockapi.io/api/student/students", {
    method: "POST", // or "PUT" for edit
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
};
```

---


## 🚦 Future Enhancements

- Pagination for large student lists
- Role-based access (admin/teacher)
- Export data as CSV/PDF
- Real backend integration
- Profile pictures for students

---

