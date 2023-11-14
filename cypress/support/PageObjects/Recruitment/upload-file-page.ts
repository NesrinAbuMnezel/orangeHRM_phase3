export default class UploadFile {
    static elements = {
        mainTable: () => cy.get('.oxd-table'),
        tableBody: () => cy.get('.oxd-table-body'),
        tableHeader: () => cy.get('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th'),
        uploadedFile: () => cy.get('input[type="file"]'),
        saveFileBtn: () => cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space'),
        candidteBtn:()=>cy.get('.oxd-topbar-body-nav-tab-item'),
        switchBtn:()=>cy.get('.oxd-switch-input.oxd-switch-input--active.--label-left')
    }
    static openApplicationStage(name: any,actionIndex:any) {
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
                                            cy.get(`.oxd-table-card:eq(${index})`).find(`.oxd-table-cell.oxd-padding-cell:eq(${columnCount - 1}) > .oxd-table-cell-actions > .oxd-icon-button.oxd-table-cell-action-space `).eq(actionIndex).click({force:true});
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
    static uploadTxtFile(path:string){
        this.elements.switchBtn().click({force:true})
            this.elements.uploadedFile().selectFile(path, { force: true })
            this.elements.saveFileBtn().click({force:true})
            this.elements.candidteBtn().eq(0).click()
    }
    static verifyFilesContent(downloadedFilePath:any,expectedDataFilePath:any){
cy.readFile(downloadedFilePath).then((downloadedFileContent) => {
  cy.readFile(expectedDataFilePath).then((expectedData) => {
    cy.wrap(downloadedFileContent).should('eq', expectedData);
  });
});

    }
}


