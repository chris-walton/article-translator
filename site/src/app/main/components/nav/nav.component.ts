import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'at-nav',
  templateUrl: './nav.component.html',
  imports: [NgbDropdownModule, NgClass, RouterModule],
})
export class NavComponent {
  @Input({ required: true }) page!: string;

  constructor(private readonly route: ActivatedRoute) {}
}
