const chance = new (require('chance'));

class UserProlancer{

    static getNewProlancer(){
        let prolancer = new UserProlancer();
        prolancer.fullName = `Automation - ${chance.name()}`,
        prolancer.email =  `prolancer.${chance.email()}`,
        prolancer.password = chance.cpf({formatted: false}),
        prolancer.loginType = "email"
        return prolancer
    }
}

export default UserProlancer;