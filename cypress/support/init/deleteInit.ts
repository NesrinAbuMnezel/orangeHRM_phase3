import { IDeletePayload } from "../../e2e/Api/payload/deletePayload"
export default class DeleteInit {
    static initDelete(id: any): IDeletePayload {
        let deletePayload: IDeletePayload = {
            ids: id
        }
        return deletePayload
    }
}
