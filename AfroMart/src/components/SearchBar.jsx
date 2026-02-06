import { useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { useShopContext } from "../contexts/ShopContext";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useShopContext();
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("collections")) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [location]);

  return (
    <div
      className={`search-bar ${showSearch && visible ? "visible" : "hidden"} border-t border-b bg-gray-50 text-center`}
    >
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-5 my-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer"
        alt=""
      />
    </div>
  );
}

export default SearchBar;
