import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import type { Message } from "./Message";

type AIResult = {
  // camelCase
  complaintSource?: string;
  customerName?: string;
  productName?: string;
  productStrength?: string;
  batchNumber?: string;
  quantityAffected?: number | string;
  manufacturingDate?: string;
  expiryDate?: string;

  // snake_case
  complaint_source?: string;
  customer_name?: string;
  product_name?: string;
  product_strength?: string;
  batch_number?: string;
  quantity?: string;
  manufacturing_date?: string;
  expiry_date?: string;

  summary?: string;
  risk?: string;
  root_cause?: string;
  capa?: string;
};

type ComplaintFormData = {
  complaint_source: string;
  customer_name: string;
  product_name: string;
  product_strength: string;
  batch_number: string;
  quantity: string;
  manufacturing_date: string;
  expiry_date: string;
  description: string;
};

type Props = {
  data: AIResult | null;
  formData: ComplaintFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<ComplaintFormData>
  >;
};

export default function AICopilot({
  data,
  formData,
  setFormData,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text:
        "👋 Welcome to AIVOA Copilot.\n\nUpload a complaint PDF or paste your complaint below.\n\nI can extract Customer, Product, Batch Number, Risk, Root Cause and CAPA automatically.",
    },
  ]);

  const [thinking, setThinking] = useState(false);
  const [aiStep, setAiStep] = useState("Reading PDF...");

  const suggestions = [
  "📝 Summarize Complaint",
  "👤 Extract Customer",
  "💊 Find Product",
  "⚠ Assess Risk",
];

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

useEffect(() => {
  if (!data) return;

setFormData((prev) => ({
  ...prev,
  complaint_source:
    data.complaintSource ?? data.complaint_source ?? prev.complaint_source,

  customer_name:
    data.customerName ?? data.customer_name ?? prev.customer_name,

  product_name:
    data.productName ?? data.product_name ?? prev.product_name,

  product_strength:
    data.productStrength ?? data.product_strength ?? prev.product_strength,

  batch_number:
    data.batchNumber ?? data.batch_number ?? prev.batch_number,

  quantity: String(
    data.quantityAffected ?? data.quantity ?? prev.quantity
  ),

  manufacturing_date:
    data.manufacturingDate ??
    data.manufacturing_date ??
    prev.manufacturing_date,

  expiry_date:
    data.expiryDate ??
    data.expiry_date ??
    prev.expiry_date,
}));

  setThinking(true);

setAiStep("📄 Reading PDF...");

setTimeout(() => {
  setAiStep("📝 Extracting Text...");
}, 700);

setTimeout(() => {
  setAiStep("🧠 Detecting Customer & Product...");
}, 1400);

setTimeout(() => {
  setAiStep("⚠ Assessing Risk...");
}, 2100);

setTimeout(() => {
  setAiStep("✅ Generating Summary...");
}, 2800);

    setTimeout(() => {
      setThinking(false);
      setAiStep("Ready");

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          sender: "ai",
          text: `Customer : ${data.customer_name ?? "-"}

Product : ${data.product_name ?? "-"}

Summary :
${data.summary ?? "-"}

Risk :
${data.risk ?? "-"}

Root Cause :
${data.root_cause ?? "-"}

CAPA :
${data.capa ?? "-"}`,
        },
      ]);
    }, 3500);
  }, [data]);

 const addAI = (text: string) => {
  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + Math.random(),
      sender: "ai",
      text: `${text}

🕒 ${new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
})}`,
    },
  ]);
};
  const uploadPDF = async (file: File) => {
  addAI(`📄 Uploading ${file.name}...`);

  setThinking(true);

  try {
    const form = new FormData();
    form.append("file", file);

    // Step 1: Extract text from PDF
    const pdfResponse = await fetch("http://localhost:8000/upload-pdf", {
      method: "POST",
      body: form,
    });

    if (!pdfResponse.ok) {
  throw new Error("PDF upload failed");
}

const pdf = await pdfResponse.json();

    // Step 2: Analyze extracted text
    const aiResponse = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: pdf.text,
      }),
    });

    if (!aiResponse.ok) {
  throw new Error("AI analysis failed");
}

const ai = await aiResponse.json();

let result = ai.ai_response;

if (typeof result === "string") {
  result = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  result = JSON.parse(result);
}

if (result.structured_data) {
  result = result.structured_data;
}

console.log(result);

setThinking(false);

console.log("Before update:", formData);
console.log("Result:", result);

setFormData({
  complaint_source:
    result.complaintSource ?? result.complaint_source ?? "",

  customer_name:
    result.customerName ?? result.customer_name ?? "",

  product_name:
    result.productName ?? result.product_name ?? "",

  product_strength:
    result.productStrength ?? result.product_strength ?? "",

  batch_number:
    result.batchNumber ?? result.batch_number ?? "",

  quantity: String(
    result.quantityAffected ?? result.quantity ?? ""
  ),

  manufacturing_date:
    result.manufacturingDate ??
    result.manufacturing_date ??
    "",

  expiry_date:
    result.expiryDate ??
    result.expiry_date ??
    "",

  description: pdf.text,
});

