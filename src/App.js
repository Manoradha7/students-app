import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory, Route, Switch} from "react-router-dom";
import { useState, useEffect } from "react";
import { Welcome } from "./Welcome";
import { StudentsList } from "./StudentsList";
import { AddStudent } from "./AddStudent";
import { StudentDetail } from "./StudentDetail";
import { EditStudent } from "./EditStudent";

export default function App() {
  //manage history using usehistory hook
  const history = useHistory();
 //manage the state change of students using usestate
  const [students, setStudents] = useState({});
  // fetching data from api using useeffect hooks when the function component is mounted
  useEffect(() => {
    fetch("https://616e488fa83a850017caa8e1.mockapi.io/students")
      .then((res) => res.json())
      //chage the state of the student state (or) set the data to store in students
      .then((data) => setStudents(data));
  }, []);
  return (
    <div className="App">
      <AppBar position="static" color="secondary">
        <Toolbar>
          <header className="App-header">
            <p className="App-title" style={{ color: "crimson" }}>
              ZHSS
            </p>
          </header>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/")}
          >
            Home
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/student")}
          >
            Students
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => history.push("/add-student")}
          >
            Add Student
          </Button>
        </Toolbar>
      </AppBar>


      {/* using switch change the paths */}
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/student/edit/:id">
          <EditStudent students={students} setStudents={setStudents} />
        </Route>
        <Route exact path="/student">
          <StudentsList students={students} setStudents={setStudents} />
        </Route>
        <Route path="/add-student">
          <AddStudent students={students} setStudents={setStudents} />
        </Route>
        <Route path="/students/:id">
          <StudentDetail students={students} />
        </Route>
      </Switch>
    </div>
  );
}



