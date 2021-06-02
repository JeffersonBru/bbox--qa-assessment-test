/// <reference types="Cypress" />

import User from '../../support/user'
import Register from '../../support/register'

describe('Prolancer - Register', function () {

    it('POST v1/users -  Body empty', () => {
        let prolancer = User.getNewProlancer();
        prolancer.fullName = null
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: {}
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'FULLNAME_REQUIRED',
                    message: "\"fullName\" é obrigatório",
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field loginType null', () => {
        let prolancer = User.getNewProlancer();
        prolancer.loginType = null
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'LOGINTYPE_REQUIRED',
                    message: "\"loginType\" é obrigatório",
                    type: 'ApiError'
                }
            )
        })
    })


    it('POST v1/users -  Field loginType empty', () => {
        let prolancer = User.getNewProlancer();
        prolancer.loginType = ""
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'LOGINTYPE_REQUIRED',
                    message: "\"loginType\" é obrigatório",
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field loginType not exists', () => {
        let prolancer = User.getNewProlancer();
        prolancer.loginType = 'password'
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer,
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'INVALID_LOGINTYPE',
                    message: 'O loginType é inválido',
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field fullName null', () => {
        let prolancer = User.getNewProlancer();
        prolancer.fullName = null
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'FULLNAME_REQUIRED',
                    message: "\"fullName\" é obrigatório",
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field fullName empty', () => {
        let prolancer = User.getNewProlancer();
        prolancer.fullName = ""
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'FULLNAME_REQUIRED',
                    message: "\"fullName\" é obrigatório",
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field email null', () => {
        let prolancer = User.getNewProlancer();
        prolancer.email = null
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'INVALID_EMAIL',
                    message: 'O e-mail é inválido',
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field email empty', () => {
        let prolancer = User.getNewProlancer();
        prolancer.email = ""
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'INVALID_EMAIL',
                    message: 'O e-mail é inválido',
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field email invalid', () => {
        let prolancer = User.getNewProlancer();
        prolancer.email = "aa@aa"
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'INVALID_EMAIL',
                    message: 'O e-mail é inválido',
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field email already', () => {
        let prolancer = User.getNewProlancer();
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestSuccess(response, prolancer)
        }).then(()=>{
            cy.makeReq({ 
                method: 'POST',
                url: Cypress.env('bossa_api'),
                body: prolancer
            })
            .should((response) => {
                Register.validateRequestFail(response,
                    {
                        code: 'EMAIL_REGISTERED',
                        message: 'E-mail já cadastrado',
                        type: 'ApiError'
                    }
                )
            })
        })
    })

    it('POST v1/users -  Field password empty', () => {
        let prolancer = User.getNewProlancer();
        prolancer.password = ""
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'INVALID_PASSWORD',
                    message: 'O password deve ter no mínimo 8 caracteres',
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field password null', () => {
        let prolancer = User.getNewProlancer();
        prolancer.password = null
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'INVALID_PASSWORD',
                    message: 'O password deve ter no mínimo 8 caracteres',
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users -  Field password lower', () => {
        let prolancer = User.getNewProlancer();
        prolancer.password = '123'
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
        })
        .should((response) => {
            Register.validateRequestFail(response,
                {
                    code: 'INVALID_PASSWORD',
                    message: 'O password deve ter no mínimo 8 caracteres',
                    type: 'ApiError'
                }
            )
        })
    })

    it('POST v1/users - success', () => {
        let prolancer = User.getNewProlancer();
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer,
        })
        .should((response) => {
            Register.validateRequestSuccess(response, prolancer)
        })
    })

})