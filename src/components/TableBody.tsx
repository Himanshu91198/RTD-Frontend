import { MdOutlineEdit } from "react-icons/md";
import { LuView } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import { deleteDocument, getDocuments } from "../services/documentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUserId } from "../services/authservice";
import { Modal } from "./Modal";
import UpdateDocument from "../pages/UpdateDocument";
import toast from "react-hot-toast";

export default function TableBody() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });
  const { mutate: removeDocument } = useMutation({
    mutationFn: (payload: { documentId: string }) => deleteDocument(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
      toast.success("Document deleted successfully");
    },
  });
  const navigate = useNavigate();
  const userId = GetUserId();
  return (
    <>
      <tbody className="border-b border-(--color-grey-200) last:border-b-0">
        {data?.documents.map((document, index) => (
          <tr
            key={document._id}
            className="bg-(--color-grey-100) hover:bg-(--color-grey-200) transition-all duration-100 ease-in"
          >
            <td className="py-[1.2rem] px-[2.4rem] text-center">{index + 1}</td>
            <td className="py-[1.2rem] px-[2.4rem] hover:text-(--color-brand-500) text-center">
              <Link
                to={`/app/document-editor/${document._id}?documentName=${document.title}`}
              >
                {document.title}
              </Link>
            </td>
            <td className="py-[1.2rem] px-[2.4rem] text-center">
              {document.ownerId.username}
            </td>
            <td className="py-[1.2rem] px-[2.4rem] text-center">
              {new Date(document.updatedAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td className="py-[1.2rem] px-[2.4rem] flex items-center justify-center gap-8">
              {document.ownerId._id === userId && (
                <Modal>
                  <Modal.Open opensWindowName={`edit-document-${document._id}`}>
                    <button
                      data-tooltip-id="edit-tooltip"
                      data-tooltip-content="Edit Document"
                      className="border-0"
                      type="button"
                    >
                      <MdOutlineEdit className="text-4xl hover:text-(--color-brand-500)" />
                    </button>
                  </Modal.Open>
                  <Modal.Window name={`edit-document-${document._id}`}>
                    <UpdateDocument
                      documentId={document._id}
                      title={document.title}
                    />
                  </Modal.Window>
                </Modal>
              )}
              <button
                data-tooltip-id="view-tooltip"
                data-tooltip-content="View Document"
                className="border-0"
                type="button"
                onClick={() => {
                  navigate(
                    `/app/document-editor/${document._id}?documentName=${document.title}`
                  );
                }}
              >
                <LuView className="text-4xl hover:text-(--color-brand-500)" />
              </button>
              {document.ownerId._id === userId && (
                <button
                  data-tooltip-id="delete-tooltip"
                  data-tooltip-content="Delete Document"
                  className="border-0"
                  type="button"
                  onClick={() => {
                    removeDocument({ documentId: document._id });
                  }}
                >
                  <AiOutlineDelete className="text-4xl hover:text-(--color-brand-500)" />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <Tooltip
        id="view-tooltip"
        place="bottom"
        className="!py-2 !px-4 !text-[1.25rem] !rounded-md !bg-gray-800 !text-white"
      />
      <Tooltip
        id="delete-tooltip"
        place="bottom"
        className="!py-2 !px-4 !text-[1.25rem] !rounded-md !bg-gray-800 !text-white"
      />
      <Tooltip
        id="edit-tooltip"
        place="bottom"
        className="!py-2 !px-4 !text-[1.25rem] !rounded-md !bg-gray-800 !text-white"
      />
    </>
  );
}
