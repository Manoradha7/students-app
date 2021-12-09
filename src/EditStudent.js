import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as Yup from "yup";

//validating forms using yup
const formValidationSchema = Yup.object({
  // if id is number it's ok otherwise no and the feild requires a value
  id: Yup.number()
  .required("This field is required"),
  // if name is string it's ok otherwise no and the feild requires a value
  name: Yup.string()
  .required("This field is required"),
  //if the emailid is string and matches the format it's ok otherwise no and the feild requires a value
  emailid: Yup.string()
  .email()
  .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Pattern not matched")
  .required("This field is required"),
  //if the mobileno is number and the number has minimum eight number and must be an integerit's ok otherwise no and the feild requires a value
  mobileno:  Yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(8)
  .required('A phone number is required'),
  //if the date is in number and in name format it's ok otherwise no and the feild requires a value
  dob: Yup.date()
  .required("This field is required"),
  // if address is string it's ok otherwise no and the feild requires a value
  address:  Yup.string()
  .required("This field is required")
})

export function EditStudent() {
  //get id from the url using useparam hooks
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  
//fetching required user data from the api when the dependency is mounted
  useEffect(() => {
    fetch(`https://616e488fa83a850017caa8e1.mockapi.io/students/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setStudent(data));
  }, [id]);
//if student data is their then mount the updatedata component othrwise no
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
    // call validation the form 
    validationSchema:formValidationSchema,
    // if their is no error in the formvalidation then only submit the form
    onSubmit:(updatedStudent)=>{
        editStudent(updatedStudent)
    }
  });

  const history = useHistory();
  // edit the detail of the student
  const editStudent = (updatedStudent) => {
   
    console.log(updatedStudent);

    // updating the updateddata in the api
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
{ errors.id&& touched.id&&errors.id}
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
          {errors.name&& touched.name&&errors.name}
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
          {errors.emailid&& touched.emailid&&errors.emailid}
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
          {errors.mobileno&& touched.mobileno&&errors.mobileno}
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
          {errors.dob&& touched.dob&&errors.dob}
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
          {errors.address&& touched.address&&errors.address}
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
