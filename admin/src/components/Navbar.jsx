import { assets } from "../assets/admin_assets/assets";

function Navbar() {
  return (
    <div className="py-10 px-10 flex justify-between items-center">
      <img src={assets.logo} width={200} height={200} alt="" />
      <div>
        <p>Login</p>
      </div>
    </div>
  );
}

export default Navbar;
