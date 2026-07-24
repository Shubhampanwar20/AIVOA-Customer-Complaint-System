import { UploadCloud, FileText } from "lucide-react";

const UploadBox = () => {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-500 hover:bg-blue-50">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <UploadCloud size={30} className="text-blue-600" />
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        Upload Complaint Document
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Drag & drop a PDF, DOCX or image here
      </p>

      <p className="my-4 text-sm text-slate-400">or</p>

      <button className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
        Browse Files
      </button>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
        <FileText size={18} />
        Supported: PDF, DOCX, JPG, PNG
      </div>
    </div>
  );
};

export default UploadBox;