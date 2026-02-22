import { NavLink, Link } from "react-router-dom";
import { assets } from "./../assets/frontend_assets/assets.js";
import { useState, useRef, useEffect } from "react";
import { useShopContext } from "../contexts/ShopContext.jsx";
import { useAuthContext } from "../contexts/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const { setShowSearch, getCartTotalCount } = useShopContext();
  const { user, logout } = useAuthContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* logo */}
      <Link to="/">
        <img src={assets.logo2} width={140} height={140} alt="logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6 ">
        <img
          src={assets.search_icon}
          alt="search icon"
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        />

        {user ? (
          <div ref={profileRef} className="relative group">
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="profile"
              onClick={() => setProfileMenu((prev) => !prev)}
            />
            <div
              className={`
                 absolute right-0 pt-4
                ${profileMenu ? "block" : "hidden"} sm:group-hover:block`}
            >
              <div className="flex flex-col rounded gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 shadow-lg">
                <Link
                  to="/"
                  className="hover:text-black"
                  onClick={() => setProfileMenu(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="hover:text-black"
                  onClick={() => setProfileMenu(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/"
                  className="hover:text-black"
                  onClick={() => {
                    setProfileMenu(false);
                    logout();
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="text-sm text-gray-700 hover:text-black">
            Login
          </Link>
        )}

        <Link to="/cart" className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="" />
          {getCartTotalCount() > 0 && (
            <p className="absolute -right-1.5 -bottom-1.5 min-w-4 h-4 px-1 flex items-center justify-center bg-black text-white rounded-full text-[8px]">
              {getCartTotalCount() > 99 ? "99+" : getCartTotalCount()}
            </p>
          )}
        </Link>

        <img
          src={assets.menu_icon}
          onClick={() => setOpen(true)}
          alt="menu icon"
          className="w-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* mobile menu */}

      <div
        className={`absolute top-0 left-0 w-full h-screen bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <img
              className="w-3 cursor-pointer"
              src={assets.dropdown_icon}
              alt=""
            />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setOpen(false)}
            className="py-2 pl-6 border"
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            className="py-2 pl-6 border"
            to={"/collections"}
          >
            Collections
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            className="py-2 pl-6 border"
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            className="py-2 pl-6 border"
            to={"/contact"}
          >
            Contact
          </NavLink>
          {!user && (
            <Link
              onClick={() => setOpen(false)}
              className="py-2 pl-6 border"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
