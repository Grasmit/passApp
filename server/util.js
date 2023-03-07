
exports.genPass = (passLength) => {

    const lowCase = 'abcdefghijklmnopqrstuvxyz'
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'
    const numbers = '0123456789'
    const speChar = '£$&()*+[]@#^-_!?'

    const passCat = 4

    password = ''

    for(i=0;i<passLength;i++)
    {
        let chCat = Math.round(Math.random()*(passCat-1))

        console.log(chCat)
        
        switch(chCat)
        {
            case 0: 
                password = password + lowCase[(Math.round(Math.random()*(lowCase.length-1))+1)%(lowCase.length)]
                break

            case 1: 
                password = password + upperCase[(Math.round(Math.random()*(upperCase.length-1))+1)%(upperCase.length)]
                break
                
            case 2: 
                password = password + numbers[(Math.round(Math.random()*(numbers.length-1))+1)%(numbers.length)]
                break

            case 3: 
                password = password + speChar[(Math.round(Math.random()*(speChar.length-1))+1)%(speChar.length)]
                break
        }
    }

    const status = passLength == password.length
    return {password,status}
}

exports.checkPasswordStrength = (password) =>{
    let score = 0;
  
    if (!password) {
      return score;
    }
  
    // award points for length
    score += password.length * 4;
    score += (checkRepetition(1, password).length - password.length) * 1;
    score += (checkRepetition(2, password).length - password.length) * 1;
    score += (checkRepetition(3, password).length - password.length) * 1;
    score += (checkRepetition(4, password).length - password.length) * 1;
  
    // award points for character diversity
    const characterTypes = [
      /[a-z]/, // lowercase letters
      /[A-Z]/, // uppercase letters
      /[0-9]/, // digits
      /[^a-zA-Z0-9]/ // special characters
    ];
  
    let typeCount = 0;
    for (let i = 0; i < characterTypes.length; i++) {
      if (characterTypes[i].test(password)) {
        typeCount++;
      }
    }
    score += (typeCount - 1) * 10;
  
    return score;
  }
  
  function checkRepetition(pattern, password) {
    const repeatedPattern = new RegExp(`(\S*?${pattern}\S*?){2,}`, "g");
    return password.match(repeatedPattern) || [];
  }
  