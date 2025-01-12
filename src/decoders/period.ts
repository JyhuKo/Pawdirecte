import type { Period } from "~/models";

export const decodePeriod = (item: any): Period => {
  return {
    id: item.idPeriode,
    name: item.periode,
    startDate: new Date(item.dateDebut),
    endDate: new Date(item.dateFin),
    isEnded: item.cloture,
    councilDate: new Date(item.dateConseil),
    councilClassroom: item.salleConseil,
    councilStartHour: item.heureConseil,
    councilEndHour: item.heureFinConseil,
    isMockExam: item.examenBlanc,
    yearly: item.annuel,
    ensembleSubjects: {
      calculationDate: item.ensembleMatieres.dateCalcul,
      overallAverage: item.ensembleMatieres.moyenneGenerale,
      classAverage: item.ensembleMatieres.moyenneClasse,
      minAverage: item.ensembleMatieres.moyenneMin,
      maxAverage: item.ensembleMatieres.moyenneMax,
      classRepresentativeName: item.ensembleMatieres.nomPP,
      classRepresentativeAppreciation: item.ensembleMatieres.appreciationPP,
      classSupervisorName: item.ensembleMatieres.nomCE,
      classSupervisorAppreciation: item.ensembleMatieres.appreciationCE,
      supervisorAppreciation: item.ensembleMatieres.appreciationVS,
      councilDecision: item.ensembleMatieres.decisionDuConseil,
      rank: item.ensembleMatieres.rang,
      classStrength: item.ensembleMatieres.effectif,
      overallClassAppreciation: item.ensembleMatieres.appreciationGeneraleClasse,
      subjects: item.ensembleMatieres.disciplines,
      simulatedSubjects: item.ensembleMatieres.disciplinesSimulation
    }
  };
};
