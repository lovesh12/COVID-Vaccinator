import React from "react";

import "./Statistics.css";
import PageContent from "../../components/Page/PageContent";

import Page from "../../components/Page/Page";
import Card from "../../components/Card/Card";
import PageSection from "../../components/Page/PageSection";
import ButtonGroup from "../../components/Button/ButtonGroup";

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
import useStateDistrictLists from "../../hooks/useStateDistrictLists";

function Statistics(props) {

    const [state, district, stateList, districtList, sIsSuccess, dIsSuccess, changeState, changeDistrict] = useStateDistrictLists();

    const { isSuccess, data } = useQuery(['statistics', state, district], () =>
            fetch(`https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=${state.id ? state.id : ""}&district_id=${district.id ? district.id : ""}&date=${getDate(1)}`).then(res => res.json()).then(async body => {
                console.log(body)
                return body;
            }),
        {
            retry: false,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            keepPreviousData: true
        }
    )


    return (
        <Page className={"statistics"}>
            <PageContent>
                {isSuccess && sIsSuccess && dIsSuccess &&
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
                        <Dropdown label={"Select State"} options={stateList} selected={state.i} onChange={changeState} labelKey={"state_name"} idKey={"state_id"}/>
                        <Dropdown label={"Select District"} options={districtList} selected={district.i} onChange={changeDistrict} labelKey={"district_name"} idKey={"district_id"}/>
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
