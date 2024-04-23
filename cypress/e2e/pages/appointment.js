import dayjs from 'dayjs'

var facility
var readmission
var hcareProgram
var dateDay = (dayjs().format('DD'))
var comment
var completeDate = (dayjs().format('DD/MM/YYYY'))

export class makeAppoint {

    /*
        Enters the username in the textbox
    */
    makeAppointment(facility, readmission, hcareProgram, dateDay, comment){
        cy.get('#combo_facility').select(facility)

        if(readmission == 1){
            cy.get('#chk_hospotal_readmission').check()
        }
        
        cy.get('[name="programs"]').check(hcareProgram)        

        if(dateDay != null) {
            cy.get('#txt_visit_date').click()
            cy.get('table').contains('td', dateDay).click()
        }
        
        cy.get('#txt_comment').type(comment)

        cy.get('#btn-book-appointment').click()   
        
        cy.log(dateDay)

        if(dateDay != null){
            //Appointment confirmation and History
            cy.contains(facility).should('exist')

            cy.get('#menu-toggle > .fa').click()

            cy.contains('History').click()

            cy.contains(facility).should('exist')
    
            cy.contains(hcareProgram).should('exist')
    
            cy.contains(comment).should('exist')

            cy.contains(completeDate).should('exist')
        }
        
        
    }

}