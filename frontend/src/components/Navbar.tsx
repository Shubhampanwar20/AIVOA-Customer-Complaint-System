import {
  Bell,
  Search,
  Sparkles,
  UserCircle2,
} from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Left */}

      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Complaint Management
        </h1>

        <p className="text-xs text-slate-500">
          AI Powered Quality Assurance
        </p>
      </div>

      {/* Middle */}

      <div className="hidden lg:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-96">

        <Search size={18} className="text-slate-400" />

        <input
          placeholder="Search complaints..."
          className="bg-transparent outline-none ml-3 w-full text-sm"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">

          <Sparkles size={16} className="text-green-600"/>

          <span className="text-sm font-semibold text-green-700">
            AI Online
          </span>

        </div>

        <button className="relative">

          <Bell size={22}/>

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"/>

        </button>

        <div className="flex items-center gap-2">

          <UserCircle2
            size={34}
            className="text-slate-700"
          />

          <div>

            <p className="text-sm font-semibold">
              Shubham
            </p>

            <p className="text-xs text-slate-500">
              QA Engineer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;