import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as Yup from "yup";

const formValidationSchema = Yup.object({
  id: Yup.number()
  .required("This field is required"),
  name: Yup.string()
  .required("This field is required"),
  emailid: Yup.string()
  .email()
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Pattern not matched")
  .required("This field is required"),
  mobileno:  Yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(8)
  .required('A phone number is required'),
  dob: Yup.number()
  .required("This field is required"),
  address:  Yup.string()
  .required("This field is required")
})

export function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  

  useEffect(() => {
    fetch(`https://616e488fa83a850017caa8e1.mockapi.io/students/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setStudent(data));
  }, [id]);

  return student ? <UpdateStudent student={student} /> : "";
}
function UpdateStudent({ student }) {
  const {handleBlur,handleSubmit,values,handleChange,errors,touched} = useFormik({
    initialValues: {
      id: student.id,
      name: student.name,
      emailid: student.emailid,
      mobileno:student.mobileno,
      dob:student.dob,
      address:student.address,
    },
    validationSchema:formValidationSchema,
    onSubmit:(updatedStudent)=>{
        editStudent(updatedStudent)
    }
  });

  const history = useHistory();
  const editStudent = (updatedStudent) => {
   
    console.log(updatedStudent);


    fetch(`https://616e488fa83a850017caa8e1.mockapi.io/students/${student.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedStudent),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => history.push("/student"));
  };
  return (
    <div className="add-student">
      <span className="text-title">Edit Student </span>
      <form className="student-form" onSubmit={handleSubmit}>
        <TextField
          value={values.id}
          id="id"
          name="id"
          onChange={handleChange}
          onBlur={handleBlur}
          error ={errors.id&&touched.id}
          label="Enter Student Id"
          variant="standard"
          required
          />
        <TextField
          value={values.name}
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          error ={errors.name&&touched.name}
          label="Enter Student Name"
          variant="standard" 
          required
          />
        <TextField
           value={values.emailid}
           id="emailid"
          name="emailid"
          onChange={handleChange}
          onBlur={handleBlur}
          error ={errors.emailid&&touched.emailid}
          label="Enter Student Email"
          variant="standard"
          required
          />
        <TextField
          value={values.mobileno}
          id="mobileno"
          name="mobileno"
          onChange={handleChange}
          onBlur={handleBlur}
          error ={errors.mobileno&&touched.mobileno}
          label="Enter Student Mobileno Number"
          variant="standard"
          required
          />
        <TextField
          value={values.dob}
          id="dob"
          name="dob"
          onChange={handleChange}
          onBlur={handleBlur}
          error ={errors.dob&&touched.dob}
          label="Enter Student dob"
          variant="standard"
          required
          />
        <TextField
          value={values.address}
          id="address"
          name="address"
          onChange={handleChange}
          onBlur={handleBlur}
          error ={errors.address&&touched.address}
          label="Enter Student address"
          variant="standard"
          required
          />
        <Button
          type="submit"
          variant="contained"
          color="success"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
