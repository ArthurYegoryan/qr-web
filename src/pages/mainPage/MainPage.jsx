import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import "./MainPage.css";

const MainPage = () => {
    return (
        <div className="main-page">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainPage;