import { Component } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-icon-search',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
      width: 24px;
      height: 24px;
    }
  `],
})
export class IconSearchComponent {}
