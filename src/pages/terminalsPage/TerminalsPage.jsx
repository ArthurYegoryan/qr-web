import { useSelector } from "react-redux";
import { loadTerminals } from "../../redux/slices/terminals/terminals";

const TerminalsPage = () => {
    const token = useSelector((state) => state.auth);

    try {
        loadTerminals(token);
    } catch(err) {
        
    }

    return (
        <div>
            <h1>
                Terminals Page
            </h1>
        </div>
    );
};

export default TerminalsPage;