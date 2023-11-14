export default class ChangeStatus {
    static elements = {
        saveFileBtn: () => cy.get('.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space'),
        successBtn:()=>cy.get('.oxd-button.oxd-button--medium.oxd-button--success')
    }

    static makeShortlistedOrHiredOrPassed() {
        this.elements.successBtn().click({force:true})
        this.elements.saveFileBtn().click()

    }
    static makeStatusOffered() {
        this.elements.successBtn().eq(1).click({force:true})
        this.elements.saveFileBtn().click()

    }
}


