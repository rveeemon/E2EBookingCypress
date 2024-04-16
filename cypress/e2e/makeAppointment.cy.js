import {signInAuth} from "./pages/auth"
import {makeAppoint} from "./pages/appointment"
import dayjs from 'dayjs'

const signIn = new signInAuth()
const createAppoint = new makeAppoint


describe('CURA Make an Appointment', () => {

    Cypress.on('uncaught:exception', (err, runnable) => { return false })

    var uName
    var pWord
    var dateNow
    var facility
    var readmission
    var hcareProgram
    var comment

    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('https://katalon-demo-cura.herokuapp.com/')
    })

    context('Make an Appointment on all Facilities', () => {
        
        it('Tokyo CURA Healthcare Center', () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Tokyo CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment)            
        })

        it('Hongkong CURA Healthcare Center', () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Hongkong CURA Healthcare Center'
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility 
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
        })

        it('Seoul CURA Healthcare Center', () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Seoul CURA Healthcare Center'
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
        })
        
    })

    context('Hospital Readmission', () => {

        it('Apply for Readmission', () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Seoul CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="hospital_readmission"]').contains('Yes')
        })

        it(`Don't apply for readmission`, () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 0
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="hospital_readmission"]').contains('No')
        })

    })

    context('Healthcare Program', () => {

        it(`Medicare`, () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicare'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + hcareProgram
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="program"]').contains(hcareProgram)
        })

        it(`Medicaid`, () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + hcareProgram
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="program"]').contains(hcareProgram)
        })

        it(`None`, () => {
            uName = "John Doe"
            pWord = "ThisIsNotAPassword"
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'None'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + hcareProgram
            dateNow = (dayjs().format('DD'))
            signIn.signInCorrect(uName, pWord)
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="program"]').contains(hcareProgram)
        })

    })
})