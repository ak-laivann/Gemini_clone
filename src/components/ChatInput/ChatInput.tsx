import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Send, InsertPhotoOutlined } from "@mui/icons-material";
import { useChatStore } from "../../store/chatStore";
import TextareaAutosize from "react-textarea-autosize";

export const ChatInput = () => {
  const addMessage = useChatStore((state) => state.addMessage);
  const [message, setMessage] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validImages = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    setImages((prev) => [...prev, ...validImages]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim() && images.length === 0) return;

    console.log("Sending message:", message);
    console.log("Sending images:", images);

    addMessage({
      id: Date.now().toString(),
      role: "user",
      text: message.trim() || undefined,
      image: images.length > 0 ? JSON.stringify(images[0]) : undefined,
    });

    setMessage("");
    setImages([]);
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
                  className="absolute top-0 right-0 bg-white rounded-full text-xs text-red-500 font-bold p-0.5 hidden group-hover:block"
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
            // className="w-full resize-none outline-none px-3 py-2 text-sm text-gray-800 rounded-xl"
          />
        </div>

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

          {showSendButton && (
            <button
              type="submit"
              className="p-2 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition"
              aria-label="Send"
            >
              <Send />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
