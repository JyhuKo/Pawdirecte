import type { WorkspaceItemKind } from "~/models";

export type WorkspaceItem = Readonly<{
  id: number;
  title: string;
  description: string;
  summary: string;
  cloud: boolean;
  discussion: boolean;
  agenda: boolean;
  isPublic: boolean;
  isOpen: boolean;
  kind: WorkspaceItemKind;
  isMember: boolean;
  isAdmin: boolean;
  teacherRooms: boolean;
  createdBy: string;
  permissions: 0 | 1 | 2; // ??? rien , lecture , ecriture ?
  nbMembers: number;
  colorEventAgenda: string;
  createdAt?: string;
  messagerieEleve?: boolean;
  messagerieFamille?: boolean;
}>;

