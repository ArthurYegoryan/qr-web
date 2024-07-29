import "./NavLinks.css";
import LinkComponent from "../../../../../../../generalComponents/links/LinkComponent";
import { paths } from "../../../../../../../constants/paths/paths";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
    const role = useSelector((state) => state.auth.role.payload) ?? localStorage.getItem("role");
    const { t } = useTranslation();

    return (
        <nav className="nav-links">
            <ul className="nav-ul">
                <LinkComponent routePath={paths.TERMINALS} 
                               label={t("nav.terminals")} 
                               imageName="img/terminal" 
                               imageType=".svg" />
                <LinkComponent routePath={paths.TRANSACTIONS} 
                               label={t("nav.transactions")}
                               imageName="img/transaction"
                               imageType=".svg" />
                {role === "admin" &&
                    <LinkComponent routePath={paths.USERS} 
                                label={t("nav.users")}
                                imageName="img/users"
                                imageType=".svg" /> 
                }
                {role === "admin" &&
                    <LinkComponent routePath={paths.PAYMENT_SYSTEMS} 
                                label={t("nav.banks")}
                                imageName="img/bank"
                                imageType=".svg" />
                }
                        
            </ul>
        </nav>
    );
};

export default NavLinks;