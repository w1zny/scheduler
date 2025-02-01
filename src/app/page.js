"use client"

import {useEffect, useState} from "react";
import WorkingDays from "./WorkingDays";
import DailyTimeSlots from "./DailyTimeSlots";
import Students from "./Students";
import StudentsLessons from "./StudentsLessons";
import Availability from "./Availability";


export default function Home() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [submittedForms, setSubmittedForms] = useState(0);
  const [studentList, setStudentList] = useState([]);

  const [errMsg, setErrMsg] = useState(null);

  // exports
  const [workingDays, setWorkingDays] = useState({});
  const [studentsData, setStudentsData] = useState([]);

  const handleGoBack = () => {
    setSubmittedForms(submittedForms - 1);
  };

  const handleGoForward = () => {
    setSubmittedForms(submittedForms + 1);
  };

  const parseTime = (timeString) => {
    return new Date("2025-02-01T" + timeString + "Z").getTime();
  }

  // pre posting checks
  const checkWorkingDays = () => {
    if (Object.keys(workingDays).length === 0) {
      setErrMsg("You didn't select any day as your working day!");
      return false;
    }

    Object.values(workingDays).forEach((value) => {
      const timeSlot = value.trim().split(" ").join("");

      if (timeSlot.length !== 11) {
        setErrMsg("The time span of your working days is incorrect!");
        return false;
      }

      const startTime = parseTime(timeSlot.slice(0, 5));
      const endTime = parseTime(timeSlot.slice(6));

      if (isNaN(startTime) || isNaN(endTime) || startTime > endTime) {
        setErrMsg("The time span of your working days is incorrect!");
        return false;
      }

    });
    return true;
  };

  const checkStudentsData = () => {
    if (Object.keys(studentsData).length === 0) {
      setErrMsg("There are no students listed!");
      return false;
    }

    studentsData.forEach((student) => {
      // lessons check
      const lessons = student.lessons.trim().split(" ").join("").split(",");

      if (lessons.length === 0) {
        setErrMsg(student.name + "'s lesson lengths are invalid");
        return false;
      }

      lessons.forEach((lesson) => {
        if (isNaN(parseInt(lesson))) {
          setErrMsg(student.name + "'s lesson lengths are invalid");
          return false;
        }
      });

      // time slot check
      Object.keys(student.days).forEach((day) => {
        let prevEndTime = parseTime("00:00");

        student.days[day].forEach((timeSlot) => {
          const startTime = parseTime(timeSlot.slice(0, 5));
          const endTime = parseTime(timeSlot.slice(6));

          if (isNaN(startTime) || isNaN(endTime) || startTime > endTime) {
            setErrMsg(student.name + "'s time slot for " + day + " is incorrect!");
            return false;
          }

          if (prevEndTime > startTime) {
            setErrMsg(student.name + "'s time slots for " + day + " are in incorrect order!");
            return false;
          }

          prevEndTime = endTime;
        });
      });
    });

    return true;
  };

  // data sending
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMsg(null);
    if (!checkWorkingDays() || !checkStudentsData())
      return;

    try {
      const response = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({workingDays, studentsData}),
      });

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    setWorkingDays(
      selectedDays.reduce((acc, day) => {
        acc[day] = "";
        return acc;
      }, {})
    );
  }, [selectedDays]);

  useEffect(() => {
    setStudentsData(
      studentList.map((student) => ({
        name: student,
        lessons: "",
        days: {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
        },
      }))
    );
  }, [studentList]);

  return (
    <main className={`main flex justify-center`}>
      <form onSubmit={handleSubmit} className={`w-full flex flex-col items-center justify-center`}>
        {submittedForms === 0 && <WorkingDays workingDays={workingDays}
                                              setWorkingDays={setWorkingDays}
                                              selectedDays={selectedDays}
                                              setSelectedDays={setSelectedDays}
                                              handleGoForward={handleGoForward} />}
        {submittedForms === 1 && <DailyTimeSlots workingDays={workingDays}
                                                 setWorkingDays={setWorkingDays}
                                                 handleGoBack={handleGoBack}
                                                 handleGoForward={handleGoForward} />}
        {submittedForms === 2 && <Students studentList={studentList}
                                           setStudentList={setStudentList}
                                           handleGoBack={handleGoBack}
                                           handleGoForward={handleGoForward} />}
        {submittedForms === 3 && <StudentsLessons studentsData={studentsData}
                                                  setStudentsData={setStudentsData}
                                                  handleGoBack={handleGoBack}
                                                  handleGoForward={handleGoForward} />}
        {submittedForms === 4 && <Availability studentsData={studentsData}
                                               setStudentsData={setStudentsData}
                                               workingDays={workingDays}
                                               handleGoBack={handleGoBack}
                                               handleSubmit={handleSubmit}/>}
        {errMsg && <p className={`p-2 m-2 text-customOrange-light text-lg italic`}>{errMsg}</p>}
      </form>
    </main>
  );
}
