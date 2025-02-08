"use client"

import {useEffect, useState} from "react";
import WorkingDays from "./WorkingDays";
import DailyTimeSlots from "./DailyTimeSlots";
import Students from "./Students";
import StudentsLessons from "./StudentsLessons";
import Availability from "./Availability";
import Table from "./Table";
import LoadingWheel from "./LoadingWheel";
import GetBestSchedule from "./GetBestSchedule";

import {checkStudentsData, checkWorkingDays} from "@/checks";
import {processData} from "@/actions";

export default function Home() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [submittedForms, setSubmittedForms] = useState(0);
  const [studentList, setStudentList] = useState([]);

  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // exports
  const [workingDays, setWorkingDays] = useState({});
  const [studentsData, setStudentsData] = useState([]);
  const [getBestSchedule, setGetBestSchedule] = useState(false);

  const handleGoBack = () => {
    setErr(null);
    if (submittedForms === null) {
      setResult(null);
      setSubmittedForms(5);
      return;
    }
    setSubmittedForms(submittedForms - 1);
  };

  const handleGoForward = () => {
    setErr(null);
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

    const studentErr = checkStudentsData(workingDays, studentsData);
    if (studentErr) {
      setErr(studentErr);
      return;
    }

    setIsLoading(true);
    const tmpResult = await processData(workingDays, studentsData, getBestSchedule);

    setResult(tmpResult.result);
    setErr(tmpResult.error);
    setSubmittedForms(null);
    setIsLoading(false);
  }

  useEffect(() => {
    if (err && err.page !== undefined) {
      setSubmittedForms(err.page);
    }
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
    setStudentsData((prevData) => {
      const existingDataMap = new Map(prevData.map((student) => [student.name, student]));

      return studentList.map((student) => {
        return (
          existingDataMap.get(student) || {
            name: student,
            lessons: "",
            days: {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
            },
          }
        );
      });
    });
  }, [studentList]);

  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className={`p-2 m-4 text-customOrange-light text-lg italic transition-opacity duration-300 ${err ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {(err) ? err.msg : "error placeholder"}
      </p>
      {(isLoading) ? (<LoadingWheel />) : (<form onSubmit={handleSubmit} className={`m-9 mb-20 mt-0 w-full flex flex-col items-center justify-center`}>
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
                                                 handleGoForward={handleGoForward}/>}
          {submittedForms === 5 && <GetBestSchedule getBestSchedule={getBestSchedule}
                                                    setGetBestSchedule={setGetBestSchedule}
                                                    handleGoBack={handleGoBack}
                                                    handleSubmit={handleSubmit}/>}
          {result && <Table result={result}
                            handleGoBack={handleGoBack}/>}
        </form>)}
    </div>
  );
}
