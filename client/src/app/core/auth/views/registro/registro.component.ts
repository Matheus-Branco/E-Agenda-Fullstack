import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  form: FormGroup;

    constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get nome(){
    return this.form.get('nome');
  }

  get login(){
    return this.form.get('login');
  }

  get email(){
    return this.form.get('email');
  }

  get senha(){
    return this.form.get('senha');
  }

  public registrar(){
    if(this.form.invalid) return;

      console.log("Registrar Chamado");
  }
}
