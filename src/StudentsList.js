import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export function StudentsList({ students, setStudents }) {
    const history = useHistory();

    const getStudents = () => {
        fetch(`https://616e488fa83a850017caa8e1.mockapi.io/students`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => setStudents(data));
      };
    
      useEffect(getStudents, [setStudents]);
    
      const deleteStudent = (id) => {
        fetch(`https://616e488fa83a850017caa8e1.mockapi.io/students/${id}`, {
          method: "DELETE",
        }).then(() => getStudents());
      };
  return (
    <div className="students-list ">
      <span className="list-name"> Students Details </span>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ name, emailid, mobileno, dob, address, id }) => (
            <Student
              id={id}
              key={id}
              name={name}
              emailid={emailid}
              mobileno={mobileno}
              dob={dob}
              address={address}
              studentDetail={
                <Button
                  aria-label="more info"
                  onClick={() => history.push("/students/" + id)}
                  color="primary"
                  className="info-button"
                  style={{ marginLeft: "auto" }}
                >
                  view
                </Button>
              }
              deleteButton={
                <IconButton
                  aria-label="delete student"
                  onClick={() => {
                    deleteStudent(id);
                  }}
                  color="secondary"
                  className="delete-button"
                >
                  <DeleteIcon />
                </IconButton>
              }
              editButton={
                <IconButton
                  aria-label="edit student"
                  style={{ marginLeft: "auto" }}
                  color="error"
                  className="edit-button"
                  onClick={() => history.push("/student/edit/" + id)}
                >
                  <EditIcon />
                </IconButton>
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Student({ name, emailid, mobileno, dob, address, id, studentDetail,deleteButton, editButton }) {
  return (
    <tr>
      <td data-label="ID">{id}</td>
      <td data-label="Name">{name}</td>
      <td data-label="Email">{emailid}</td>
      <td data-label="PhoneNo">{mobileno}</td>
      <td data-label="Job">{dob}</td>
      <td data-label="Salary">{address}</td>
      <td>
        <div className="btn">
            {studentDetail}
          {editButton}
            {deleteButton}
        </div>
      </td>
    </tr>
  );
}
