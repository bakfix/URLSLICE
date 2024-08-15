import { Avatar, Dropdown, Navbar } from "flowbite-react";
import UserIcon from "../images/navbarpic.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import User from "../images/user.png";

const AppNavBar = (props) => {
  let navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, name, setName, email, setEmail } = props;

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    navigate("/login");
    toast.success("Вы вышли из аккаунта");
  };

  return (
    <Navbar fluid>
      <Navbar.Brand href="https://github.com/bakfix/URLSLICE.git">
        <img src="User Icon" width="100" height="100" alt="Flowbite React Logo" src={UserIcon} className="mr-3 h-6 sm:h-10 rounded-lg" />
                <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
          DELTA Short Link
        </span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default AppNavBar;
