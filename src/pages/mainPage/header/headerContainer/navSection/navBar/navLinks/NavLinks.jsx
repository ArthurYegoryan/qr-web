import { useSelector } from "react-redux";
import LinkComponent from "../../../../../../../generalComponents/links/LinkComponent";
import "./NavLinks.css";

const NavLinks = () => {
    const { username } = useSelector((state) => state.auth);

    return (
        <nav className="nav-links">
            <ul>
                <LinkComponent routePath="/terminals" label="Տերմինալներ" imageName="terminal" />
                <LinkComponent routePath="/transactions" label="Գործարքներ" />
                {username === "admin" && 
                    <LinkComponent routePath="/users" label="Օգտագործողներ" />
                }
            </ul>
        </nav>
    );
};

export default NavLinks;