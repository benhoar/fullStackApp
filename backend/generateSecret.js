const generateSecret = (password) => {
   let secret = password.split("").reverse().join("");
   secret += "welcome"
   return secret
}

module.exports = generateSecret