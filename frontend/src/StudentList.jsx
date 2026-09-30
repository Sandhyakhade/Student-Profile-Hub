import React from "react";
import StudentCard from "./StudentCard";
import "./StudentList.css";

export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="list-wrapper">
      <h2 className="list-title">All Students ({students.length})</h2>

      {students.length === 0 ? (
        <div className="empty-box">
          <p>No students enrolled yet. Add one using the form!</p>
        </div>
      ) : (
        <div className="card-stack">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
