import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../core/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  myReactiveForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private validatorsService: ValidatorsService) {
    this.createForm();
    this.loadDataToForm();
    this.createListeners();
  }

  ngOnInit(): void { }


  onSubmit() {
    if (this.myReactiveForm.invalid || this.myReactiveForm.pending) {
      this.myReactiveForm.markAllAsTouched();
      return;
    };
    console.log(this.myReactiveForm);
  };

  createForm() {
    this.myReactiveForm = this.fb.group({
      name:     [ '', [Validators.required, Validators.minLength(5)] ],
      lastname: [ '', [Validators.required, Validators.minLength(3), this.validatorsService.noWordShit ] ],
      email:    [ '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      // This is an object de controls
      address:  this.fb.group({
        district: [ '', Validators.required ],
        city:     [ '', Validators.required ]
      }),
      // This is an array of controls
      hobbies: this.fb.array([]),
      password:         [ '', Validators.required ],
      confirm_password: [ '', Validators.required ],
      username:         [ '', Validators.required, this.validatorsService.userExists ]
    }, {
      // Passwords are validated in this level, because here we already have our form created with all its controls.
      validators: this.validatorsService.samePasswords('password', 'confirm_password')
    });
  };

  loadDataToForm() {
    this.myReactiveForm.reset({
      name: 'Diego',
      lastname: 'Gonzales',
      email: 'diego@email.com',
      address: {
        district: 'Baños del Inca',
        city: 'Cajamarca'
      },
      password: '123',
      confirm_password: '123'
    });
    // This is the way to set values to a formArray. Another way would be with setValue({}), but this one loses the flexibility
    // ['Eat', 'Sleep'].forEach(value => this.hobbiesControl.push(this.fb.control(value)));


    // this.myReactiveForm.setValue({});
  };

  createListeners() {
    // this.myReactiveForm.valueChanges.subscribe(console.log);
    // this.myReactiveForm.statusChanges.subscribe(console.log);
    // this.myReactiveForm.get('username')?.valueChanges.subscribe(console.log);
    this.myReactiveForm.get('username')?.statusChanges.subscribe(console.log);
  };

  addHobbie() {
    this.hobbiesControl.push(this.fb.control('', Validators.required))
  };

  deleteHobbie(controlIndex: number) {
    this.hobbiesControl.removeAt(controlIndex);
  };

  get hobbiesControl(): FormArray {
    return this.myReactiveForm.get('hobbies') as FormArray;
  };

  formControlIsInvalid(controlName: string) {
    return this.myReactiveForm.get(controlName)?.invalid && this.myReactiveForm.get(controlName)?.touched;
  };
  formControlArrayIsInvalid(controlIndex: number) {
    return this.hobbiesControl.controls[controlIndex].invalid && this.hobbiesControl.controls[controlIndex].touched;
  };

  get errorMessageLastname() {
    const errors = this.myReactiveForm.get('lastname')?.errors;

    if (errors?.required) {
      return 'Lastname is required';
    } else if (errors?.minlength) {
      return 'Lastname must be at least 3 letters';
    } else if (errors?.wordShit) {
      return 'Lastname must not have word shit';
    } else {
      return '';
    };
  };

  get errorMessageUsername() {
    const errors = this.myReactiveForm.get('username')?.errors;

    if (errors?.required) return 'Username is required';
    else if (errors?.userExists) return 'Username has already be taken';
    else return '';
  };

  // VALIDATION IMPORTANT TO VALIDATE A USER AGAINST ASYNC DATA
  formControlUsernameIsNotTaken() {
    return !this.myReactiveForm.get('username')?.getError('userExists') && this.myReactiveForm.get('username')?.touched && !this.myReactiveForm.get('username')?.pending && this.myReactiveForm.get('username')?.dirty;
  };
}



// Another way to mark as touched a nested form, it's more complicated to understand.
// if (myTemplateForm.invalid) {
//   return Object.values(myTemplateForm.controls).forEach(controlParent => {
//     if (controlParent insteadOf FormGroup) {
//       Object.values(controlParent.controls).forEach(controlChild => controlChild.markAsTouched());
//     } else {
//       controlParent.markAsTouched();
//     };
//   });
// }
