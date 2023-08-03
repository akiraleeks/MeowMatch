import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RxjsUtil } from '../util/rxjs';
import { Observable, of } from 'rxjs';
import { ICatDetail } from '../app.component';

export interface ICatBreedOptions {
  label: string;
  value?: string;
}

interface IOauthToken{
  token_type: string,
  expires_in: number,
  access_token: string
}

export interface IAdopatbleAnimals{
  animals: IAdoptaionDetails[]
}

interface IAdoptaionDetails{
  age?: string;
  gender?: string;
  name?: string;
  url?: string;
  photos?: IAdoptationPhotos[];
}

interface IAdoptationPhotos{
  full?: string;
}

export interface ICatBreedData{
  name?: string;
  altName?: string;
  image?: string;
  description?: string;
  weight?: string;
  temperament?: string;
  origin?: string;
  lifespan?: string;
  adaptability?: string,
  affectionLevel?: string,
  childFriendly?: string,
  dogFriendly?: string,
  energyLevel?: string,
  grooming?: string,
  healthIssues?: string,
  sheddingLevel?: string,
  socialNeeds?: string,
  strangerFriendly?: string,
  vocalisation?: string,
  hairless?: string,
  natural?: string,
  rare?: string,
  hypoallergenic?: string,
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  @Output() detailAction: EventEmitter<ICatDetail> = new EventEmitter();

  catBreedData: any[];
  cat: any[];
  carBreedOptions: ICatBreedOptions[] = [];
  selectedCataData: ICatBreedData[] = [];
  showCard$: Observable<boolean>;
  accessToken: IOauthToken;
  activeTab: string = 'about';
  zipCode: string;
  adoptableCats: IAdopatbleAnimals;
  hasError = false;

  @ViewChild('detailTemplate', { static: true }) public detailTemplate: TemplateRef<void>;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.getCatBreedsData();
    this.accessToken = await RxjsUtil.firstValueFrom(this.apiService.getAccessToken());
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
        altName: value.breeds[0].alt_names,
        image: value.url,
        description: value.breeds[0].description,
        weight: value.breeds[0].weight.metric,
        temperament: value.breeds[0].temperament,
        origin: value.breeds[0].origin,
        lifespan: value.breeds[0].life_span,
        adaptability: value.breeds[0].adaptability,
        affectionLevel: value.breeds[0].affection_level,
        childFriendly: value.breeds[0].child_friendly,
        dogFriendly: value.breeds[0].dog_friendly,
        energyLevel: value.breeds[0].energy_level,
        grooming: value.breeds[0].grooming,
        healthIssues: value.breeds[0].health_issues,
        sheddingLevel: value.breeds[0].shedding_level,
        socialNeeds: value.breeds[0].social_needs,
        strangerFriendly: value.breeds[0].stranger_friendly,
        vocalisation: value.breeds[0].vocalisation,
        hairless: value.breeds[0].hairless,
        natural: value.breeds[0].natural,
        rare: value.breeds[0].rare,
        hypoallergenic: value.breeds[0].hypoallergenic
      }
    });
    this.showCard$ = this.selectedCataData.length ? of(true) : of(false);
    this.activeTab = 'about';
    this.hasError = false;
    this.adoptableCats = null;
  }

  public openCatDetails() {
    this.detailAction.emit({ template: this.detailTemplate, showDetail: true });
  }

  public async backFromDetail(): Promise<void> {
    this.detailAction.emit({showDetail: false});
    await RxjsUtil.sleepAsync(0);
  }

  public changeActiveTab(currentTab: string) {
    this.activeTab = currentTab;
    this.hasError = false;
  }

  public setZipCode(event) {
    this.zipCode = event.target.value;
  }

  public async searchCatsByZip(): Promise<void>{
    this.hasError = false;
    try {
      this.adoptableCats = await RxjsUtil.firstValueFrom(this.apiService.getCatsByZip(this.accessToken.access_token, this.selectedCataData[0].name, this.zipCode));
      if (this.adoptableCats.animals.length === 0) {
        this.hasError = true;
      }
    }
    catch (error) {
      this.hasError = true;
    }
  }
}
