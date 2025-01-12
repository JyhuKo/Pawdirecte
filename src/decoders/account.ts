import { decodeAccountKind } from "~/decoders/account-kind";
import type { Account } from "~/models/account";

export const decodeAccount = (account: any): Account => {
  const gender =
    account.profile?.sexe ??
    (account.civilite === "Mme" ? "F" : "M");

  return {
    loginID: account.idLogin,
    id: account.id,
    userID: account.uid,
    username: account.identifiant,
    kind: decodeAccountKind(account.typeCompte),
    ogecID: account.codeOgec,
    main: account.main,
    lastConnection: new Date(account.lastConnexion),
    firstName: account.prenom,
    lastName: account.nom,
    email: account.email,
    phone: account.profile?.telPortable ?? "",
    schoolName: account.nomEtablissement,
    schoolUAI: account.profile?.rneEtablissement ?? "",
    schoolLogoPath: account.logoEtablissement,
    schoolAgendaColor: account.couleurAgendaEtablissement,
    access_token: account.accessToken ?? "",
    socket_token: account.socketToken,
    gender,
    profilePictureURL: account.profile?.photo ?? "",
    modules: account.modules,//TODO
    currentSchoolCycle: account.anneeScolaireCourante ?? "",
    class: {
      short: account.profile?.classe?.code ?? "",
      long: account.profile?.classe?.libelle ?? "",
      isGraded: !!account.profile?.classe?.estNote,
    },
    individualParameters: {
      visualAccessibility: !!account.parametresIndividuels?.accessibiliteVisuelle,
      secureAuthentication: !!account.parametresIndividuels?.checkAuthentificationSecure,
      defaultNoteEntryMode: account.parametresIndividuels?.typeSaisieNotesDefaut ?? "",
      maxDaysBeforeAssignmentDue: account.parametresIndividuels?.nbJoursMaxRenduDevoirCDT ?? "",
      defaultClassViewType: account.parametresIndividuels?.typeViewCDTDefaut ?? "",
      blockPMOnHomePage: !!account.parametresIndividuels?.blocPMAccueil,
      blockNewsOnHomePage: !!account.parametresIndividuels?.blocActuAccueil,
    },
  };
};
