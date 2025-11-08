import { Link, useLocation } from "@tanstack/react-router";
import { FileText, Home, MapPin, User } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className=" bg-white border-t border-gray-200 z-30 max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-1 px-4 py-3">
        <Link
          to="/home"
          className={`flex flex-col items-center gap-1 ${
            isActive("/")
              ? "text-orange-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <Home
            className="w-6 h-6"
            fill={isActive("/") ? "currentColor" : "none"}
          />
          <span className="text-xs font-medium">홈</span>
        </Link>

        <Link
          to="/explore"
          className={`flex flex-col items-center gap-1 ${
            isActive("/explore")
              ? "text-orange-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <MapPin
            className="w-6 h-6"
            fill={isActive("/explore") ? "currentColor" : "none"}
          />
          <span className="text-xs">탐색</span>
        </Link>

        <Link
          to="/record"
          className={`flex flex-col items-center gap-1 ${
            isActive("/record")
              ? "text-orange-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs">기록</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center gap-1 ${
            isActive("/profile")
              ? "text-orange-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">마이</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
