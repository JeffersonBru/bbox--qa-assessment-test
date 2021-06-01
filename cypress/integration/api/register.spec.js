/// <reference types="Cypress" />

import User from '../../support/user'

describe('Prolancer - Register', function () {

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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('FULLNAME_REQUIRED')
          expect(response.body.error.message).to.eq("\"fullName\" é obrigatório")
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('FULLNAME_REQUIRED')
          expect(response.body.error.message).to.eq("\"fullName\" é obrigatório")
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('INVALID_EMAIL')
          expect(response.body.error.message).to.eq('O e-mail é inválido')
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('INVALID_EMAIL')
          expect(response.body.error.message).to.eq('O e-mail é inválido')
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('INVALID_EMAIL')
          expect(response.body.error.message).to.eq('O e-mail é inválido')
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(200)
          expect(response.body.token).not.be.empty
          expect(response.body.user.fullName).to.eq(prolancer.fullName)
          expect(response.body.user.email).to.eq(prolancer.email)
          expect(response.body.user.password).not.be.empty
        }).then(()=>{
            cy.makeReq({ 
                method: 'POST',
                url: Cypress.env('bossa_api'),
                body: prolancer
                })
            .should((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error.code).to.eq('EMAIL_REGISTERED')
                expect(response.body.error.message).to.eq('E-mail já cadastrado')
                expect(response.body.error.type).to.eq('ApiError')
                expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('INVALID_PASSWORD')
          expect(response.body.error.message).to.eq('O password deve ter no mínimo 8 caracteres')
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('INVALID_PASSWORD')
          expect(response.body.error.message).to.eq('O password deve ter no mínimo 8 caracteres')
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
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
          expect(response.status).to.eq(400)
          expect(response.body.error.code).to.eq('INVALID_PASSWORD')
          expect(response.body.error.message).to.eq('O password deve ter no mínimo 8 caracteres')
          expect(response.body.error.type).to.eq('ApiError')
          expect(response.body.requestId).not.be.empty
        })
    })

    it('POST v1/users - success', () => {
        let prolancer = User.getNewProlancer();
        cy.log(prolancer)
        cy.makeReq({ 
            method: 'POST',
            url: Cypress.env('bossa_api'),
            body: prolancer
            })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.token).not.be.empty
          expect(response.body.user.fullName).to.eq(prolancer.fullName)
          expect(response.body.user.email).to.eq(prolancer.email)
          expect(response.body.user.password).not.be.empty
        })
    })

})