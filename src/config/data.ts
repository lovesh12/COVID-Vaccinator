import { VaccineType } from "../controllers/user";

interface IvaccineDueDays {
    [key: number]: number;
}

export const vaccineDueDays: IvaccineDueDays = {
    [VaccineType.COVISHIELD]: 84,
    [VaccineType.COVAXIN]: 52,
};
