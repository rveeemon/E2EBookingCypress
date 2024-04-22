import {signInAuth} from "./pages/auth"
import {makeAppoint} from "./pages/appointment"
import dayjs from 'dayjs'

const signIn = new signInAuth()
const createAppoint = new makeAppoint


describe('CURA Make an Appointment', () => {

    Cypress.on('uncaught:exception', (err, runnable) => { return false })

    var uName = 'John Doe'
    var pWord = 'ThisIsNotAPassword'
    var dateNow
    var facility
    var readmission
    var hcareProgram
    var comment

    beforeEach(() => {
        cy.viewport('macbook-13')
        signIn.signInCorrect(uName,pWord)
    })

    context('Make an Appointment on all Facilities', () => {
        
        it('Tokyo CURA Healthcare Center', () => {
            cy.visit('/')
            facility = 'Tokyo CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment)            
        })

        it('Hongkong CURA Healthcare Center', () => {
            cy.visit('/')
            facility = 'Hongkong CURA Healthcare Center'
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility 
            dateNow = (dayjs().format('DD'))
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
        })

        it('Seoul CURA Healthcare Center', () => {
            cy.visit('/')
            facility = 'Seoul CURA Healthcare Center'
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
        })
        
    })

    context('Hospital Readmission', () => {

        it.only('Apply for Readmission', () => {
            cy.visit('/')
            facility = 'Seoul CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))            
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="hospital_readmission"]').contains('Yes')
        })

        it(`Don't apply for readmission`, () => {
            cy.visit('/')
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 0
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + facility
            dateNow = (dayjs().format('DD'))            
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="hospital_readmission"]').contains('No')
        })

    })

    context('Healthcare Program', () => {

        it(`Medicare`, () => {
            cy.visit('/')
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicare'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + hcareProgram
            dateNow = (dayjs().format('DD'))
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="program"]').contains(hcareProgram)
        })

        it(`Medicaid`, () => {
            cy.visit('/')
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicaid'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + hcareProgram
            dateNow = (dayjs().format('DD'))
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="program"]').contains(hcareProgram)
        })

        it(`Medicare`, () => {
            cy.visit('/')
            facility = 'Hongkong CURA Healthcare Center'
            readmission = 1
            hcareProgram = 'Medicare'
            comment = 'Lorem Ipsum Dolor Sit Amet ' + hcareProgram
            dateNow = (dayjs().format('DD'))
            cy.url('include', '#appointment')
            createAppoint.makeAppointment(facility, readmission, hcareProgram, dateNow, comment) 
            cy.contains('Apply for hospital readmission').should('exist')
            cy.get('p[id="program"]').contains(hcareProgram)
        })

    })
})