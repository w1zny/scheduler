"use client"

import {useState} from "react";
import WorkingDays from "./WorkingDays";
import Students from "./Students";

export default function Home() {
  const [submittedForms, setSubmittedForms] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [studentList, setStudentList] = useState(["Jakub Vizner", "Lukas Vizner", "Vladimir Vizner", "Viktoria Majorosova"]);

  const handleGoBack = () => {
    setSubmittedForms(submittedForms - 1);
  }

  const handleGoForward = () => {
    setSubmittedForms(submittedForms + 1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <main className={`main flex justify-center`}>
      <form onSubmit={handleSubmit} className={`w-full flex justify-center`}>
        {submittedForms === 0 && <WorkingDays selectedDays={selectedDays}
                                              setSelectedDays={setSelectedDays}
                                              handleGoForward={handleGoForward} />}
        {submittedForms === 1 && <Students studentList={studentList}
                                           setStudentList={setStudentList}
                                           handleGoBack={handleGoBack}
                                           handleGoForward={handleGoForward} />}
        <button type="submit"></button>
      </form>
    </main>
  );
}
