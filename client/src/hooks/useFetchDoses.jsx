import {useQuery} from "react-query";
import {useEffect, useState} from "react";

function useFetchDoses() {

    const [data, setData] = useState({});

    const { error, isSuccess, data: dosesToShow } = useQuery('dosesData', () =>
            fetch('/account/getDoses').then(res => res.json()).then(async body => {
                if (!body.success) throw Error("Something went wrong. Please relogin")
                return body.doses;
            }),
        {
            retry: false,
            initialData: [],
            refetchOnWindowFocus: false,
            refetchInterval: false
        }
    )

    useEffect(() => {
        setData(dosesToShow.reduce((p, c) => {
            p[c.id] = { id: c.id, name: c.name, date: "", enabled: c.taken };
            return p;
        }, {}));
    }, [dosesToShow])


    return [data, setData, isSuccess, error]
}

export default useFetchDoses;