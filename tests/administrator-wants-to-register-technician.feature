Feature: Administrator wants to register appliance maintenance technician

    As an administrator I want to register a technician to be able to have more of them

    Scenario: technician registered with valid email
        Given the administrator wants to register a technician
        And enter valid email and passwords
        When the administrator registers the technician
        Then the system will register a new technician

    Scenario: Technician registered with invalid mail Since the person is in the "Registration" section
        Given the administrator wants to register a technician
        And enter an invalid email and password
        When the administrator registers the technician
        Then the view shows a prompt informing you to try with a valid account.