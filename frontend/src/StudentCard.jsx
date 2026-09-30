import React from "react";
import './StudentCard.css';
function StudentCard({student,onEdit,onDelete}) {
    return (
      <>
        <div className="student-card">
          <div className="card-header">
            <div>
              <h3 className="student-name">{student.name}</h3>
              <p className="student-email">{student.email}</p>
            </div>
            <span className={`grade-tag grade-${student.grade.toLowerCase()}`}>
              Grade :{student.grade}
            </span>
          </div>
          <div className="card-body">
            <p className="course-text">
              <strong>Course:</strong>
              {student.course}
            </p>
          </div>
          <div className="card-actions">
            <button className="btn-action edit" onClick={() => onEdit(student)}>
              Edit
            </button>
            <button
              className="btn-action delete"
              onClick={() => onDelete(student.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
}
export default StudentCard