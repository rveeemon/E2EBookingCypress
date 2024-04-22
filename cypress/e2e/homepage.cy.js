import {signInAuth} from "./pages/auth"

const signIn = new signInAuth()

describe('CURA Homepage', () => {

    Cypress.on('uncaught:exception', (err, runnable) => { return false })

    var uName
    var pWord

    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('https://katalon-demo-cura.herokuapp.com/')
    })

    context('Homepage confirmation', () => {

        /*
            Log in screen must not be displayed upon opening.
        */
        it('Make sure that the Log in screen is not in the homepage', () => {
            cy.url().should('include', '/')
            cy.contains('Login').should('be.hidden')
            cy.contains('Username').should('not.exist')
            cy.contains('Password').should('not.exist')
        })

        /*
            User must be displayed with the menu when menu button is clicked.
        */
        it('Make sure that the menu can be opened by the user', () => {
            cy.url().should('include', '/')
            cy.get('#menu-toggle').click()
            cy.contains('Home').should('exist')
            cy.contains('Login').should('exist')
        })

        /*
            User must be displayed with the name, address, email, and the contact number.
        */
        it('Name, address, email, and the contact number must be displayed to the user', () => {
            cy.url().should('include', '/')
            cy.contains('CURA Healthcare Service').should('exist')
            cy.contains('Atlanta 550 Pharr Road NE Suite 525').should('exist')
            cy.contains('(678) 813-1KMS').should('exist')
            cy.contains('info@katalon.com').should('exist')
        })

    })

    context('Clicking the Make Appointment', () => {
        
        it('Clicking the Make appointment must redirect the user to the Log in Page', () => {
            cy.contains('Make Appointment').click()
            cy.url().should('include', '/profile.php#login')
            cy.contains('Username').should('exist')
            cy.contains('Password').should('exist')
        })

        /*
            User must not be able to log in using incorrect creds.
        */
        it('User must not be able to log in with incorrect username and password.', () => {
            uName = "Joe"
            pWord = "Hanzo"
            cy.contains('Make Appointment').click()
            cy.url().should('include', '/profile.php#login')
            signIn.enterUserName(uName)
            signIn.enterPassword(pWord)
            cy.get('#btn-login').click()
    
            cy.xpath("//p[contains(.,'Login failed! Please ensure the username and password are valid.')]")
            .wait(500)  
            .should('be.visible')
        })

        /*
            User must be able to log in with correct creds
        */
       it.only('User must be able to log in with correct creds', () => {
           uName = "John Doe"
           pWord = "ThisIsNotAPassword"
           signIn.signInCorrectSession(uName,pWord)
       })

    })


})