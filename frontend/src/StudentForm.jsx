import React, { useState } from "react";
import './StudentForm.css'
import { useEffect } from "react";
export default function StudentForm({ editingStudent, onSave, onCancel }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('Computer Science')
    const [grade, setGrade] = useState('A');
  const [error, setError] = useState()
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setGrade(editingStudent.grade);
    } else {
      setName("");
      setEmail("");
      setCourse("Computer Science");
      setGrade("A");
    }
    setError("");
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please provide both name and email.");
      return;
    }

    onSave({ name, email, course, grade });
  };
    return (
      <>
        <div className="form-card">
          <h2 className="form-heading">
            {editingStudent ? "Edit Profile" : "Add new Student"}
          </h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label htmlFor="student-name">Full Name</label>
              <input
                id="student-name"
                type="text"
                placeholder="sandhya khade"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="student-email">Enter Email</label>
              <input
                id="student-email"
                type="email"
                placeholder="sandhya khade"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="student-course">Course</label>
                <select
                  id="student-course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Tech">Information Tect</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
              <div className="form-group flex-1">
                <label htmlFor="student-grade">Grade</label>
                <select
                  id="student-grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="A">Grade A</option>
                  <option value="B">Grade B</option>
                  <option value="C">Grade C</option>
                  <option value="D">Grade D</option>
                </select>
              </div>
            </div>
            {error && <p className="form-error-msg">{error}</p>}

            <div className="form-actions-group">
              <button type="submit" className="btn-primary">
                {editingStudent ? "Update Profile" : "Add Student"}
              </button>

              {editingStudent && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </>
    );
    
}