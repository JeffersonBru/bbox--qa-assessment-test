import { el } from './register'

class Register{

    pressButtonRegister(){
        cy.get(el.buttonRegister).click()
        return this
    }

    informInputFullName(fullName){
        cy.get(el.inputFullName).clear().click()
        if(fullName)
            cy.get(el.inputFullName).type(fullName);
        return this
    }

    informInputEmail(email){
        cy.get(el.inputEmail).clear().click()
        if(email)
            cy.get(el.inputEmail).type(email);
        return this
    }

    inforInputPassword(password){
        cy.get(el.inputPassword).clear().click()
        if(password)
            cy.get(el.inputPassword).type(password);
        return this
    }

    informInputConfirmPassword(password){
        cy.get(el.inputConfirmPassword).clear().click()
        if(password)
            cy.get(el.inputConfirmPassword).type(password);
        return this
    }

    pressCheckTerms(){
        cy.get(el.checkBoxReadTerms).click()
        return this
    }

    pressButtonConfirmRegister(){
        cy.intercept('**/users').as('registerUser')
        cy.get(el.buttonConfirmRegister).click()
        return this
    }

    validateMessage(message){
        cy.get(el.boxMessageAlert).should('have.text', message)
        return this
    }

    validateStatusRequestRegister(prolancer){
        cy.wait('@registerUser').then(intercept =>{
            this.validateRequestSuccess(intercept.response, prolancer)
        })
        return this
    }

    validateStatusRequestRegisterInvalid(msg){
        cy.wait('@registerUser').then(intercept =>{
            this.validateRequestFail(intercept.response, msg)
        })
        return this
    }

    validateRequestSuccess(resp, prolancer){
        expect(resp.statusCode == undefined ? resp.status : resp.statusCode).to.eq(200)
        expect(resp.body.user.email).to.eq(prolancer.email)
        expect(resp.body.user.fullName).to.eq(prolancer.fullName)
        expect(resp.body.user.password).not.be.empty
    }

    validateRequestFail(resp, msg){
        expect(resp.statusCode == undefined ? resp.status : resp.statusCode).to.eq(400)
        expect(resp.body.error.code).to.eq(msg.code)
        expect(resp.body.error.message).to.eq(msg.message)
        expect(resp.body.error.type).to.eq(msg.type)
        expect(resp.body.requestId).not.be.empty
    }

}

export default new Register()