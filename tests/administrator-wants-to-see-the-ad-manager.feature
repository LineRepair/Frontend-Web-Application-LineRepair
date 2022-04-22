Feature: Administrator wants to see the ad manager

    As an administrator I want to see the ad manager to be able to review the ads that the user sees

    Scenario: Ads displayed
        Given the admin is in the section manage announcements
        And edit the ads that are seen
        When you publish the ad
        Then the system will show users the ads you have chosen