import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {

  isAlreadyExistingEmail(email: string): Observable<boolean> {
    const fakeExistingEmails = ['jaime@gmail.com', 'alejandro@gmail.com'];

    return of(fakeExistingEmails).pipe(
      // Simulamos un retraso de la respuesta de nuestra supuesta API
      delay(2000),
      map((emails: string[]) => emails.includes(email))
    );
  }
  
}
