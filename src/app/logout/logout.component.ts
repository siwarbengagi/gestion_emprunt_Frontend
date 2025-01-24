import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-logout',
  template: `<p>Déconnexion en cours...</p>` // Vous pouvez personnaliser ce template
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    // Déclencher la déconnexion
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean(); // Nettoyer le stockage local
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
      },
      error: err => {
        console.error(err); // En cas d'erreur
        this.router.navigate(['/login']); // Rediriger quand même
      }
    });
  }
}
