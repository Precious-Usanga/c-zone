import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICountry } from '../../models/countries.model';
import { SharedModule } from '../../../../../core/shared/shared.module';
import { MaterialModule } from '../../../../../core/shared/material.module';
import { Roles } from '../../../../../core/enum/role';

@Component({
  selector: 'app-view-country',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './view-country.component.html',
  styleUrl: './view-country.component.scss'
})
export class ViewCountryComponent {
  ROLES = Roles;

  editIcon = 'edit';
  deleteIcon = 'delete';

  country!: ICountry;

  constructor(
    private route: ActivatedRoute
  ) {
    this.getCountryDataFromRoute();
  }

  getCountryDataFromRoute() {
    this.route.data.subscribe((data) => {
      const routeData = data as { countryData: ICountry };
      this.country = routeData['countryData'];
    });
  }

  countryFlagUrl(url: string) {
    return `url("${url}")`;
  }
}
