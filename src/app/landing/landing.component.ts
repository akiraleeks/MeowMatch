import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  cats: any[] | undefined;
  cat: any[] | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.apiService.getCatBreeds().subscribe((data: any[]) => {
      this.cats = data;
      console.log(data);
    })

    this.apiService.getCat('asho').subscribe((data: any[]) => {
      this.cat = data;
      console.log(data);
    })
  }
}
