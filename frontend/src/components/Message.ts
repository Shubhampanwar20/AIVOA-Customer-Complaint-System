export type Message = {
  id: number;
  sender: "ai" | "user";
  text: string;
};