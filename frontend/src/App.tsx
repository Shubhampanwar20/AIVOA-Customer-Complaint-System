import ComplaintForm from "./components/ComplaintForm";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Navigation */}
      <Navbar />

      <div className="flex">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-slate-100">
          <div className="mx-auto max-w-7xl p-8">
            <ComplaintForm />
          </div>
        </main>

      </div>

    </div>
  );
}

export default App;