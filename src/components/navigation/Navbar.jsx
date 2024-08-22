import Breadcrumbs from "../common/Breadcrumbs";
import SearchInput from "../common/SearchInput";
import { Link } from "react-router-dom";
import NotifyIcon from "../../assets/notifyIcon.png";

const Navbar = ({ handleSearch }) => {
  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <Breadcrumbs />
        <div className="flex gap-9 px-6 py-6">
          <SearchInput onChangeHandler={handleSearch} />
          <Link to="#">
            <img src={NotifyIcon} alt="notify" width="25px" />
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
