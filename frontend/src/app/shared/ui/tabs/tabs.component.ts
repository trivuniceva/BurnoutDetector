import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Input() tabs: string[] = [];
  @Output() tabChange = new EventEmitter<string>();

  activeTab: string = this.tabs.length > 0 ? this.tabs[0] : '';

  selectTab(tab: string) {
    this.activeTab = tab;
    this.tabChange.emit(tab);
  }
}
