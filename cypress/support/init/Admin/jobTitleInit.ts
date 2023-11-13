import { ICreateJobTitlePayload } from '../../../e2e/Api/payload/Admin/jobTitlePayload'
import GenericHelper from '../../helpers/genericFunctions'
export default class JobtitleInit {
    static initJobTitle(jobTitle: any): ICreateJobTitlePayload {
        let createJobTitlePayload: ICreateJobTitlePayload = {
            description: "",
            note: "",
            specification: null,
            title: `${jobTitle}${GenericHelper.genericRandomString()}`
        }
        return createJobTitlePayload
    }
}
