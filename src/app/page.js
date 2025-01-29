"use client"

import {useState} from "react";
import WorkingDays from "./WorkingDays";
import Students from "./Students";

export default function Home() {
  const [submittedForms, setSubmittedForms] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [studentList, setStudentList] = useState([""]);

  return (
    <main className={`main flex justify-center`}>
      {submittedForms === 0 && <WorkingDays submittedForms={submittedForms} setSubmittedForms={setSubmittedForms} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />}
      {submittedForms === 1 && <Students submittedForms={submittedForms} setSubmittedForms={setSubmittedForms} studentList={studentList} setStudentList={setStudentList} />}
    </main>
  );
}
