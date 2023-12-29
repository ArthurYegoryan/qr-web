import { useSelector } from "react-redux";
import LinkComponent from "../../../../../../../generalComponents/links/LinkComponent";
import "./NavLinks.css";

const NavLinks = () => {
    const { username } = useSelector((state) => state.auth);

    return (
        <nav className="nav-links">
            <ul>
                <LinkComponent routePath="/terminals" 
                               label="Տերմինալներ" 
                               imageName="terminal" 
                               imageType=".svg" />
                <LinkComponent routePath="/transactions" 
                               label="Գործարքներ"
                               imageName="transaction"
                               imageType=".svg" />
                {username === "admin" && 
                    <LinkComponent routePath="/users" 
                                   label="Օգտագործողներ"
                                   imageName="users"
                                   imageType=".svg" />
                }
            </ul>
        </nav>
    );
};

export default NavLinks;