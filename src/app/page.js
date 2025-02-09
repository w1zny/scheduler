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
    setSubmittedForms((prev) => Math.max(prev - 1, 0));
  };

  const handleGoForward = () => {
    setErr(null);
    setSubmittedForms((prev) => Math.min(prev + 1, 5));
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
      {(isLoading) ? (<LoadingWheel />) : (
        <div className="relative w-full overflow-hidden flex justify-center">
          {(result) ? (<Table result={result} handleGoBack={handleGoBack}/>) : (<div
            className="w-full flex items-start transition-transform duration-300 ease-in-out"
            style={{transform: `translateX(-${submittedForms * 100}%)`}}
          >
            <div className="mb-5 w-full flex-shrink-0 flex justify-center">
              <WorkingDays workingDays={workingDays}
                           setWorkingDays={setWorkingDays}
                           selectedDays={selectedDays}
                           setSelectedDays={setSelectedDays}
                           handleGoForward={handleGoForward}/>
            </div>
            <div className="mb-5 w-full flex-shrink-0 flex justify-center">
              <DailyTimeSlots workingDays={workingDays}
                              setWorkingDays={setWorkingDays}
                              handleGoBack={handleGoBack}
                              handleGoForward={handleGoForward}/>
            </div>
            <div className="mb-5 w-full flex-shrink-0 flex justify-center">
              <Students studentList={studentList}
                        setStudentList={setStudentList}
                        handleGoBack={handleGoBack}
                        handleGoForward={handleGoForward}/>
            </div>
            <div className="mb-5 w-full flex-shrink-0 flex justify-center">
              <StudentsLessons studentsData={studentsData}
                               setStudentsData={setStudentsData}
                               handleGoBack={handleGoBack}
                               handleGoForward={handleGoForward}/>
            </div>
            <div className="mb-5 w-full flex-shrink-0 flex justify-center">
              <Availability studentsData={studentsData}
                            setStudentsData={setStudentsData}
                            workingDays={workingDays}
                            handleGoBack={handleGoBack}
                            handleGoForward={handleGoForward}/>
            </div>
            <div className="mb-5 w-full flex-shrink-0 flex justify-center">
              <GetBestSchedule getBestSchedule={getBestSchedule}
                               setGetBestSchedule={setGetBestSchedule}
                               handleGoBack={handleGoBack}
                               handleSubmit={handleSubmit}/>
            </div>
          </div>)}
        </div>
      )}
    </div>
  );
}
