import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GetUserName } from "../services/authservice";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updateDocumentContent } from "../services/documentService";
import { API_HTTP } from "../config/constants";

export default function DocumentEditor() {
  const { id: documentId } = useParams();
  const [params] = useSearchParams();
  const documentName = params.get("documentName");
  const navigate = useNavigate();
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );
  const timeOutRef = useRef<number | null>(null);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [content, setContent] = useState<string>();
  const { isPending: saving, mutate } = useMutation({
    mutationFn: (payload: { documentId: string; content: string }) =>
      updateDocumentContent(payload),
  });
  const username = GetUserName();

  useEffect(() => {
    const interval = setInterval(() => {
      if (documentId && content) mutate({ documentId, content });
    }, 10000);
    return () => clearInterval(interval);
  }, [documentId, content]);

  useEffect(() => {
    socketRef.current = io(API_HTTP);

    socketRef.current.on("connect", () => {
      console.log(socketRef.current?.id);
    });
    socketRef.current.on("initial-users", (users) => {
      setCollaborators(users);
    });
    socketRef.current.on("initial-content", (content) => {
      setContent(content);
    });
    socketRef.current.emit("joined-document", { documentId, username });
    socketRef.current.on("user-joined", (username) => {
      toast(`${username} joined the document`, {
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: "#6366f1",
          color: "#fff",
        },
      });
      setCollaborators((prev) => [...prev, username]);
    });
    socketRef.current.on("user-left", (username) => {
      toast(`${username} left the document`, {
        icon: "😔",
        style: {
          borderRadius: "10px",
          background: "#6366f1",
          color: "#fff",
        },
      });
      setCollaborators((prev) => prev.filter((x) => x !== username));
    });
    socketRef.current.on("receive-changes", (value) => {
      setContent(value);
    });
    return () => {
      socketRef.current?.emit("left-document", { documentId, username });
      socketRef.current?.off("user-joined");
      socketRef.current?.off("user-left");
      socketRef.current?.disconnect();
      toast.dismissAll();
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setContent(value);
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    timeOutRef.current = setTimeout(() => {
      socketRef.current?.emit("send-changes", { documentId, value });
    }, 200);
  }

  return (
    <div className="flex-1 px-5">
      <div className="flex items-center py-4 px-6 justify-between bg-gray-50 mt-4 rounded-md drop-shadow-sm mb-5">
        <div className="flex items-start gap-3">
          <button
            className="border-0 p-0"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoArrowBackCircleOutline className="text-5xl hover:text-(--color-brand-500)" />
          </button>
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-semibold">{documentName}</p>
            <small className="flex items-center gap-1 text-gray-500">
              {saving ? "⏳ Saving..." : "✅ Saved"}
            </small>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-9 gap-5 h-[70vh]">
        <div className="col-span-2 bg-white rounded-md drop-shadow-md p-4">
          <h3 className="font-semibold mb-2">Collaborators</h3>
          <ul className="space-y-1">
            {collaborators.map((name, idx) => (
              <li key={idx} className="flex items-center gap-2 overflow-y-auto">
                <div className="live-collaborator"></div>
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-7 h-full">
          <textarea
            className="h-full w-full text-lg px-4 py-6 outline-none bg-white rounded-md drop-shadow-md border-0"
            disabled={saving}
            value={content}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
