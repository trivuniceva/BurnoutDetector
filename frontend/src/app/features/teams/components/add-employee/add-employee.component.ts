import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TeamsService} from '../../../../core/service/teams/teams.service';

@Component({
  selector: 'app-add-employee',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})

export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  selectedFile: File | null = null;

  userRoles: string[] = ['EMPLOYEE', 'MANAGER'];

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userRole: ['EMPLOYEE', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get controls() {
    return this.employeeForm.controls;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Izabrana slika:', this.selectedFile.name);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.employeeForm.value.firstName);
      formData.append('lastName', this.employeeForm.value.lastName);
      formData.append('email', this.employeeForm.value.email);
      formData.append('userRole', this.employeeForm.value.userRole);
      formData.append('password', this.employeeForm.value.password);

      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile);
      }

      this.teamsService.addEmployee(formData).subscribe({
        next: (response) => {
          console.log('Zaposleni uspešno dodat:', response);
          alert(`Zaposleni "${response.firstName} ${response.lastName}" uspešno dodat!`);
          this.employeeForm.reset({ userRole: 'EMPLOYEE' });
          this.selectedFile = null;
        },
        error: (error) => {
          console.error('Greška pri dodavanju zaposlenog:', error);
          const errorMessage = error.status === 409
            ? 'Email adresa je već u upotrebi.'
            : 'Greška pri dodavanju zaposlenog.';
          alert(errorMessage);
        }
      });
    } else {
      this.employeeForm.markAllAsTouched();
      alert('Molimo ispravite greške u formi.');
    }
  }

}
