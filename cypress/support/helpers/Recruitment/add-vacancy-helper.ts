import DeleteInit from "../../init/deleteInit";
import VacancyInit from "../../init/Recruitment/vacancyInit";
let vacancyId: any;
let vacName: any
export const URLs = {
    vacancy: `/web/index.php/api/v2/recruitment/vacancies`,
}
export default class AddVacancy {
    static addVacancyViaAPI(empNumber: any, jobTitleId: any, vacancyName: any) {
        return new Cypress.Promise((resolve, reject) => {
            cy.apiCommand('POST', URLs.vacancy, VacancyInit.initVacancy(empNumber, jobTitleId, vacancyName)).then((response) => {
                vacancyId = response.data.id
                vacName = response.data.name
                resolve([vacancyId, vacName])
            })
        })
    }
    static deleteVacancyViaAPI(id: any) {
        cy.apiCommand('DELETE', URLs.vacancy, DeleteInit.initDelete(id))
    }
}


