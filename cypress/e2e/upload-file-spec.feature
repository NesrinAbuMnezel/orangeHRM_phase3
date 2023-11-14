Feature:  Verify that the user can upload a txt file for Application Initiated and Hired statuses

    Scenario: Verify that the user can upload a txt file for Application Initiated status
        Given Log in as an Admin for Scenario 1
        When Access the candidate form for that candidate
        And Enable Edit initiated candidate switch and Upload a txt file to the Resume section
        And Save the form, Download the uploaded file for initiated status
        Then The uploaded file should contain the same data as was uploaded for initiated status

    Scenario: Verify that the user can upload a txt file for Hired status
        Given Log in as an Admin for Scenario 2
        When Access the candidate form for initiated candidate
        And Change status to  Shortlisted
        And Change status to Interview Scheduled
        And Change status to Interview Passed
        And Change status to Job Offered
        And Change status to Hired
        And Enable Edit hired candidate switch and Upload a txt file to the Resume section
        And Save the form, Download the uploaded file for hired status
        Then The uploaded file should contain the same data as was uploaded for hired status
