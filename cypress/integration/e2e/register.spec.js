/// <reference types="Cypress" />

import User from '../../support/user'
import Register from '../../support/register'
import { msg } from '../../support/register/messages'


describe('Prolancer - Register', function () {

    var prolancer = User.getNewProlancer();

    beforeEach(() => {
        cy.visit(Cypress.env("bossa_url"))
        Register.pressButtonRegister()
    })

    it('Inputs requireds', () => {
        Register.pressButtonConfirmRegister()
        .validateMessage(msg.required.inputs)
    })

    it('Term required', () => {
        Register.informInputFullName(prolancer.fullName)
        .informInputEmail(prolancer.email)
        .inforInputPassword(prolancer.password)
        .informInputConfirmPassword(prolancer.password)
        .pressButtonConfirmRegister()
        .validateMessage(msg.required.terms)
    })

    it('Email invalid', () => {
        Register.informInputFullName(prolancer.fullName)
        .informInputEmail('a.a')
        .inforInputPassword(prolancer.password)
        .informInputConfirmPassword(prolancer.password)
        .pressCheckTerms()
        .pressButtonConfirmRegister()
        .validateMessage(msg.invalid.emailOrPassword)
    })

    it('Password lower', () => {
        Register.informInputFullName(prolancer.fullName)
        .informInputEmail(prolancer.email)
        .inforInputPassword('123')
        .informInputConfirmPassword('123')
        .pressButtonConfirmRegister()
        .validateMessage(msg.invalid.passwordInvalid)
    })

    it('Passwords different', () => {
        Register.informInputFullName(prolancer.fullName)
        .informInputEmail(prolancer.email)
        .inforInputPassword(prolancer.password)
        .informInputConfirmPassword('123')
        .pressButtonConfirmRegister()
        .pressCheckTerms()
        .validateMessage(msg.invalid.confirPasswordInvalid)
    })

    it('Register success', () => {
        Register.informInputFullName(prolancer.fullName)
        .informInputEmail(prolancer.email)
        .inforInputPassword(prolancer.password)
        .informInputConfirmPassword(prolancer.password)
        .pressButtonConfirmRegister()
        .pressCheckTerms()
        .pressButtonConfirmRegister()
        .validateStatusRequestRegister(prolancer)
    })

    it('Register email alredy', () => {
        Register.informInputFullName(prolancer.fullName)
        .informInputEmail(prolancer.email)
        .inforInputPassword(prolancer.password)
        .informInputConfirmPassword(prolancer.password)
        .pressButtonConfirmRegister()
        .pressCheckTerms()
        .pressButtonConfirmRegister()
        .validateStatusRequestRegisterInvalid(msg.invalidReqEmailAlredy)
    })
})