class LoginPage{
    static elements = {
        userName: () => cy.get('[placeholder="Username"]'),
        password: () => cy.get('[placeholder="Password"]'),
        loginBtn: () => cy.get('button'),
        sideBarItems:()=>cy.get('.oxd-topbar-header-breadcrumb-module')
    }
    static loginFunctionality(userName: string, password: string) {
        this.elements.userName().type(userName);
        this.elements.password().type(password);
        this.elements.loginBtn().click();
        this.elements.sideBarItems().should('contain','Dashboard');
    }
}
export default LoginPage