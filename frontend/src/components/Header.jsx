import { useAuth } from "../hooks/useAuth";
import { LogOut, Instagram } from "lucide-react";

export default function Header() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        if (confirm("Are you sure you want to logout?")) {
            await logout();
        }
    };

    return (
        <header className="sticky top-0 w-full h-14 flex items-center justify-between bg-white border-b border-gray-200 px-4 z-40 shadow-sm">
            <div className="flex items-center gap-2">
                <Instagram size={24} className="text-purple-600" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    SimpleInsta
                </h1>
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Logout"
            >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
            </button>
        </header>
    );
}

  