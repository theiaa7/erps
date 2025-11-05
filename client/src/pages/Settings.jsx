import { useState, useEffect } from "react";

export default function Settings() {
  const [companyName, setCompanyName] = useState("My Company");
  const [darkMode, setDarkMode] = useState(false);
  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem("API_URL") || "http://localhost:5000/api"
  );

  const [visitLogs, setVisitLogs] = useState([]);

  const saveSettings = () => {
    localStorage.setItem("COMPANY_NAME", companyName);
    localStorage.setItem("API_URL", apiUrl);
    alert("Settings saved!");
  };

  // Fetch visit logs dari backend
  const fetchVisitLogs = async () => {
    try {
      const res = await fetch(`${apiUrl}/visit`);
      const data = await res.json();
      setVisitLogs(data);
    } catch (err) {
      console.error(err);
      alert("Gagal fetch visit logs");
    }
  };

  useEffect(() => {
    fetchVisitLogs();
  }, [apiUrl]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Settings</h2>

      <div className="bg-white p-6 shadow rounded-lg space-y-4">
        {/* Company */}
        <div>
          <label className="font-medium">Company Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        {/* API URL */}
        <div>
          <label className="font-medium">API URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>

        {/* Theme */}
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <label>Enable Dark Mode (WIP)</label>
        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>

      {/* VisitLog Table */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Visit Logs</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Date Visited</th>
            </tr>
          </thead>
          <tbody>
            {visitLogs.length > 0 ? (
              visitLogs.map((log) => (
                <tr key={log.id}>
                  <td className="border p-2">{log.name}</td>
                  <td className="border p-2">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan={2}>
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
