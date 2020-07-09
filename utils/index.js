// Shortering text for title and other thing
export function textShortening(text,length){
    if(text.length > +length){ text = `${text.slice(0,length+1)} ...`; }
    return text;
}

// Validation sections
function checkPassword(password){
    const valPass = {upperCase:false,lowerCase:false,decimalDigit:false};
    for (let i = 0; i < password.length; i++) {
        if(valPass.decimalDigit && valPass.lowerCase && valPass.upperCase){  break; }
        let char = password.charAt(i);
        if (!isNaN( +char * 1)){  valPass.decimalDigit = true;}
        else{
          if (char === char.toUpperCase()) { valPass.upperCase = true;}
          if (char === char.toLowerCase()) { valPass.lowerCase = true;} 
        }
        
    }
    return valPass;
}
export function validationForm(type,value,rePassword=""){
    const emailTestRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let minLengthRequirements = value.length >= 8;
    let nameLengthRequirements = value.length >= 3;
    const valResult =  {errorMessage:'',validationStatus:true}
    switch(type) {
        case "email":
            if(!emailTestRegex.test(String(value).toLowerCase())){ valResult.errorMessage = "Email not valid";valResult.validationStatus = false; }
          break;
        case "name":
            if(!nameLengthRequirements){ valResult.errorMessage = "Field is required";valResult.validationStatus = false; }
          break;  
        case "password":
            if (minLengthRequirements)
            {
                const {decimalDigit,upperCase,lowerCase} = checkPassword(value);
                if(decimalDigit === false){
                    valResult.errorMessage = "at least one number";valResult.validationStatus = false;
                }
                else if(!upperCase || !lowerCase){
                    valResult.errorMessage = "at least one uppercase, lowercase letter";valResult.validationStatus = false;
                }
            } else{ valResult.errorMessage = "password minimum 8 character";valResult.validationStatus = false;}
            break;
        case "rePassword":
            if (minLengthRequirements)
            {
            if(rePassword!==value || rePassword === null){valResult.errorMessage = "password dont match";valResult.validationStatus = false;}  
            } else{ valResult.errorMessage = "password minimum 8 character";valResult.validationStatus = false;}
            break;  
        default:
      }
    return valResult;
}