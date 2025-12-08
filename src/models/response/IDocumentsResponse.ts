export interface IGetDocumentsResponse {
  success: string;
  documents: IDocumentResponse[];
}

export interface IDocumentResponse {
  collaborators: [];
  ownerId: { email: string; username: string; _id: string };
  title: string;
  updatedAt: string;
  _id: string;
}
