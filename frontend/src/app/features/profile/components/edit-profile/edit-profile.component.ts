import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputComponent} from '../../../../shared/ui/input/input.component';
import {ButtonComponent} from '../../../../shared/ui/button/button.component';
import {User} from '../../../../shared/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent

  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  // @Input() user! : User;
  @Input() user: any;
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Odabran fajl:', file.name);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
