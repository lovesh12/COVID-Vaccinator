import {useState} from "react";
import {useQuery} from "react-query";

function useStateDistrictLists() {
    const [state, setState] = useState({i:-1, id: 0});
    const [district, setDistrict] = useState({i:-1, id: 0});

    const {isSuccess: sIsSuccess, data: stateList } = useQuery('getStates', () =>
            fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states").then(res => res.json()).then(async body => {
                console.log(body);
                return body.states;
            }),
        {
            retry: false,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            keepPreviousData: true
        }
    )

    const {isSuccess: dIsSuccess, data: districtList } = useQuery(['getDistricts', state], () =>
            fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+state.id).then(res => res.json()).then(async body => {
                console.log(body);
                return body.districts;
            }),
        {
            retry: true,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            keepPreviousData: true
        }
    )

    const changeState = (id) => {
        stateList.forEach((state, i) => {
            if (state.state_id === id) {
                setState({i, id})
                return;
            }
        })
        setDistrict({i: -1, id: 0})
    }

    const changeDistrict = (id) => {
        districtList.forEach((state, i) => {
            if (state.district_id === id) {
                setDistrict({i, id})
                return;
            }
        })
    }

    return [state, district, stateList, districtList, sIsSuccess, dIsSuccess, changeState, changeDistrict];
}

export default useStateDistrictLists;