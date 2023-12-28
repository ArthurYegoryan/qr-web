import NavBar from "./navBar/NavBar";
import NavButton from "./navButton/NavButton";
import "./NavSection.css";

const NavSection = () => {
    return (
        <div className="nav-section">
            <NavBar />
            <NavButton />
        </div>
    );
};

export default NavSection;