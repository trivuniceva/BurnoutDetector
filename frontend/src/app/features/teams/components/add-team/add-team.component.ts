import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TeamsService} from '../../../../core/service/teams/teams.service';
import {AuthService} from '../../../../core/service/auth/auth.service';

@Component({
  selector: 'app-add-team',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent implements OnInit {
  teamForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private teamsService: TeamsService
    ) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get controls() {
    return this.teamForm.controls;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.teamForm.valid && this.selectedFile) {
      const loggedInUser = this.authService.getUser();

      if (!loggedInUser || !loggedInUser.id) {
        alert('Greška: Nije pronađen ID ulogovanog menadžera.');
        return;
      }

      const managerId = loggedInUser.id;
      const formData = this.teamForm.value;

      // 1. Priprema FormData objekta
      const uploadData = new FormData();

      // Dodajemo sliku
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);

      // Dodajemo ostala polja
      uploadData.append('name', formData.name);
      uploadData.append('description', formData.description);

      // ID menadžera se šalje kao query parametar kao i ranije

      this.teamsService.addTeam(uploadData, managerId).subscribe({
        next: (response) => {
          console.log('Tim uspešno dodat:', response);
          alert(`Tim "${response.name}" je uspešno dodat!`);
          this.teamForm.reset();
          this.selectedFile = null; // Resetujemo i odabranu datoteku
        },
        error: (error) => {
          console.error('Greška pri dodavanju tima:', error);
          alert('Greška pri dodavanju tima. Proverite konzolu za detalje.');
        }
      });
    } else {
      this.teamForm.markAllAsTouched();
      if (!this.selectedFile) {
        alert('Molimo odaberite sliku tima.');
      } else {
        alert('Molimo popunite sva obavezna polja.');
      }
    }
  }

}
