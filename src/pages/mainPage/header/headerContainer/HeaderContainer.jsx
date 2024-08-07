// import NavSection from "./navSection/NavSection";
import UserSection from "./userSection/UserSection";
import SideBar from "../../../../generalComponents/sideBar/SideBar";
import "./HeaderContainer.css";

const HeaderContainer = () => {
    return (
        <div className="header-container">
            {/* <NavSection /> */}
            <SideBar />
            <UserSection />
        </div>
    );
};

export default HeaderContainer;