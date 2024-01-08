class GeneratePassword {

    constructor(){
        this.generator = require("generate-password")
    }

    getPassword(passwordLength, isNumber){
        return this.generator.generate({ length: passwordLength, numbers: isNumber })
    }
}

module.exports = GeneratePassword
