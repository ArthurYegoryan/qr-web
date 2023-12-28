import LogoComponent from "../../../../../../generalComponents/logoComponent/LogoComponent";
import NavLinks from "./navLinks/NavLinks";
import "./NavBar.css";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <LogoComponent />
            <NavLinks />
        </div>
    );
};

export default NavBar;