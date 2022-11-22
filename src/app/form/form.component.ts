import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  submitted= false;

  
  ngOnInit(): void {}

  public profileForm= this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required]],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['', [Validators.required]],
    }),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  async updateProfile() {
    await this.profileForm.patchValue({
      firstName: 'Jairo',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get f() { return this.profileForm.controls; }

  // name = new FormControl('');

  // updateName(): any {
  //   this.name.setValue('Jairo');
  // }
}
