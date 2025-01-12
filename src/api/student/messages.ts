import { decode } from "js-base64";
import { Request } from "~/core/request";
import { decodeMessagesList } from "~/decoders/messages-list";
import {
  type Account,
  type FileKind,
  type Session,
  SessionTokenRequired
} from "~/models";
import type { APIReceivedMessage, ReceivedMessage } from "~/models/message";
import type { APIReceivedMessagesList } from "~/models/messages-list";


const getSchoolYear = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); //janvier= 0 / ddecembre = 11
  
  // si le mois est apres aout ca ajoute + 1 a l'année actuelle sinon ca retire 1 a l'année actuelle
  if (currentMonth >= 7) {
    return `${currentYear}-${currentYear + 1}`;
  } else {
    return `${currentYear - 1}-${currentYear}`;
  }
};


export const studentReceivedMessages = async (
  session: Session,
  account: Account
): Promise<{ chats: Array<ReceivedMessage>; canReply: boolean }> => {
  if (!session.token) throw new SessionTokenRequired();

  const request = new Request(
    `/eleves/${account.id}/messages.awp?verbe=get&getAll=1`
  )
    .addVersionURL()
    .setToken(session.token)
    .setFormData({
      anneeMessages: getSchoolYear()
    });

  const response: APIReceivedMessagesList = await request.send(session.fetcher);
  session.token = response.token;

  return {
    canReply:
      response.data.parametrage.destAdmin ||
      response.data.parametrage.destEleve ||
      response.data.parametrage.destEspTravail ||
      response.data.parametrage.destFamille ||
      response.data.parametrage.destProf,
    chats: response.data.messages.received
      .map(decodeMessagesList)
      .sort((m1: ReceivedMessage, m2: ReceivedMessage) => {
        if (m1.date < m2.date) return 1;
        if (m1.date > m2.date) return -1;
        return 0;
      })
  };
};

export const readMessage = async (
  session: Session,
  account: Account,
  id: number
): Promise<ReceivedMessage> => {
  if (!session.token) throw new SessionTokenRequired();
  const request = new Request(
    `/eleves/${account.id}/messages/${id}.awp?verbe=get&mode=destinataire`
  )
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response: APIReceivedMessage = await request.send(session.fetcher);
  session.token = response.token;

  return {
    id: response.data.id,
    type: response.data.mtype,
    date: new Date(response.data.date),
    read: response.data.read,
    canAnswer: response.data.canAnswer,
    subject: response.data.subject,
    content: decode(response.data.content),
    sender: `${response.data.from.prenom} ${response.data.from.nom}`,
    files: response.data.files.map((file) => ({
      // to download attachement GET /telechargement.awp?leTypeDeFichier={type}&fichierId={id}
      id: file.id,
      name: file.libelle,
      type: file.type as FileKind // file.type is always a FileKind type... a decoder would be overkill
    }))
  };
};
