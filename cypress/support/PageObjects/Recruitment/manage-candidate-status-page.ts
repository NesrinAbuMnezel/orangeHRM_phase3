export default class ManageCandidateStatus {
    static elements = {
        mainTable: () => cy.get('.oxd-table'),
        tableBody: () => cy.get('.oxd-table-body'),
        tableHeader: () => cy.get('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th'),
        makeInterviewPassedBtn: () => cy.get('.oxd-button.oxd-button--medium.oxd-button--success'),
        makeInterviewFailedBtn: () => cy.get('.oxd-button.oxd-button--medium.oxd-button--danger'),
        saveBtn: () => cy.get('[type=submit]'),
        candidateStatus: () => cy.get('.oxd-text.oxd-text--p.oxd-text--subtitle-2'),
    }
    static openApplicationStage(name: any) {
        cy.fixture('Recruitment/addCandidateInfo').as('info')
        cy.get('@info').then((info: any) => {
            const dataToAssert = [{ key: info.key, value: name }];
            let columnCount: any;
            let shouldExit = true; // Flag to control function exit
            this.elements.mainTable().find('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th').its('length').then((count) => {
                columnCount = count;
            })
            const columnName = dataToAssert[0].key;
            let indexnum: any;
            this.elements.tableHeader().each((th, mindex) => {
                cy.wrap(th).invoke('text').then((text: any) => {
                    indexnum = text.indexOf('AscendingDescending')
                    if (indexnum != -1) {
                        text = text.slice(0, indexnum);
                    }
                    if (text === columnName) {
                        this.elements.tableBody().find(".oxd-table-card").each((th, index) => {
                            cy.wrap(th).then(() => {
                                if (shouldExit == true) {
                                    cy.get(`.oxd-table-card:eq(${index})`).find(`.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`).invoke('text').then((text: any) => {
                                        if (text == dataToAssert[0].value) {
                                            cy.get(`.oxd-table-card:eq(${index})`).find(`.oxd-table-cell.oxd-padding-cell > div:eq(${mindex})`).should('have.text', dataToAssert[0].value)
                                            cy.get(`.oxd-table-card:eq(${index})`).find(`.oxd-table-cell.oxd-padding-cell:eq(${columnCount - 1}) > .oxd-table-cell-actions > .oxd-icon-button.oxd-table-cell-action-space `).eq(0).click({ force: true });
                                            shouldExit = false; // Set the flag to true to exit the function
                                        }
                                    })
                                }
                            })
                        })
                    }
                });
            });

        })
    }
    static ChangeCandidateStatusForPassed() {
        this.elements.makeInterviewPassedBtn().click({ force: true })
        this.elements.saveBtn().click()

    }
    static verifyStatusAndButtonsForPassed() {
        this.elements.candidateStatus().should('have.text', 'Status: Interview Passed')
        this.elements.makeInterviewFailedBtn().should('have.text', ' Reject ')
        this.elements.makeInterviewPassedBtn().should('contain', ' Schedule Interview ')
        this.elements.makeInterviewPassedBtn().should('contain', ' Offer Job ')
    }
    static ChangeCandidateStatusForFailed() {
        this.elements.makeInterviewFailedBtn().eq(1).click({ force: true })
        this.elements.saveBtn().click()

    }
    static verifyStatusAndButtonsForFailed() {
        this.elements.candidateStatus().should('have.text', 'Status: Interview Failed')
        this.elements.makeInterviewFailedBtn().should('have.text', ' Reject ')
    }
}


