import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, PlusSquare, User } from "lucide-react";
import AddPostModal from "./AddPostModal";

export default function BottomNav({ onPosted }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handlePostCreated = (newPost) => {
        setIsOpen(false);
        onPosted?.(newPost);
        // Navigate to home if not already there
        if (location.pathname !== "/") {
            navigate("/");
        }
    };

    const navItems = [
        { icon: Home, label: "Home", path: "/", active: location.pathname === "/" },
        { icon: PlusSquare, label: "Add", action: () => setIsOpen(true), active: false },
        { icon: User, label: "Profile", path: "/profile", active: location.pathname === "/profile" },
    ];

    const handleNavClick = (item) => {
        if (item.action) {
            item.action();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <>
            <nav className="sticky bottom-0 w-full h-14 bg-white border-t border-gray-200 flex justify-around items-center z-40 shadow-lg">
                {navItems.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => handleNavClick(item)}
                        className={`flex flex-col items-center justify-center flex-1 h-full transition ${
                            item.active ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                        }`}
                        title={item.label}
                    >
                        <item.icon size={24} className={item.active ? "stroke-2" : ""} />
                        <span className="text-xs mt-1">{item.label}</span>
                    </button>
                ))}
            </nav>

            <AddPostModal isOpen={isOpen} onClose={() => setIsOpen(false)} onPosted={handlePostCreated} />
        </>
    );
}

