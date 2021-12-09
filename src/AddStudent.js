import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
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
});

export function AddStudent({ students, setStudents }) {
  //using formik handle the changes of the form
  const { handleBlur, handleSubmit, values, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        id: "",
        name: "",
        emailid: "",
        mobileno: "",
        dob: "",
        address: "",
      },
      // calling the validation portion
      validationSchema: formValidationSchema,
      //When the there is no then only submit the form
      onSubmit: (newStudent) => {
        addStudent(newStudent);
      },
    });

  const history = useHistory();
//adding new student
  const addStudent = (newStudent) => {
    console.log(newStudent);
    // adding new student data using POST method  in the api 
    fetch(`https://616e488fa83a850017caa8e1.mockapi.io/students`, {
      method: "POST",
      body: JSON.stringify(newStudent),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/student"));
  };
  return (
    <div className="add-student">
      <span className="text-title">New student </span>
      <form className="student-form" onSubmit={handleSubmit}>
        <TextField
          value={values.id}
          id="id"
          name="id"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.id&& touched.id&&errors.id}
          label="Enter student Id"
          variant="standard"
        />
        { errors.id&& touched.id&&errors.id}
        <TextField
          value={values.name}
          id="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name && touched.name}
          label="Enter student Name"
          variant="standard"
        />
        {errors.name&& touched.name&&errors.name}
        <TextField
          value={values.emailid}
          id="emailid"
          name="emailid"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.emailid && touched.emailid}
          label="Enter student EmailId"
          variant="standard"
        />
        {errors.emailid&& touched.emailid&&errors.emailid}
        <TextField
          value={values.mobileno}
          id="mobileno"
          name="mobileno"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.mobileno && touched.mobileno}
          label="Enter student Phone Number"
          variant="standard"
        />
        {errors.mobileno&& touched.mobileno&&errors.mobileno}
        <TextField
          value={values.dob}
          id="dob"
          name="dob"
          type="date"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.dob && touched.dob}
          variant="standard"
        />
        {errors.dob&& touched.dob&&errors.dob}
        <TextField
          value={values.address}
          id="address"
          name="address"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address && touched.address}
          label="Enter student Address"
          variant="standard"
        />
        {errors.address&& touched.address&&errors.address}
        <Button type="submit" variant="contained" color="primary">
          Add student
        </Button>
      </form>
    </div>
  );
}
