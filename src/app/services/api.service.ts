import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdopatbleAnimals } from '../landing/landing.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  theCatApiUrl = 'https://api.thecatapi.com/v1';
  theCatApiKey =
    'live_vXNlDIZ1ZUBEHnnum5EoFpEg44esQYvW8yTJ7s3YfJ6ujjI4icoynkdAbGUJtdXh';
  petFinderUrl = 'https://api.petfinder.com/v2';
  client_id = 'LCIX2STy1zkqXvm3RrmAg5OtZLXsf5yVe2pIUUPbYxMASKf8qo';
  client_secret = 'eWkOFYYLqToSQqObyT8QscsYgZI1FyTeSTYOEaBh';

  constructor(private http: HttpClient) {}

  getCatBreeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.theCatApiUrl}/breeds`);
  }

  getCat(nameOfCat: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.theCatApiUrl}/images/search?breed_ids=${nameOfCat}`,
      { headers: new HttpHeaders().set('x-api-key', `${this.theCatApiKey}`) }
    );
  }

  getAccessToken(): Observable<any> {
    const body = new HttpParams().set('grant_type', 'client_credentials')
      .set('client_id', this.client_id)
      .set('client_secret', this.client_secret);
    return this.http.post<any>(
      `${this.petFinderUrl}/oauth2/token`, body
    );
  }

  getCatsByZip(accessToken: string, catBreed: string, zipCode: string): Observable<IAdopatbleAnimals> {
    return this.http.get<IAdopatbleAnimals>(
      `${this.petFinderUrl}/animals?type=cat&breed=${catBreed}&location=${zipCode}&page=1`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`) }
    );
  }
}
