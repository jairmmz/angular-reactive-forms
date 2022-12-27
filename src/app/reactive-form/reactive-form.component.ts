import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

// authService se pasa como parámetro al async validator
export function emailValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = (control.value as string).trim().toLowerCase(); // Elimina espacios, devuelve un valor lower

    return authService
      .isAlreadyExistingEmail(email)
      .pipe(map(isExisting => (isExisting ? { emailExists: true } : null)));
  };
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})

export class ReactiveFormComponent implements OnInit {
  registerForm!: FormGroup;
  // submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ ]+$")]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[A-ZÑa-zñáéíóúÁÉÍÓÚ ]+$")]],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          [emailValidator(this.authService)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPass: ['', Validators.required],
        terms: ['', Validators.requiredTrue]
      },
      {
        validator: this.MustMatch('password', 'repeatPass'), // Validando - Debe coincidir
      },
    );
  }

  // Validador personalizado para verificar que dos campos coincidan
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // Retorna si otro validador ya ha encontrado un error en el MatchingControl
        return;
      }
      // Establecer error en MatchControl si falla la validación
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // Para un fácil acceso a los campos de formulario
  get form() {
    return this.registerForm.controls;
  }

  // Enviar formulario
  onSubmit() {
    // this.submitted = true;

    // Detiene si el formulario no es válido
    if (this.registerForm.invalid) {
      return;
    }
    // Muestra valores de formulario en caso de éxito
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    );
    console.log(this.registerForm.value);
  }

  // Resetar campos del formulario.
  onReset() {
    // this.submitted = false;
    this.registerForm.reset();
  }

}
