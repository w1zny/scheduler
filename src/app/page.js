"use client"

import {useState, useEffect} from "react";
import WorkingDays from "./WorkingDays";
import Students from "./Students";
import Availability from "./Availability";

export default function Home() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [submittedForms, setSubmittedForms] = useState(0);
  const [studentList, setStudentList] = useState([]);

  // exports
  const [workingDays, setWorkingDays] = useState({});
  const [studentsData, setStudentsData] = useState([]);

  const handleGoBack = () => {
    setSubmittedForms(submittedForms - 1);
  };

  const handleGoForward = () => {
    setSubmittedForms(submittedForms + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  useEffect(() => {
    setWorkingDays(
      selectedDays.reduce((acc, day) => {
        acc[day] = "";
        return acc;
      }, {})
    );
  }, [selectedDays, setWorkingDays]);

  useEffect(() => {
    setStudentsData(
      studentList.map((student) => ({
        name: student,
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
      <form onSubmit={handleSubmit} className={`w-full flex justify-center`}>
        {submittedForms === 0 && <WorkingDays workingDays={workingDays}
                                              setWorkingDays={setWorkingDays}
                                              selectedDays={selectedDays}
                                              setSelectedDays={setSelectedDays}
                                              handleGoForward={handleGoForward} />}
        {submittedForms === 1 && <Students studentList={studentList}
                                           setStudentList={setStudentList}
                                           handleGoBack={handleGoBack}
                                           handleGoForward={handleGoForward} />}
        {submittedForms === 2 && <Availability studentsData={studentsData}
                                               setStudentsData={setStudentsData}
                                               workingDays={workingDays}
                                               handleGoBack={handleGoBack}
                                               handleGoForward={handleGoForward}/>}
      </form>
    </main>
  );
}
