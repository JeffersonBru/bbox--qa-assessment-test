const MESSAGES = {
    required: {
        inputs:"Lembre-se de preencher os campos",
        terms: "É necessário aceitar os termos de uso e política de privacidade para prosseguir"
    },
    invalid: {
        emailOrPassword: "E-mail e/ou senha inválidos",
        passwordInvalid: "A senha deve ter pelo menos 8 caracteres",
        confirPasswordInvalid: "As senhas não correspondem",
        emailAlredy: "E-mail já cadastrado!"
    },
    invalidReqEmailAlredy:{
        code: "EMAIL_REGISTERED",
        message: "E-mail já cadastrado",
        type: "ApiError"
    }
}

export {MESSAGES as msg}