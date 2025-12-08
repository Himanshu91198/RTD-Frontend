import { API_URL } from "../config/constants";
import axiosInstance from "../middlewares/AxiosInstance";
import { IGetDocumentsResponse } from "../models/response/IDocumentsResponse";

export async function getDocuments(): Promise<IGetDocumentsResponse> {
  try {
    const res = await axiosInstance.get(`${API_URL}/documents/get_documents`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function createDocument(request: { title: string }) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/documents/create_document`,
      request
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateDocumentContent(request: {
  documentId: string;
  content: string;
}) {
  try {
    const res = await axiosInstance.patch(
      `${API_URL}/documents/save_document`,
      request
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateDocument(request: {
  documentId: string;
  title: string;
}) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/documents/update_document`,
      request
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteDocument(request: { documentId: string }) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/documents/delete_document`,
      request
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
