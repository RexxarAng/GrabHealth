import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

    constructor() { }

    validateRegistration(user) {
        if (user.firstname == "" || user.lastname == "" || user.username == "" || user.email == "" || user.password == "" || user.cfmpassword == "") {
            return false;
          } else {
            return true;
          }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validatePasswords(user) {
        if (user.password == user.cfmpassword) {
            return true;
        } else {
            return false;
        }
    }


    validatePasswordStrength(password) {
        var hasUpperCase = /[A-Z]/ // at least 1 uppercase
        var hasLowerCase = /[a-z]/ // at least 1 lowercase
        var hasNumbers = /[0-9]/ // at least 1 digit number
        if (password.length < 8) {
          return false;
        }
        else if (password.length >= 8) {
          if (password.search(hasUpperCase) == -1) {
            return false;
          }
          else if (password.search(hasNumbers) == -1) {
            return false;
          }
          else if (password.search(hasLowerCase) == -1) {
            return false;
          }
          else if (password.search(hasLowerCase) >= 0 && password.search(hasUpperCase) >= 0 && password.search(hasNumbers) >= 0) {
            return true;
          }
        }

    }

    
}