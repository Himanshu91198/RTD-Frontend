import { useForm } from "react-hook-form";
import { createDocument } from "../services/documentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useModal } from "../hooks/useModal";

export default function CreateDocument() {
  const { register, formState, handleSubmit } = useForm<{
    title: string;
  }>();
  const { close } = useModal();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      toast.success("Document successfully created");
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
      close("");
    },
    onError: (err) => toast.error(err.message),
  });

  async function handleCreateDocument(data: { title: string }) {
    mutate(data);
  }

  return (
    <>
      <h3 className="text-5xl mb-1 text-(--color-brand-600) font-semibold">
        Create New Document
      </h3>
      <p className="text-[1.25rem] text-gray-600">
        Start a fresh workspace for your ideas and collaborate in real-time.
      </p>
      <form
        onSubmit={handleSubmit(handleCreateDocument)}
        className="mt-8 flex flex-col gap-6"
      >
        <div>
          <label htmlFor="email">Title</label>
          <input
            className="w-full"
            type="text"
            id="title"
            disabled={formState.isSubmitting}
            {...register("title", {
              required: { message: "Title is required", value: true },
              minLength: {
                message: "Title must be atleast 3 characters",
                value: 3,
              },
              maxLength: {
                message: "Title must be atmost 30 characters",
                value: 30,
              },
            })}
          />
          <p className="text-[1.25rem] text-red-600">
            {formState.errors.title?.message}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="login-register-button mt-4"
            disabled={formState.isSubmitting}
          >
            <span className="login-register-button-content">Save</span>
          </button>
        </div>
      </form>
    </>
  );
}
