import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from '@at/main/components/nav/nav.component';

@Component({
  standalone: true,
  templateUrl: './history.component.html',
  imports: [NavComponent, RouterModule],
})
export class HistoryComponent {}
