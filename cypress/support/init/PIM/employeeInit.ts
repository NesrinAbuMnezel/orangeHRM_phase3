import { ICreateEmployeePayload } from "../../../e2e/Api/payload/PIM/employeePayload";
import GenericHelper from "../../helpers/genericFunctions";
export default class EmployeeInit {
  static initEmployee(firstName: any, lastName: any): ICreateEmployeePayload {
    let createEmployeePayload: ICreateEmployeePayload = {
      empPicture: null,
      employeeId: `${GenericHelper.genericRandomString()}`,
      firstName: firstName,
      lastName: lastName,
      middleName: " ",
    };
    return createEmployeePayload;
  }
}
