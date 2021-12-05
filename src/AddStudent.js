import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

const formValidationSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required("name required"),
  emailid: Yup.string()
    .email()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Pattern not matched")
    .required(),
  mobileno: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
  dob: Yup.string()
    // .date()
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
      "Pattern not matched"
    )
    .required("Date of Birth is required"),
  address: Yup.string().required(),
});
export function AddStudent({ students, setStudents }) {
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
      validationSchema: formValidationSchema,
      onSubmit: (newStudent) => {
        addStudent(newStudent);
      },
    });

  const history = useHistory();

  const addStudent = (newStudent) => {
    console.log(newStudent);

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
          error={errors.id && touched.id}
          label="Enter student Id"
          variant="standard"
        />
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
        <TextField
          value={values.dob}
          id="dob"
          name="dob"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.dob && touched.dob}
          label="Enter student DOB"
          variant="standard"
        />
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
        <Button type="submit" variant="contained" color="primary">
          Add student
        </Button>
      </form>
    </div>
  );
}
