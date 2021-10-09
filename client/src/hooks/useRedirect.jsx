import {useHistory} from "react-router-dom";

function useRedirect() {

    const history = useHistory();

    return (url) => {
        history.push(url)
    };
}

export default useRedirect;