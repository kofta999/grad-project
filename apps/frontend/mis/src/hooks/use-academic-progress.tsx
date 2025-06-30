import { apiClient } from "@/lib/client";
import React, { useEffect, useState } from "react";

type AcademicYear = {
  academicYearId: number;
  year: string;
};

type Course = {
  courseId: number;
  code: string;
  title: string;
  prerequisite: number;
  totalHours: number;
  grade: string;
  courseRegistrationId: number;
};

type SemesterCourses = {
  academicYearId: number;
  semester: string;
  courses: Course[];
};

export default function useAcademicProgress() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [currentAcademicYear, setCurrentAcademicYear] = useState<AcademicYear | null>(null);

  const [semester] = useState(["first", "second", "third"]);

  const [semesterCourses, setSemesterCourses] = useState<SemesterCourses[]>([]);
  const [incompleteSemester, setIncompleteSemester] = useState<SemesterCourses | null>(null);

  const [loading, setLoading] = useState(false);

  const getAcademicYears = async () => {
    try {
      setLoading(true);
      const res = await apiClient.students.me.courses["registered-academic-years"].$get();
      if (res.status === 200) {
        const data = await res.json();
        setAcademicYears(data);
        setCurrentAcademicYear(data[data.length - 1]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = async () => {
    try {
      setLoading(true);
      const newSemesterCourses: SemesterCourses[] = [];

      for (const academicYear of academicYears) {
        for (const sem of semester) {
          const res = await apiClient.students.me.courses.$get({
            query: {
              academicYearId: academicYear.academicYearId.toString(),
              semester: sem,
            },
          });

          if (res.status === 200) {
            const data = await res.json();

            const incompleteCourses = data.filter((course) => !course.grade);

            if (incompleteCourses.length > 0) {
              setIncompleteSemester({
                academicYearId: academicYear.academicYearId,
                semester: sem,
                courses: data as Course[],
              });
            }

            newSemesterCourses.push({
              academicYearId: academicYear.academicYearId,
              semester: sem,
              courses: data as Course[],
            });
          }
        }
      }
      setLoading(false);
      setSemesterCourses(newSemesterCourses);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getAcademicYears();
  }, []);

  useEffect(() => {
    if (academicYears.length > 0) {
      getProgress();
    }
  }, [academicYears]);

  return {
    academicYears,
    currentAcademicYear,
    semesterCourses,
    incompleteSemester,
    loading,
  };
}
