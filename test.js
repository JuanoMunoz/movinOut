const userADMIN = ['juan', 'elena', 'luis']
const userTryinRegister = 'juan'
const checkIfUserAdmin = userADMIN.filter(user => {
    return user == userTryinRegister
})
console.log(checkIfUserAdmin)