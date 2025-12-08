import { Modal } from "../components/Modal";
import TableBody from "../components/TableBody";
import TableHead from "../components/TableHead";
import CreateDocument from "./CreateDocument";

export default function DocumentList() {
  return (
    <div className="flex-1 px-5">
      <div className="flex items-center py-4 px-6 justify-end bg-(--color-grey-50) mt-4 rounded-md drop-shadow-sm">
        <Modal>
          <Modal.Open opensWindowName="create-document-form">
            <button className="login-register-button shadow-md ">
              <span className="login-register-button-content">
                Create Document
              </span>
            </button>
          </Modal.Open>
          <Modal.Window name="create-document-form">
            <CreateDocument />
          </Modal.Window>
        </Modal>
      </div>

      <table className="w-full my-4 border border-(--color-grey-400)">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
}
