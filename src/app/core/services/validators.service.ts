import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface ErrorControl {
  [s: string]: boolean
};


@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }


  noWordShit(control: FormControl): { [s: string]: boolean } | null { // or : ErrorControl
    if (control.value.trim().toLowerCase() === 'shit') {
      return {
        wordShit: true
      };
    };

    return null;
  };

  samePasswords(controlName1: string, controlName2: string) {
    return (myReactiveForm: FormGroup) => {
      const passwordControl = myReactiveForm.controls[controlName1];
      const confirmPasswordControl = myReactiveForm.controls[controlName2];

      if (passwordControl.value === confirmPasswordControl.value) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ passwordsNotSame: true })
      };
    };
  };

  userExists(control: FormControl): Promise<ErrorControl | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Diego') {
          resolve({ userExists: true })
        } else {
          resolve(null)
        };
      }, 3000);
    })
  };

}


// Above method can return '{ [s: string]: boolean } | null' or simply '{ wordShit: boolean } | null'