addAI(`✅ Complaint Analysis Complete

👤 Customer: ${result.customerName ?? result.customer_name ?? "-"}

💊 Product: ${result.productName ?? result.product_name ?? "-"}

🏷 Batch: ${result.batchNumber ?? result.batch_number ?? "-"}

📦 Quantity: ${result.quantityAffected ?? result.quantity ?? "-"}

🧪 Strength: ${result.productStrength ?? result.product_strength ?? "-"}

📅 MFG: ${result.manufacturingDate ?? result.manufacturing_date ?? "-"}

⏳ EXP: ${result.expiryDate ?? result.expiry_date ?? "-"}`);
  } catch (err) {
    console.error(err);
    setThinking(false);
    addAI("❌ AI analysis failed.");
  }
};

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
setMessages((prev) => [
  ...prev,
  {
    id: Date.now(),
    sender: "user",
    text,
  },
]);

    const value = text.trim();
    const lower = value.toLowerCase();
if (lower.includes("upload pdf")) {
  addAI("📎 Click the attachment icon below to upload a complaint PDF.");
  return;
}

if (lower.includes("summarize")) {
  addAI("Paste a complaint or upload a PDF and I'll summarize it.");
  return;
}

if (lower.includes("extract customer")) {
  addAI("Upload a complaint PDF and I'll extract the customer details.");
  return;
}

if (lower.includes("assess risk")) {
  addAI("Upload a complaint and I'll identify the complaint risk level.");
  return;
}
  

    if (lower.startsWith("customer ")) {
      const customer = value.substring(9).trim();

      setFormData((prev) => ({
        ...prev,
        customer_name: customer,
      }));

      addAI(`✅ Customer updated to ${customer}`);
      return;
    }

    if (lower.startsWith("product ")) {
      const product = value.substring(8).trim();

      setFormData((prev) => ({
        ...prev,
        product_name: product,
      }));

      addAI(`✅ Product updated to ${product}`);
      return;
    }

    if (lower.startsWith("batch ")) {
      const batch = value.substring(6).trim();

      setFormData((prev) => ({
        ...prev,
        batch_number: batch,
      }));

      addAI(`✅ Batch Number updated to ${batch}`);
      return;
    }
        if (lower.startsWith("quantity ")) {
      const quantity = value.substring(9).trim();

      setFormData((prev) => ({
        ...prev,
        quantity,
      }));

      addAI(`✅ Quantity updated to ${quantity}`);
      return;
    }

    if (lower.startsWith("strength ")) {
      const strength = value.substring(9).trim();

      setFormData((prev) => ({
        ...prev,
        product_strength: strength,
      }));

      addAI(`✅ Product Strength updated.`);
      return;
    }

    if (lower.startsWith("source ")) {
      const source = value.substring(7).trim();

      setFormData((prev) => ({
        ...prev,
        complaint_source: source,
      }));

      addAI(`✅ Complaint Source updated.`);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      description: value,
    }));

    addAI(
      "🧠 Complaint saved.\n\nClick 'Analyze Complaint with AI' to extract all structured information."
    );
  };

  return (
    <div className="flex h-full min-h-190 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              🤖 AIVOA Copilot
            </h2>

            <p className="text-sm text-slate-500">
              AI Complaint Intelligence Assistant
            </p>
          </div>

         <div
  className={`rounded-full px-3 py-1 text-xs font-semibold ${
    thinking
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {thinking ? "🧠 Processing..." : "🟢 Online"}
</div>

        </div>

      </div>

      {/* Chat */}

     <div className="flex-1 overflow-y-auto scroll-smooth bg-slate-50 px-6 py-6">
       {messages.length === 1 && (
  <div className="mb-5 flex flex-wrap gap-2">
    {suggestions.map((item) => (
      <button
        key={item}
        onClick={() => sendMessage(item)}
        className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs transition hover:bg-slate-100"
      >
        {item}
      </button>
    ))}
  </div>
)}

{messages.map((message) => (
  <ChatBubble
    key={message.id}
    sender={message.sender}
    text={message.text}
  />
))}
    

        {thinking && (

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white">
              AI
            </div>

            <div className="rounded-2xl bg-white px-5 py-4 shadow">

              <div className="text-sm font-semibold">
                AIVOA Copilot
              </div>

             <div className="mt-3 flex items-center gap-2">
  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:150ms]" />
  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:300ms]" />

  <div className="ml-3">
  <p className="text-sm font-semibold text-slate-700">
    {aiStep}
  </p>

  <div className="mt-2 h-2 w-56 overflow-hidden rounded-full bg-slate-200">
    <div className="h-full animate-pulse rounded-full bg-indigo-600 w-3/4"></div>
  </div>
</div>
</div>

            </div>

          </div>

        )}

        <div ref={bottomRef} />

        </div>

      {/* Quick Actions */}

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">

        <div className="mb-2 text-xs font-semibold text-slate-500">
          QUICK ACTIONS
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={() =>
              sendMessage("Customer Apollo Pharmacy")
            }
            className="rounded-full bg-white px-4 py-2 text-xs shadow hover:bg-slate-100"
          >
            Customer
          </button>

          <button
            onClick={() =>
              sendMessage("Product Paracetamol 500mg")
            }
            className="rounded-full bg-white px-4 py-2 text-xs shadow hover:bg-slate-100"
          >
            Product
          </button>

          <button
            onClick={() =>
              sendMessage("Batch BMX240602")
            }
            className="rounded-full bg-white px-4 py-2 text-xs shadow hover:bg-slate-100"
          >
            Batch
          </button>

          <button
            onClick={() =>
              sendMessage("Quantity 48")
            }
            className="rounded-full bg-white px-4 py-2 text-xs shadow hover:bg-slate-100"
          >
            Quantity
          </button>

        </div>

      </div>

      <ChatInput onSend= {sendMessage} onUpload={uploadPDF} />

    </div>
  );
}