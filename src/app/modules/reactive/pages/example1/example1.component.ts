import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.css']
})
export class Example1Component implements OnInit {

  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.myForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(15)] ],
      skills: this.fb.array([], Validators.required)
    });
  };

  addSkill() {
    this.skillsControl.push(this.fb.group({
      language:        [''],
      projectUrl:      [''],
      experienceYears: ['', Validators.required]
    }));
  };


  get skillsControl(): FormArray {
    return this.myForm.get('skills') as FormArray;
  };

  expYearsControlIsInvalid(indexControl: number) {
    // Remember that skillsControl is a FormArray of FormControls
    return this.skillsControl.controls[indexControl].get('experienceYears')?.invalid;
  };

  removeValidator(indexControl: number) {
    // This is the first way to get an element of FormArray
    this.skillsControl.at(indexControl).get('experienceYears')?.setErrors(null);
  };

  addValidator(indexControl: number) {
    // This is the second way to get an element of FormArray
    this.skillsControl.controls[indexControl].get('experienceYears')?.setErrors({ required: true });
  };


  /* Another way to validate: https://www.youtube.com/watch?v=uzDGgbUX_9A&t=429s minute 17 */
}
