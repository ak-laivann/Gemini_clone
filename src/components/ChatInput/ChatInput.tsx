import { SendOutlined } from "@ant-design/icons";

export const ChatInput = () => {
  return (
    <form>
      <input placeholder="Send a message..." />
      <button type="submit">
        <SendOutlined />
      </button>
    </form>
  );
};
