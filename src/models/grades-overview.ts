import type { GradeValue } from "./grade-value";

export type SubjectOverview = {
  classAverage: GradeValue;
  overallAverage: GradeValue;
  subjects: {
    name: string;
    id: string;
    childSubjectId: string;
    isChildSubject: boolean;
    color: string;
    coefficient: number;
    classAverage: GradeValue;
    maxAverage: GradeValue;
    minAverage: GradeValue;
    studentAverage: GradeValue;
    outOf: GradeValue;
    classSize?: number; // effectif
    rank?: number; //rang
    teachers?: { id: number; name: string }[]; // profs
    comments?: string; // appreciations
  }[];
};


export type GradesOverview = {
  [key: string]: SubjectOverview;
};
