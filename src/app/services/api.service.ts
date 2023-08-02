import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://api.thecatapi.com/v1';
  apiKey =
    'live_vXNlDIZ1ZUBEHnnum5EoFpEg44esQYvW8yTJ7s3YfJ6ujjI4icoynkdAbGUJtdXh';

  constructor(private http: HttpClient) {}

  getCatBreeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/breeds`);
  }

  getCat(nameOfCat: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/images/search?breed_ids=${nameOfCat}`,
      { headers: new HttpHeaders().set('x-api-key', `${this.apiKey}`) }
    );
  }
}
