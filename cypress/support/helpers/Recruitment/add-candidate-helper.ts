import CandidateInit from "../../init/Recruitment/candidateInit";
import DeleteInit from "../../init/deleteInit";

let Id: number;
export const URLs = {
    candidates: `/web/index.php/api/v2/recruitment/candidates`,
}
export default class AddCandidate {

    static addNewCandidateViaAPI(date: any, email: any, firstName: any, lastName: any, vacancyId: any) {
        return new Cypress.Promise((resolve, reject) => {
            cy.apiCommand('POST', URLs.candidates, CandidateInit.initCandidate(date, email, firstName, lastName, vacancyId)).then((response) => {
                Id = response.data.id
                resolve(Id)
            })
        })
    }
    static makeShortlisted(id: string) {
        cy.apiCommand('PUT', `/web/index.php/api/v2/recruitment/candidates/${id}/shortlist`, CandidateInit.shortlistCandidate())
    }
    static makeInterviewScheduled(id: string, date: any, interviewName: any, empNum: any) {
        cy.apiCommand('POST', `/web/index.php/api/v2/recruitment/candidates/${id}/shedule-interview`, CandidateInit.interviewScheduledCandidate(date, interviewName, empNum))
    }
    static deleteCandidateViaAPI(id: any) {
        cy.apiCommand('DELETE', URLs.candidates, DeleteInit.initDelete(id))
    }



}


