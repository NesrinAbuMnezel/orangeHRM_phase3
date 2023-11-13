import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../support/PageObjects/Login/login-page"
import ManageCandidateStatus from "../../../support/PageObjects/Recruitment/manage-candidate-status-page";
import AddJobTitle from "../../../support/helpers/Admin/add-job-title-helper"
import AddEmployee from "../../../support/helpers/PIM/add-employee-helper"
import AddCandidate from "../../../support/helpers/Recruitment/add-candidate-helper";
import AddVacancy from "../../../support/helpers/Recruitment/add-vacancy-helper";
let empNumber: any
let jobTitleId: any;
let vacancyId: any;
let vacName: any
let candidateId: any
beforeEach(() => {
    cy.visit('/')
    cy.fixture('Login/loginInfo').as('login')
    cy.get('@login').then((loginInfo: any) => {
        LoginPage.loginFunctionality(loginInfo.userName, loginInfo.password)
    })
    cy.fixture('Recruitment/addCandidateInfo').as('candidateInfo')
    cy.get('@candidateInfo').then((info: any) => {
        AddEmployee.addNewEmployeeViaAPI(info.firstName, info.lastName).then((resolve) => {
            empNumber = resolve;
        })
        AddJobTitle.addNewJobViaAPI(info.jobTitle).then((resolve: any) => {
            jobTitleId = resolve;
            AddVacancy.addVacancyViaAPI(empNumber, jobTitleId, info.vacName).then((resolve: any) => {
                [vacancyId, vacName] = resolve;
                //make status Application Initiated
                AddCandidate.addNewCandidateViaAPI(info.date, info.email, info.canFirstName, info.canLastName, vacancyId).then((resolve: any) => {
                    candidateId = resolve
                    // make status Shortlisted
                    AddCandidate.makeShortlisted(resolve)
                    //make status Interview Scheduled
                    AddCandidate.makeInterviewScheduled(resolve, info.date, info.interviewName, empNumber)
                })
            })
        })

    })
})
Given('Log in as an Admin for Scenario 1', () => {
})
When('Access the candidate form', () => {
    cy.visit('/web/index.php/recruitment/viewCandidates')
    //open candidate application stage 
    ManageCandidateStatus.openApplicationStage(vacName)
})
When('Change the candidate status to "Interview Passed"', () => {
    // mark interview passed
    ManageCandidateStatus.ChangeCandidateStatusForPassed()
})
Then('verify the status and the available button options for Interview Passed', () => {
    // verify status
    ManageCandidateStatus.verifyStatusAndButtonsForPassed()
})
Given('Log in as an Admin for Scenario 2', () => {
})
When('Access the candidate form ', () => {
    cy.visit('/web/index.php/recruitment/viewCandidates')
    //open candidate application stage 
    ManageCandidateStatus.openApplicationStage(vacName)
})
When('Change the candidate status to "Interview Failed"', () => {
    // mark interview failed
    ManageCandidateStatus.ChangeCandidateStatusForFailed()
})
Then('verify the status and the available button options for Interview Failed', () => {
    // verify status
    ManageCandidateStatus.verifyStatusAndButtonsForFailed()
})
afterEach(() => {
    AddJobTitle.deleteJobTitleViaAPI([jobTitleId])
    AddEmployee.deleteEmployeeViaAPI([empNumber])
    AddVacancy.deleteVacancyViaAPI([vacancyId])
    AddCandidate.deleteCandidateViaAPI([candidateId])
})