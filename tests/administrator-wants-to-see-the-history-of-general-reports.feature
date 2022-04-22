Feature: Administrator wants to see the history of general reports

    As an administrator I want to see the report history of all the technicians to be able to review the reports they made

    Scenario: Reports displayed
        Given the administrator wants to see reports
        When you are in the reports section
        Then the system will show you the history of general reports of the technicians