import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RxjsUtil } from '../util/rxjs';
import { Observable, of } from 'rxjs';

export interface ICatBreedOptions {
  label: string;
  value?: string;
}

export interface ICatBreedData{
  name: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  catBreedData: any[];
  cat: any[];
  carBreedOptions: ICatBreedOptions[] = [];
  selectedCataData: ICatBreedData[] = [];
  showCard$: Observable<boolean>;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.getCatBreedsData();
  }

  public async getCatBreedsData(): Promise<void>{
    this.catBreedData = await RxjsUtil.firstValueFrom(this.apiService.getCatBreeds());
    this.carBreedOptions = this.catBreedData.map((value) => {
      return {
        value: value.id,
        label: value.name
      }
    })
  }

  public async onSelect(breedSelected: any): Promise<void> {
    const catData = await RxjsUtil.firstValueFrom(this.apiService.getCat(breedSelected.target.value));
    this.selectedCataData = catData.map((value) => {
      return {
        name: value.breeds[0].name,
        image: value.url,
        description: value.breeds[0].description
      }
    });
    this.showCard$ = this.selectedCataData.length ? of(true) : of(false);
  }
}
