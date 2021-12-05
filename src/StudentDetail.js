import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function StudentDetail() {
  const { id } = useParams("");

  const [student, setStudent] = useState({});
  useEffect(() => {
    fetch(`https://616e488fa83a850017caa8e1.mockapi.io/students/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, [id]);
  return (
    <div className="stu-card">
      <div className="stu-detail">
        <p className="stu-id">ID :{student.id}</p>
        <p className="stu-name">Names :{student.name}</p>
        <p className="stu-email">Email:{student.emailid}</p>
        <p className="stu-phone">Mobile No :{student.mobileno}</p>
        <p className="stu-role"> DOB : {student.dob}</p>
        <p className="stu=salary">Address : {student.address}</p>
      </div>
    </div>
  );
}
