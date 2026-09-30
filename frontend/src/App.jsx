import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [notification, setNotification] = useState("");

  const API_URL = "http://localhost:5000/api/students";
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Failed to load students:", err));
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSave = async (studentData) => {
    if (editingStudent) {
      // UPDATE (PUT)
      try {
        const res = await fetch(`${API_URL}/${editingStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        const updated = await res.json();

        setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
        setEditingStudent(null);
        showNotification("Student updated successfully!");
      } catch (err) {
        console.error("Update failed:", err);
      }
    } else {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
        const created = await res.json();

        setStudents([created, ...students]);
        showNotification("Student added successfully!");
      } catch (err) {
        console.error("Create failed:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStudents(students.filter((s) => s.id !== id));
        if (editingStudent && editingStudent.id === id) {
          setEditingStudent(null);
        }
        showNotification("Student removed.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Student Profile Management</h1>
        <p>Fullstack app with Express API, React useState, and standard CSS</p>
      </header>

      {notification && <div className="toast-notification">{notification}</div>}

      <main className="dashboard-grid">
        <section className="form-column">
          <StudentForm
            editingStudent={editingStudent}
            onSave={handleSave}
            onCancel={() => setEditingStudent(null)}
          />
        </section>

        <section className="list-column">
          <StudentList
            students={students}
            onEdit={(student) => setEditingStudent(student)}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}
