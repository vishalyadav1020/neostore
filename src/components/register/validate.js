export default function validateRegister(fname,lname,email,password,confirmpassword,mobile) {
    let errors = {}

    // Register Form Validation-------------------------------------------------------------------->

    //First Name Validation
    if(fname === ''){
        errors.fname = "Please Enter Firstname"
    }
    else if(!/^.{1,12}$/s.test(fname)){
        errors.fname = "Length should be less than 12 Alphabets"
    }
    else if(!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(fname)) {
        errors.fname = "First Name should be Alphabets only"
    }

    //Last Name Validation
    if(lname === ''){
        errors.lname = "Please Enter Laststname"
    }
    else if(!/^.{1,12}$/s.test(lname)){
        errors.lname = "Length should be less than 12 Alphabets"
    }
    else if(!/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(lname)) {
        errors.lname = "Last Name should be Alphabets only"
    }

    //Email Validation
    if(email === ''){
        errors.email = "Please Enter Email "
    }
    else if(!/^(([^<>!@#$%&^*()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        errors.email = "Please Enter Correct Email Address"
    }

    //Password Validation
    if(password === ''){
        errors.password = "Please Enter Password"
    }
    else if(!/^.{8,12}$/s.test(password)){
        errors.password = "Length should be 8 to 12 Characters"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(password)){
        errors.password = "Password should be Alphanumeric"
    }

    //Confirm Password Validation
    if(confirmpassword === ''){
        errors.confirmpassword = "Please Re-Enter Password"
    }
    else if(!/^.{8,12}$/s.test(confirmpassword)){
        errors.confirmpassword = "Length should be 8 to 12 Characters"
    }
    else if(!/^(?=.*\d)(?=.*[a-z]).{4,14}$/.test(confirmpassword)){
        errors.confirmpassword = "Password should be Alphanumeric"
    }
    else if(password !== confirmpassword){
        errors.confirmpassword = "Password Mismatched"
    }

    


    return errors;
}