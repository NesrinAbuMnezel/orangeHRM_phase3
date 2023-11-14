import { ICreateCandidatePayload } from "../../../e2e/Api/payload/Recruitment/candidatePayload"
import { ICreateInterviewPayload } from "../../../e2e/Api/payload/Recruitment/interviewScheduledPayload"
import GenericHelper from "../../helpers/genericFunctions"

export default class CandidateInit {
    static initCandidate(date: any, email: any, firstName: any, lastName: any, vacancyId: any): ICreateCandidatePayload {
        let createCandidatePayload: ICreateCandidatePayload = {
            comment: null,
            consentToKeepData: false,
            contactNumber: null,
            dateOfApplication: date,
            email: `${email}${GenericHelper.genericRandomString()}@test.com`,
            firstName: `${firstName}${GenericHelper.genericRandomString()}`,
            keywords: null,
            lastName: `${lastName}${GenericHelper.genericRandomString()}`,
            middleName: null,
            vacancyId: vacancyId
        }
        return createCandidatePayload
    }
    static shortlistCandidate(): any {
        let createCandidatePayload = {
            note: null
        }
        return createCandidatePayload
    }
    static interviewScheduledCandidate(date: any, interviewName: any, empNum: any): ICreateInterviewPayload {
        let InterviewPayload: ICreateInterviewPayload = {
            interviewDate: date,
            interviewName: `${interviewName}${GenericHelper.genericRandomString()}`,
            interviewTime: null,
            interviewerEmpNumbers: [empNum],
            note: null
        }
        return InterviewPayload
    }
}
