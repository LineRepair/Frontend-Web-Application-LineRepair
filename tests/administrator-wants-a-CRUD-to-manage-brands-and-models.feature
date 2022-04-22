Feature: Administrator wants a CRUD to manage the brands and models that are provided maintenance

    As administrator I want to create a correct CRUD to be able to show it in the application

    Scenario: Administrator adds appliance model
        Given the administrator is in the Add appliance section
        And enter the appliance data
        When you press Add appliance
        Then the system adds the appliance.

    Scenario: Administrator edits appliance model
        Given the administrator is in the Edit Appliance section
        And enter the new appliance data
        When you press Avoid appliance
        Then the system will edit the appliance data.

    Scenario: Administrator deletes appliance model
        Given the administrator is in the Delete appliance section
        And select the appliance to delete
        When you press Remove appliance
        Then the system removes the appliance.