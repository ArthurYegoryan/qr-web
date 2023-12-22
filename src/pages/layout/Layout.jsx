import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header>
                <div className="nav-button">
                    
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;