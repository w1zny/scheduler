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
  const [selectedDays, setSelectedDays] = useState([]);
  const [submittedForms, setSubmittedForms] = useState(0);
  const [studentList, setStudentList] = useState([]);

  const [errMsg, setErrMsg] = useState(null);
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

    setErrMsg(null);

    const newErr = checkWorkingDays(workingDays);
    if (newErr) {
      setErrMsg(newErr);
      return;
    }

    const studentErr = checkStudentsData(workingDays, studentsData);
    if (studentErr) {
      setErrMsg(studentErr);
      return;
    }

    const tmpResult = await processData(workingDays, studentsData);
    handleGoForward();
    setResult(tmpResult.result);
    setErrMsg(tmpResult.error);
  }

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
        {result && <Table result={result}
                          handleGoBack={handleGoBack}
                          handleGoForward={handleGoForward} />}
        {errMsg && <p className={`p-2 m-2 text-customOrange-light text-lg italic`}>{errMsg}</p>}
      </form>
    </main>
  );
}
