import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { User } from '../../../../shared/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  @Input() user!: User;
  @Output() close = new EventEmitter<void>();

  private selectedFile: File | null = null;
  public password = '';
  public confirmPassword = '';

  constructor(private profileService: ProfileService) {}

  closePopup() {
    this.close.emit();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfileInfo() {
    if (this.selectedFile) {
      this.profileService.uploadProfileImage(+this.user.id, this.selectedFile).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.updateUserProfile();
        },
        error: (err) => {
          console.error('Failed to upload image:', err);
        }
      });
    } else {
      this.updateUserProfile();
    }
  }

  private updateUserProfile() {
    this.profileService.updateUserProfile(this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.closePopup();
      },
      error: (err) => {
        console.error('Failed to update user profile:', err);
      }
    });
  }
}
