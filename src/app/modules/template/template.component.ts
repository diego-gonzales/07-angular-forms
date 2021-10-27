import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryShort } from 'src/app/shared/interfaces/country-response.interface';
import { MyServiceService } from '../../core/services/my-service.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user = {
    name: 'Diego',
    lastname: 'Gonzales',
    email: 'diego@email.com',
    country: 'PER',
    gender: 'M'
  };
  countries: CountryShort[] = [];


  constructor(private myService: MyServiceService) { }

  ngOnInit(): void {
    this.getCountriesList();
  }


  getCountriesList() {
    this.myService.getCountries()
    .subscribe(resp => {
      console.log(resp);
      this.countries = resp;
    });
  };

  onSubmit(myTemplateForm: NgForm) {
    // console.log(myTemplateForm);
    if (myTemplateForm.invalid) {
      Object.values(myTemplateForm.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }

    console.log(myTemplateForm.value);
  };

}
