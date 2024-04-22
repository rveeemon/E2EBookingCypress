import {signInAuth} from "./pages/auth"

const signIn = new signInAuth()

describe('CURA Homepage', () => {

    Cypress.on('uncaught:exception', (err, runnable) => { return false })

    var uName
    var pWord

    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('/')
    })

    context.only('Open Profile', () => {

        it('Open Profile', () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            signIn.signInCorrectwithoutSession(uName, pWord)
            cy.contains('Profile').click()
            cy.contains('Under construction.').should('exist')
            
        })

        it('User must be able to log out from Profile page', () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            signIn.signInCorrectwithoutSession(uName, pWord)
            cy.contains('Profile').click()
            cy.contains('Under construction.').should('exist')
            cy.get(':nth-child(3) > .btn').click()
            cy.get('#menu-toggle > .fa').click()
            cy.contains('Login').should('exist')
        })

        it('User must be able to log in again', () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            signIn.signInCorrectwithoutSession(uName, pWord)
            cy.contains('Profile').click()
            cy.contains('Under construction.').should('exist')
            cy.get(':nth-child(3) > .btn').click()
            cy.get('#menu-toggle > .fa').click()
            cy.contains('Login').should('exist')
            cy.contains('Login').click()
            signIn.signInCorrectwithoutSession(uName, pWord)
        })

    })


})