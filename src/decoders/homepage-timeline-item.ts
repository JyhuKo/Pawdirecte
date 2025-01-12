import { decode } from "js-base64";
import type { HomepageTimelineItem } from "~/models";
import { decodeFrenchDate } from "./dates";

export const decodeHomepageTimelineItem = (item: any): HomepageTimelineItem => {
  return {
    id: item.id,
    content: decode(item.contenu),
    authorName: item.auteur.nom,
    authorId: item.auteur.id,
    authorFirstName: item.auteur.prenom,
    authorTitle: item.auteur.civilite,
    creationDate: decodeFrenchDate(item.dateCreation),
    startDate: decodeFrenchDate(item.dateDebut),  
    endDate: decodeFrenchDate(item.dateFin),  
    target: item.cible || [],  
    targetSchools: item.ciblesEtab || [],  
    colorName: item.type  
  };
};
