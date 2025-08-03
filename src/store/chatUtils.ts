import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../components/MessageBubble";
import localImage from "../assets/Black Yellow Modern Programmer LinkedIn Banner.png";

export const generateMockConversation = (): {
  id: string;
  title: string;
  messages: Message[];
} => {
  const id = uuidv4();
  const title = faker.lorem.words({ min: 3, max: 5 });
  const messages: Message[] = [];

  for (let i = 0; i < 50; i++) {
    messages.push({
      id: uuidv4(),
      role: "assistant",
      text: faker.lorem.sentence(),
      images: [],
      timeStamp: new Date(Date.now() - (50 - i) * 60000).toLocaleString(),
    });

    messages.push({
      id: uuidv4(),
      role: "user",
      text: faker.lorem.sentence(),
      images: [],
      timeStamp: new Date(
        Date.now() - (50 - i) * 60000 + 30000
      ).toLocaleString(),
    });
  }

  messages.push({
    id: uuidv4(),
    role: "user",
    text: "This is a user message with an image.",
    images: [localImage],
    timeStamp: new Date().toLocaleString(),
  });

  return {
    id,
    title,
    messages,
  };
};
