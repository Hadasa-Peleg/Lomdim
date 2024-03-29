import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LessonTable from "./lessonTeble";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import PageTeacher from "./pageTeacher";
import { setDate } from "date-fns";

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    teacherDetails: state.teacher.teacherDetails,
  };
}

function AccountTeacher(props) {
  const [flag, setFlag] = useState(false);
  const navigation = useNavigate();
  const currentUser = useSelector((state) => state);
  //console.log(("currentUser", currentUser));
  // const [user,setUser]=useState(JSON.parse(localStorage.getItem("user")))

  const [tabKey, initTabKey] = useState("one");
  //get current user
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  //logout
  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigation("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //debugger;
        const { data } = await axios.post(
          `http://localhost:8000/teacherData/findDataById`,
          {
            userId: user._id,
          }
        );
        console.log("לבדוק את הdata");
        console.log(data);
        if (data) {
          localStorage.setItem("teacherData", JSON.stringify(data));
          setFlag(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user._id]);

  const deleteFromAccount = async () => {
    axios
      .delete(`http://localhost:8000/user/deleteUserById/`, { id: user.id })
      .then((response) => {
        console.log("הבקשה DELETE הושלמה בהצלחה");
        console.log("תשובה מהשרת:", response.data);
      })
      .catch((error) => {
        console.error("שגיאה בבצע בקשת DELETE:", error);
      });
  };

  return (
    <>
      <div className="wrapper-pupil">
        <br />
        <div className="row justify-content-between">
          <div className="col">
            <h2> שלום, {user.userName}</h2>
          </div>
          <div className="col-md-auto">
            <button
              type="button"
              class="btn btn-outline-primary btn"
              onClick={() => navigation("/update_teacher")}
            >
              עדכון פרטים
            </button>
          </div>
          <div className="col-lg-2">
            <button
              type="button"
              class="btn btn-outline-danger btn"
              onClick={handleLogout}
            >
              התנתק
            </button>
          </div>
        </div>
        <br />
        <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
          <Tab eventKey="one" title="העמוד שלי">
            {flag && <PageTeacher />}{" "}
          </Tab>
          <Tab eventKey="two" title="הפניות שלי">
            <LessonTable />
          </Tab>
          <Tab eventKey="three" title="מחיקת חשבון">
            <p>האם אתה בטוח שברצונך לבטל את חשבונך באתר?</p>
            <button
              className="btn btn-primary btn-rounded"
              onClick={deleteFromAccount}
            >
              מחק את חשבוני
            </button>
          </Tab>
        </Tabs>
      </div>
      <br />
    </>
  );
}

export default connect(mapStateToProps)(AccountTeacher);
