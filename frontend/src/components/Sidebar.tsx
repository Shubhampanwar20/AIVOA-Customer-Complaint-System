import {
  LayoutDashboard,
  ClipboardList,
  FolderOpen,
  BarChart3,
  FileText,
  Settings,
  Sparkles,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Complaint Intake",
    icon: ClipboardList,
    active: true,
  },
  {
    name: "Complaints",
    icon: FolderOpen,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
  {
    name: "Reports",
    icon: FileText,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-[calc(100vh-64px)] flex flex-col">

      {/* Logo */}

      <div className="border-b border-slate-700 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">

            <Sparkles size={22} />

          </div>

          <div>

            <h2 className="font-bold text-lg">
              AIVOA
            </h2>

            <p className="text-xs text-slate-400">
              QA Platform
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </button>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-700 p-5">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-xs text-slate-400">
            AI Engine
          </p>

          <p className="mt-1 font-semibold text-green-400">
            Connected
          </p>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;