import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryResponse, CountryShort } from '../../shared/interfaces/country-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<CountryShort[]> {
    return this.http.get<CountryResponse[]>('https://restcountries.com/v3.1/lang/spa')
              .pipe(
                map(resp => {
                  return resp.map( country => ({ name: country.name.common, cioc: country.cioc! }) )
                })
              );
  };

}
