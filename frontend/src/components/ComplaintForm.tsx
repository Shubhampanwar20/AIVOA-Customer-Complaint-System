import StatusCard from "./StatusCard";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import InputField from "./InputField";
import AICopilot from "./AICopilot";
import SectionTitle from "./SectionTitle";


type AIResult = {
  // camelCase (backend response)
  complaintSource?: string;
  customerName?: string;
  productName?: string;
  productStrength?: string;
  batchNumber?: string;
  quantityAffected?: number | string;
  manufacturingDate?: string;
  expiryDate?: string;

  // snake_case (fallback)
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

function ComplaintForm() {
  const [loading, setLoading] = useState(false);

  const [aiResult, setAiResult] = useState<AIResult | null>(null);

  const [formData, setFormData] = useState({
    complaint_source: "",
    customer_name: "",
    product_name: "",
    product_strength: "",
    batch_number: "",
    quantity: "",
    manufacturing_date: "",
    expiry_date: "",
    description: "",
  });

  useEffect(() => {
  console.log("ComplaintForm formData:", formData);
}, [formData]);

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const analyzeComplaint = async () => {
    if (!formData.description.trim()) {
      alert("Please enter a complaint description.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/analyze", {
        text: formData.description,
      });

      let result = response.data.ai_response;

      if (typeof result === "string") {
        result = JSON.parse(
          result.replace(/```json/g, "").replace(/```/g, "").trim()
        );
      }

      if (result.structured_data) {
        result = result.structured_data;
      }

      console.log("AI Result:", result);
      console.log("Full Response:", response.data);
console.log("AI Result:", result);
alert(JSON.stringify(response.data, null, 2));

      setAiResult(result);

      setFormData((prev) => ({
        ...prev,
        complaint_source: result.complaintSource ??
          result.complaint_source ??
          "",

        customer_name: result.customerName ??
          result.customer_name ??
          "",

        product_name: result.productName ??
          result.product_name ??
          "",

        product_strength: result.productStrength ??
          result.product_strength ??
          "",

        batch_number: result.batchNumber ??
          result.batch_number ??
          "",

        quantity: String(
          result.quantityAffected ??
          result.quantity ??
          ""
        ),

        manufacturing_date: result.manufacturingDate ??
          result.manufacturing_date ??
          "",

        expiry_date: result.expiryDate ??
          result.expiry_date ??
          "",
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to analyze complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Dashboard Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatusCard
          title="Today's Complaints"
          value="24"
          color="text-blue-600" />

        <StatusCard
          title="Pending Review"
          value="8"
          color="text-amber-600" />

        <StatusCard
          title="High Risk"
          value="3"
          color="text-red-600" />

        <StatusCard
          title="AI Accuracy"
          value="96%"
          color="text-green-600" />
      </div>

      <div className="grid gap-8 xl:grid-cols-[2fr_420px] items-start">

        {/* Complaint Form */}

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl transition-all duration-300">

          <div className="mb-10 flex items-start justify-between border-b border-slate-200 pb-6">

            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Log Customer Complaint
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Intelligent complaint intake powered by AI for faster QA triage.
              </p>
            </div>

            <div className="text-right">

              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                Pending Triage
              </span>

              <div className="mt-3 flex items-center justify-end gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />

                <span className="text-xs text-slate-500">
                  Awaiting AI Analysis
                </span>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <SectionTitle
              number="1"
              title="Customer Information" />

            <InputField
              label="Complaint Source"
              value={formData.complaint_source}
              onChange={(e) => handleChange("complaint_source", e.target.value)} />

            <InputField
              label="Customer Name"
              value={formData.customer_name}
              onChange={(e) => handleChange("customer_name", e.target.value)} />
            <SectionTitle
              number="2"
              title="Product & Batch Identification" />

            <InputField
              label="Product Name"
              value={formData.product_name}
              onChange={(e) => handleChange("product_name", e.target.value)} />

            <InputField
              label="Product Strength"
              value={formData.product_strength}
              onChange={(e) => handleChange("product_strength", e.target.value)} />

            <InputField
              label="Batch Number"
              value={formData.batch_number}
              onChange={(e) => handleChange("batch_number", e.target.value)} />

            <InputField
              label="Quantity Affected"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)} />

            <SectionTitle
              number="3"
              title="Manufacturing Details" />

            <InputField
              label="Manufacturing Date"
              value={formData.manufacturing_date}
              onChange={(e) => handleChange("manufacturing_date", e.target.value)} />

            <InputField
              label="Expiry Date"
              value={formData.expiry_date}
              onChange={(e) => handleChange("expiry_date", e.target.value)} />

          </div>


          <SectionTitle
            number="4"
            title="Complaint Description" />

          <div className="mt-3">
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the customer complaint in detail..."
              className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>

          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <h3 className="text-sm font-semibold text-blue-700">
              🤖 AI Complaint Options
            </h3>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-700">
              <li>Upload a complaint PDF from the AIVOA Copilot.</li>
              <li>Or type a complaint description below.</li>
              <li>Click <strong>Analyze Typed Complaint</strong> to extract structured information.</li>
            </ul>
          </div>

          <button
            onClick={analyzeComplaint}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-5 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                AI is analyzing...
              </>
            ) : (
              <>
                🧠 Analyze Typed Complaint
              </>
            )}
          </button>

        </div>

        {/* AI Copilot */}
        <div className="sticky top-6 self-start h-[calc(100vh-140px)]">
          <AICopilot
            data={aiResult}
            formData={formData}
            setFormData={setFormData} />
        </div>

      </div>
    </>
  );
}

export default ComplaintForm;