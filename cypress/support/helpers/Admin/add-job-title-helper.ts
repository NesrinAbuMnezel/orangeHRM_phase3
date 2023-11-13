import JobtitleInit from "../../init/Admin/jobTitleInit";
import DeleteInit from "../../init/deleteInit";
let jobTitleId: number;
export const URLs = {
    jobs: `/web/index.php/api/v2/admin/job-titles`,
}
export default class AddJobTitle {
    static addNewJobViaAPI(jobTitle: any) {
        return new Cypress.Promise((resolve, reject) => {
            cy.apiCommand('POST', URLs.jobs, JobtitleInit.initJobTitle(jobTitle)).then((response) => {
                jobTitleId = response.data.id
                resolve(jobTitleId);
            })
        })
    }
    static deleteJobTitleViaAPI(id: any) {
        cy.apiCommand('DELETE', URLs.jobs, DeleteInit.initDelete(id))
    }
}


