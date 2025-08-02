import { faker } from "@faker-js/faker";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useChatStore } from "../../store/chatStore";
import TextareaAutosize from "react-textarea-autosize";
import InsertPhotoOutlined from "@mui/icons-material/InsertPhotoOutlined";
import Send from "@mui/icons-material/Send";
import Stop from "@mui/icons-material/StopCircleOutlined";
import { Message } from "../MessageBubble";
import { set, z } from "zod";
import { toast } from "react-toastify";
import { Skeleton } from "antd";
import { timeStamp } from "console";

type ChatInputProps = {
  onUserMessageSent?: (id: string | null) => void;
  isAiTyping?: boolean;
  onStop?: () => void;
};

const messageSchema = z
  .object({
    text: z.string().optional(),
    images: z.array(z.instanceof(File)).optional(),
  })
  .refine(
    (data) =>
      (data.text && data.text.trim() !== "") ||
      (data.images && data.images.length > 0),
    { message: "Please enter a message or upload an image." }
  );

export const ChatInput = ({
  onUserMessageSent,
  isAiTyping = false,
  onStop,
}: ChatInputProps) => {
  const { addMessage, createConversation, currentId, setCurrentId } =
    useChatStore();
  const [message, setMessage] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesLoading, setImagesLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setFormError(null);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImagesLoading(true);
    toast.info("Uploading images... Please wait", {
      autoClose: 1500,
      position: "bottom-right",
    });

    setTimeout(() => {
      setImages((prev) => [...prev, ...validImages]);
      setFormError(null);
      setImagesLoading(false);
      toast.success("Images uploaded successfully!", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }, 3000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validation = messageSchema.safeParse({
      text: message,
      images,
    });

    if (!validation.success) {
      setFormError(validation.error.issues[0].message);
      return;
    }

    const newMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: message.trim() || undefined,
      images:
        images.length > 0
          ? images.map((i) => URL.createObjectURL(i))
          : undefined,
      timeStamp: new Date().toLocaleString(),
    };

    if (!currentId) {
      const fakeTitle = faker.lorem.words({ min: 2, max: 4 });
      const convId = createConversation(fakeTitle, newMsg);
      setCurrentId(convId);
    } else {
      addMessage(currentId, newMsg);
    }

    setMessage("");
    setImages([]);
    setFormError(null);
    onUserMessageSent?.(useChatStore.getState().currentId);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const showSendButton = message.trim().length > 0 || images.length > 0;

  return (
    <div className="mb-12 border border-gray-500 bg-white rounded-xl overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-4 py-2 bg-white"
      >
        {imagesLoading && (
          <Skeleton.Avatar active shape="square" size={"large"} />
        )}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 w-5 h-5 bg-white rounded-full text-xs text-black-500 font-bold p-0.5 hidden group-hover:block flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mb-2">
          <TextareaAutosize
            value={message}
            onChange={handleTextChange}
            placeholder="Ask Gemini Clone"
            minRows={1}
            maxRows={7}
            className="w-full resize-none outline-none px-3 py-2 text-sm text-gray-800 rounded-xl placeholder-gray-500 placeholder:font-semibold"
          />
        </div>

        {formError && (
          <p className="text-red-600 text-sm mb-2 font-semibold">{formError}</p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-600 hover:text-blue-600 p-2 rounded-full transition"
              aria-label="Upload image"
            >
              <InsertPhotoOutlined />
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {isAiTyping ? (
            <button
              type="button"
              onClick={onStop}
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              aria-label="Stop"
            >
              <Stop />
            </button>
          ) : (
            showSendButton && (
              <button
                type="submit"
                className="p-2 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition"
                aria-label="Send"
              >
                <Send />
              </button>
            )
          )}
        </div>
      </form>
    </div>
  );
};
