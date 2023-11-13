import { ICreateVacancyPayload } from "../../../e2e/Api/payload/Recruitment/vacancyPayload"
import GenericHelper from "../../helpers/genericFunctions"
export default class VacancyInit {
    static initVacancy(empNumber: any, jobTitleId: any, vacancyName: any): ICreateVacancyPayload {
        let vacancyPayload: ICreateVacancyPayload = {
            description: "",
            employeeId: empNumber,
            isPublished: true,
            jobTitleId: jobTitleId,
            name: `${vacancyName}${GenericHelper.genericRandomString()}`,
            numOfPositions: null,
            status: true
        }
        return vacancyPayload
    }
}
