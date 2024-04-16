var uName
var pWord

export class signInAuth {
    
    uName_textbox = "//input[@id='txt-username']"
    pWord_textbox = "//input[@id='txt-password']"

    /*
        Enters the username in the textbox
    */
    enterUserName(username){
        cy.xpath(this.uName_textbox).type(username)
    }

    /*
        Enters the password in the textbox
    */
    enterPassword(password){
        cy.xpath(this.pWord_textbox).type(password)
    }

    /*
        Sign In with Correct Credentials
    */
   signInCorrect(uName,pWord){
        cy.url().should('eq', 'https://katalon-demo-cura.herokuapp.com/')
        
        cy.get('#menu-toggle > .fa').click()

        cy.contains('Login').should('be.visible').click()

        cy.url().should('include','/profile.php#login')

        this.enterUserName(uName)
        this.enterPassword(pWord)

        cy.get('#btn-login').click()

        cy.get('#menu-toggle > .fa').wait(500).click()

        cy.contains('Logout').wait(500).should('be.visible')    
   }

}