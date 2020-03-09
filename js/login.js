
var user;
var count=0;
$('#loginForm').on('submit' , handelSubmit);
function handelSubmit(e){
    var emailValidation =/^[a-z]\w+\@[a-z]+\.com|.org|.net$/i;
    var passwordValidation =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-z0-9A-z]/;
    user={
        userEmail:$('#inputEmail').val(),
        userPassword:$('#inputPassword').val()
    }
    // check user input value:

    // check email
    if(user.userEmail.match(emailValidation)){
        console.log('good');
        $('#errorEmail').css('display','none');
        count++;
    }else{
        $('#errorEmail').css('display','block');
        count=0;
        e.preventDefault();
    }

    console.log(count);

    // check password
    if(user.userPassword.match(passwordValidation)){
        if(user.userPassword.length>=6&&user.userPassword.length<=12){
            $('#errorPassword').css('display','none');
            count++;
        }
        else{
            $('#errorPassword').html('your password should between (6-12)charachters and contain capital,small letters and numbers');
            count=0;
             e.preventDefault();
        }
        console.log(count);

    }
    else{
        $('#errorPassword').css('display','block');
        $('#errorPassword').html('your password should between (6-12)charachters and contain capital,small letters and numbers');     
        e.preventDefault();
    }
    console.log(count);

    if(count>=2){
        this.setAttribute('action','dashBoard.html');
        console.log(this)
    }
}