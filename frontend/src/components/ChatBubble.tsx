type Props = {
  text: string;
  sender: "user" | "ai";
};

export default function ChatBubble({ text, sender }: Props) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-end gap-3 max-w-[85%] ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-md shrink-0 ${
            isUser ? "bg-indigo-600" : "bg-slate-800"
          }`}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Bubble */}
        <div
          className={`rounded-3xl px-5 py-4 shadow-md ${
            isUser
              ? "bg-indigo-600 text-white rounded-br-lg"
              : "bg-white border border-slate-200 text-slate-800 rounded-bl-lg"
          }`}
        >
          <div className="mb-2 text-xs font-semibold opacity-70">
            {isUser ? "You" : "AIVOA Copilot"}
          </div>

          <p className="whitespace-pre-wrap text-sm leading-7">
            {text}
          </p>

          <div className="mt-3 text-[10px] opacity-60 text-right">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}