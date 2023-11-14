import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../support/PageObjects/Login/login-page"
import ChangeStatus from "../../../support/PageObjects/Recruitment/change-candidate-status-page";
import ScheduleInterview from "../../../support/PageObjects/Recruitment/schedule-interview-page";
import UploadFile from "../../../support/PageObjects/Recruitment/upload-file-page";
import AddJobTitle from "../../../support/helpers/Admin/add-job-title-helper"
import AddEmployee from "../../../support/helpers/PIM/add-employee-helper"
import AddCandidate from "../../../support/helpers/Recruitment/add-candidate-helper";
import AddVacancy from "../../../support/helpers/Recruitment/add-vacancy-helper";
let empNumber: any
let jobTitleId: any;
let vacancyId: any;
let vacName: any
let candidateId: any
let pathFile = 'cypress/fixtures/test.txt'
let downloadedFilePath = 'cypress/downloads/test.txt';
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
                })
            })
        })
    })
})
Given('Log in as an Admin for Scenario 1', () => {
})
When('Access the candidate form for that candidate', () => {
    cy.visit('/web/index.php/recruitment/viewCandidates')
    //open candidate application stage 
    UploadFile.openApplicationStage(vacName, 0)
})
When('Enable Edit initiated candidate switch and Upload a txt file to the Resume section', () => {
    // upload file
    UploadFile.uploadTxtFile(pathFile)
})
When('Save the form, Download the uploaded file for initiated status', () => {
    // download file by click on download btn in candidate table
    UploadFile.openApplicationStage(vacName, 2)
})
Then('The uploaded file should contain the same data as was uploaded for initiated status', () => {
    // verify the content 
    UploadFile.verifyFilesContent(downloadedFilePath, pathFile)
})


Given('Log in as an Admin for Scenario 2', () => {
})
When('Access the candidate form for initiated candidate', () => {
    cy.visit('/web/index.php/recruitment/viewCandidates')
    //open candidate application stage 
    UploadFile.openApplicationStage(vacName, 0)
})
When('Change status to  Shortlisted', () => {
    // make status shortlisted
    ChangeStatus.makeShortlistedOrHiredOrPassed()
})
When('Change status to Interview Scheduled', () => {
    //make status Interview Scheduled
    ScheduleInterview.scheduleInterviewDetails()
})
When('Change status to Interview Passed', () => {
    // make status Interview Passed
    ChangeStatus.makeShortlistedOrHiredOrPassed()
})
When('Change status to Job Offered', () => {
    // make status Job Offered
    ChangeStatus.makeStatusOffered()
})
When('Change status to Hired', () => {
    //make status Hired
    ChangeStatus.makeShortlistedOrHiredOrPassed()
})
When('Enable Edit hired candidate switch and Upload a txt file to the Resume section', () => {
    // upload file
    UploadFile.uploadTxtFile(pathFile)
})
When('Save the form, Download the uploaded file for hired status', () => {
    // download file by click on download btn in candidate table
    UploadFile.openApplicationStage(vacName, 2)
})
Then('The uploaded file should contain the same data as was uploaded for hired status', () => {
    // verify the content 
    UploadFile.verifyFilesContent(downloadedFilePath, pathFile)
})
afterEach(() => {
    AddJobTitle.deleteJobTitleViaAPI([jobTitleId])
    AddEmployee.deleteEmployeeViaAPI([empNumber])
    AddVacancy.deleteVacancyViaAPI([vacancyId])
    AddCandidate.deleteCandidateViaAPI([candidateId])
})