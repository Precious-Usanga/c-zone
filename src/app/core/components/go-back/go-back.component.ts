import { Component, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent {
  CHEVRON_LEFT_ICON = 'chevron_left';

  @Input() route!: string | undefined;
  @Input() displayBackLabel: boolean = true;

  constructor(
    private location: Location,
    private router: Router
  ) {}

  /*
   * Navigate back to the previous route
   */
  navigateBack(): void {
    this.location.back();
  }

  /*
   * Navigate back to specific route
   * @param route: string
   */
  navigateBackToRoute(route: string): void {
    this.router.navigate([route]);
  }
}
