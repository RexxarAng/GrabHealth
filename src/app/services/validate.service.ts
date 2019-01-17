import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateNric(ic) {
    var icArray = new Array(9);
    for (var i = 0; i < 9; i++) {
      icArray[i] = ic.charAt(i);
    }
    icArray[1] *= 2;
    icArray[2] *= 7;
    icArray[3] *= 6;
    icArray[4] *= 5;
    icArray[5] *= 4;
    icArray[6] *= 3;
    icArray[7] *= 2;
    var weight = 0;
    for (i = 1; i < 8; i++) {
      weight += parseInt(icArray[i]);
    }
    var offset = (icArray[0] == "T" || icArray[0] == "G") ? 4 : 0;
    var temp = (offset + weight) % 11;
    var st = Array("J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A");
    var fg = Array("X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K");
    var theAlpha;
    if (icArray[0] === "S" || icArray[0] === "T") {
      theAlpha = st[temp];
    } else if (icArray[0] === "F" || icArray[0] === "G") {
      theAlpha = fg[temp];
    }
    return (icArray[8] === theAlpha);
  }

  validateRegistration(user) {
      if (user.firstname === "" || user.lastname === "" || user.email === "" || user.address === "" || user.nric === "" || user.contactNo === "") {
          return false;
        } else {
          return true;
        }
  }

  validateClinicRegistration(user, clinic) {
    if (user.firstName.length === 0 || user.lastName.length === 0 || user.email.length === 0 || user.nric.length === 0 || user.contactNo.length === 0 || user.doctorLicenseNo.length === 0 || clinic.name.trim().length === 0 || clinic.address.length === 0 || clinic.location.length === 0 || clinic.contactNo.length === 0 || clinic.clinicLicenseNo.length === 0 || clinic.clinicPhoto.length === 0 ) {
      return false;
    } else {
      return true;
    }
  }

  validateContactNo(contactNo){
    var re = /^[689]\d{7}$/ 
    return re.test(contactNo);
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
        if (password.search(hasUpperCase) === -1) {
          return false;
        }
        else if (password.search(hasNumbers) === -1) {
          return false;
        }
        else if (password.search(hasLowerCase) === -1) {
          return false;
        }
        else if (password.search(hasLowerCase) >= 0 && password.search(hasUpperCase) >= 0 && password.search(hasNumbers) >= 0) {
          return true;
        }
      }
  }

  //Validate patient registration
  validatePatientRegistration(user) {
    if (user.firstName.length === '' || user.lastName.length === '' || user.nric.length === '' || user.gender.select === '' || user.address.length === '' || user.dob.length === '' || user.nationality.length === '' || user.contactNo.length === '' ) {
      return false;
    } else {
      return true;
    }
  }

  validateFirstName(firstName) {
    if (firstName.length <2 || firstName.length === '') {
        return false;
    } else {
      return true;
    }
  }

  validateLastName(lastName) {
    if (lastName.length <2 || lastName.length === '') {
      return false;
    } else {
      return true;
    }
  }

  validateGender(gender) {
    if (gender.length === 0 || gender.length === '' || gender.select ==='') {
      return false;
    } else {
      return true;
    }
  }

  validateAddress(address) {
    if (address.length === 0 || address.length === '' || address.length >256) {
      return false;
    } else {
      return true;
    }
  }

  validateDOB(dob) {
    var re = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
    return re.test(dob);
  }

  validateNationality(nationality) {
    var re = /[A-Z||a-z]{4,30}/;
    return re.test(nationality);
  }

}