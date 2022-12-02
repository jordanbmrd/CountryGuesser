import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SetBackground = () => {
    const location = useLocation();
    useEffect(() => {
        document.body.style.backgroundColor = location.pathname != '/game' ? "black !important" : "#efeff0";
    }, [location.pathname]);

    return null;
}

export default SetBackground;