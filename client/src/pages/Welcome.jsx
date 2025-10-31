import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const apiUrl = localStorage.getItem("API_URL") || "http://localhost:5000/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            await fetch(`${apiUrl}/visit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            navigate("/dashboard"); // ✅ redirect setelah logged
        } catch (err) {
            console.error(err);
            alert("Gagal mengirim data ke server!");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center overflow-hidden relative">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-gradient-x"></div>

            {/* Glass Card */}
            <div className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-center space-y-6 relative z-10">
                <h1 className="text-3xl font-bold text-white">ERP System Backup</h1>
                <p className="text-white/90">Masukkan nama untuk melanjutkan</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        className="w-64 p-3 rounded-md text-center border bg-white/80 mr-3"
                        placeholder="Nama kamu..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-64 bg-black/70 hover:bg-black text-white p-3 rounded-md transition ml-3"
                    >
                        Masuk
                    </button>
                </form>
            </div>

            {/* Background Animation Style */}
            <style>{`
        .animate-gradient-x {
          background-size: 300% 300%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
}
