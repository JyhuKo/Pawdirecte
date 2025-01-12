import { decodeGradeValue } from "~/decoders/grade-value";
import { decodeSkill } from "~/decoders/skill";
import type { Grade } from "~/models";

export const decodeGrade = (item: any): Grade => {
  return {
    id: item.id, 
    comment: item.devoir,
    average: decodeGradeValue(item.moyenneClasse),
    isOptional: item.valeurisee,
    skills: item.elementsProgramme.map(decodeSkill),
    coefficient: Number(item.coef),
    date: new Date(item.date),
    dateRecorded: item.dateSaisie ? new Date(item.dateSaisie) : undefined,
    examType: item.typeDevoir,
    max: decodeGradeValue(item.maxClasse),
    min: decodeGradeValue(item.minClasse),
    outOf: Number(item.noteSur.replaceAll(",", ".")),
    period: {
      id: item.codePeriode,
      name: "" 
    },
    subject: {
      id: item.codeMatiere,
      subSubjectId: item.codeSousMatiere,
      name: item.libelleMatiere
    },
    subjectFilePath: item.uncSujet,
    correctionFilePath: item.uncCorrige,
    value: decodeGradeValue(item.valeur),
    remarks: item.commentaire, 
    isSignificant: !item.nonSignificatif, 
    inLetters: item.enLettre 
  };
};

