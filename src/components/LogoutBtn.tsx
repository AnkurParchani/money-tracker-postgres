"use client";
import { useRouter } from "next/navigation";
import { logout } from "../../lib/actions/users";

const LogoutBtn = () => {
  const router = useRouter();

  function handleLogout() {
    const isLogout = logout();
    if (isLogout) {
      router.push("/");
    }
  }

  return (
    <button
      className="bg-gray-700 hover:bg-gray-800 duration-100 py-1.5 px-3 text-sm rounded-md"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
