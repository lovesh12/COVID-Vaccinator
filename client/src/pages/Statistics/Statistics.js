import React, {useState} from "react";

import "./Statistics.css";
import PageContent from "../../components/Page/PageContent";

import Page from "../../components/Page/Page";
import Card from "../../components/Card/Card";
import PageSection from "../../components/Page/PageSection";
import ButtonGroup from "../../components/Button/ButtonGroup";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { AiOutlineSearch } from "react-icons/all";

import syringeImg from "../../Syringe2.png";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import DoseDataCount from "./DoseDataCount";
import {useQuery} from "react-query";
import getDate from "../../util/getDate";
import numberWithCommas from "../../util/numberWithCommas";
import ByGender from "./Charts/ByGender";
import ByVaccine from "./Charts/ByVaccine";
import ByAge from "./Charts/ByAge";
import Dropdown from "../../components/Dropdown/Dropdown";
import states from "../../config/states";
// import states from "../../config/states";

function Statistics(props) {

    const [state, setState] = useState(0);
    const [district, setDistrict] = useState(0);

    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([])
    const [centreList, setCentreList] = useState([]);

    const { error, isSuccess, data } = useQuery(['statistics', state, district], () =>
            fetch(`https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=${state ? state : ""}&district_id=${district ? district : ""}&date=${getDate()}`).then(res => res.json()).then(async body => {
                console.log(body)
                if (state === 0) {
                    console.log("Changing statelist")
                    setStateList(body.getBeneficiariesGroupBy)
                }
                else if (district === 0) {
                    console.log("Changing districtlist")
                    setDistrictList(body.getBeneficiariesGroupBy)
                }
                else if (district !== 0 && state !== 0) {
                    console.log("Changing centrelist")
                    setCentreList(body.getBeneficiariesGroupBy)
                }
                return body;
            }),
        {
            retry: false,
            refetchOnWindowFocus: false,
            refetchInterval: true,
            keepPreviousData: true
        }
    )

    const changeState = (id) => {
        setDistrict(0);
        stateList.forEach((lState, i) => {
            if (lState.state_id === id) {
                setState(i);
                return;
            }
        })

    }

    const changeDistrict = (id) => {
        console.log("district " + id)
        districtList.forEach((lDistrict, i) => {
            if (lDistrict.district_id === id) {
                console.log(lDistrict)
                setDistrict(i)
                return;
            }
        })
    }

    return (
        <Page className={"statistics"}>
            <PageContent>
                {isSuccess &&
                <>
                    <PageSection>
                        <Card className={"short-stats"}>
                            <h3>Vaccinations Today</h3>
                            <p>{numberWithCommas(data.topBlock.vaccination.today)}</p>
                        </Card>
                        <Card className={"short-stats"}>
                            <h3>Partially Vaccinations Today</h3>
                            <p>{numberWithCommas(data.topBlock.vaccination.today_dose_one)}</p>
                        </Card>
                        <Card className={"short-stats"}>
                            <h3>Fully Vaccinations Today</h3>
                            <p>{numberWithCommas(data.topBlock.vaccination.today_dose_two)}</p>
                        </Card>
                    </PageSection>
                    <ButtonGroup className={"search-btns"} center>
                        <Dropdown label={"Select State"} options={stateList} selected={state} onChange={changeState} labelKey={"title"} idKey={"state_id"}/>
                        <Dropdown label={"Select District"} options={districtList} selected={district} onChange={changeDistrict} labelKey={"title"} idKey={"district_id"} />
                    </ButtonGroup>
                    <Card className={"total-doses"}>
                        <CardHeader>
                            <img src={syringeImg} alt={"syringe-img"} />
                            <div className="card-heading">
                                <h2>Total Vaccination Doses</h2>
                                <p>{numberWithCommas(data.topBlock.vaccination.total)}</p>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <DoseDataCount type={1} count={numberWithCommas(data.topBlock.vaccination.tot_dose_1)} />
                            <DoseDataCount type={2} count={numberWithCommas(data.topBlock.vaccination.tot_dose_2)} />
                        </CardBody>
                    </Card>
                    <PageSection className={"vaccination-categories"}>
                        <Card className={"vaccination-categories-cars"}>
                            <h3>Vaccination - Category</h3>
                            <ByGender data={data.topBlock.vaccination} />
                            <br />
                            <ByVaccine data={data.topBlock.vaccination} />
                        </Card>
                        <Card className={"vaccination-categories-cars"}>
                            <h3>Vaccination - Age</h3>
                            <ByAge data={data.vaccinationByAge} />
                        </Card>
                        <Card className={"vaccination-categories-cars table-stats"}>
                            <h3>Vaccination - State/Centres</h3>
                            <table cellPadding="20px">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>State/UT</th>
                                        <th>Today</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.getBeneficiariesGroupBy.map((beneficiary) =>
                                        (<tr>
                                            <td colSpan={2}>{beneficiary.title}</td>
                                            <td>{beneficiary.today}</td>
                                            <td>{beneficiary.total}</td>
                                        </tr>)
                                    )}
                                </tbody>
                            </table>
                        </Card>
                    </PageSection>
                    {/*<Card className={"more-stats"}>*/}
                    {/*    <h3>More Stats</h3>*/}
                    {/*</Card>*/}
                </>}
            </PageContent>
        </Page>
    );
}

export default Statistics;
