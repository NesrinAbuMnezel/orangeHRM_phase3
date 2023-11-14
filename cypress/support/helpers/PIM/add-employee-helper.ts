import { ICreateEmployeeResponse } from "../../../e2e/Api/response/PIM/employeePIMAPIResponse";
import EmployeeInit from "../../init/PIM/employeeInit";
import DeleteInit from "../../init/deleteInit";
let empNumber: any
export const URLs = {
  employee: `/web/index.php/api/v2/pim/employees`,
};
export default class AddEmployee {
  static addNewEmployeeViaAPI(firstName: any, lastName: any) {
    return new Cypress.Promise<ICreateEmployeeResponse>((resolve, reject) => {
      cy.apiCommand("POST", URLs.employee, EmployeeInit.initEmployee(firstName, lastName)).then((response) => {
        empNumber = response.data.empNumber
        resolve(empNumber);
      });
    });
  }

  static deleteEmployeeViaAPI(id: any) {
    cy.apiCommand('DELETE', URLs.employee, DeleteInit.initDelete(id))
  }
}
