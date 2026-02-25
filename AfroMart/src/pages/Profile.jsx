import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function Profile() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center border-t">
        <p className="text-gray-500 text-sm">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] border-t py-10 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-medium mb-6">My Profile</h1>

        <div className="border border-gray-200 bg-gray-50/60 p-6 space-y-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Name</p>
            <p className="font-medium">{user.name || "Unnamed user"}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-6 bg-black text-white px-6 py-2 text-sm hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;

