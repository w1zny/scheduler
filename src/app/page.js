"use client"

import {useEffect, useState} from "react";
import WorkingDays from "./WorkingDays";
import DailyTimeSlots from "./DailyTimeSlots";
import Students from "./Students";
import StudentsLessons from "./StudentsLessons";
import Availability from "./Availability";
import Table from "./Table";

import {checkStudentsData, checkWorkingDays} from "@/checks";
import {processData} from "@/actions";

export default function Home() {
  const [selectedDays, setSelectedDays] = useState(["Monday"]);
  const [submittedForms, setSubmittedForms] = useState(0);
  const [studentList, setStudentList] = useState(["Jakub", "Lukas", "Vladko"]);

  const [err, setErr] = useState(null);
  const [result, setResult] = useState(null);

  // exports
  const [workingDays, setWorkingDays] = useState({});
  const [studentsData, setStudentsData] = useState([]);

  const handleGoBack = () => {
    if (submittedForms === 5)
      setResult(null);
    setSubmittedForms(submittedForms - 1);
  };

  const handleGoForward = () => {
    setSubmittedForms(submittedForms + 1);
  };

  // data sending
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErr(null);

    const daysErr = checkWorkingDays(workingDays);
    if (daysErr) {
      setErr(daysErr);
      return;
    }

    console.log(daysErr);

    const studentErr = checkStudentsData(workingDays, studentsData);
    if (studentErr) {
      setErr(studentErr);
      return;
    }

    const tmpResult = await processData(workingDays, studentsData);
    handleGoForward();
    setResult(tmpResult.result);
    setErr(tmpResult.error);
  }

  useEffect(() => {
    if (!err) return;
    setSubmittedForms(err.page);
  }, [err]);

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
    <main className={`main flex flex-col items-center justify-center`}>
      <p className={`p-2 m-4 text-customOrange-light text-lg italic transition-opacity duration-300 ${err ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {(err) ? err.msg : "error placeholder"}
      </p>
      <form onSubmit={handleSubmit} className={`m-9 mt-0 w-full flex flex-col items-center justify-center`}>
        {submittedForms === 0 && <WorkingDays workingDays={workingDays}
                                              setWorkingDays={setWorkingDays}
                                              selectedDays={selectedDays}
                                              setSelectedDays={setSelectedDays}
                                              handleGoForward={handleGoForward}/>}
        {submittedForms === 1 && <DailyTimeSlots workingDays={workingDays}
                                                 setWorkingDays={setWorkingDays}
                                                 handleGoBack={handleGoBack}
                                                 handleGoForward={handleGoForward}/>}
        {submittedForms === 2 && <Students studentList={studentList}
                                           setStudentList={setStudentList}
                                           handleGoBack={handleGoBack}
                                           handleGoForward={handleGoForward}/>}
        {submittedForms === 3 && <StudentsLessons studentsData={studentsData}
                                                  setStudentsData={setStudentsData}
                                                  handleGoBack={handleGoBack}
                                                  handleGoForward={handleGoForward}/>}
        {submittedForms === 4 && <Availability studentsData={studentsData}
                                               setStudentsData={setStudentsData}
                                               workingDays={workingDays}
                                               handleGoBack={handleGoBack}
                                               handleSubmit={handleSubmit}/>}
        {result && <Table result={result}
                          handleGoBack={handleGoBack}
                          handleGoForward={handleGoForward}/>}
      </form>
    </main>
  );
}
