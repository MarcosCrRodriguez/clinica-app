import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'clinic-app';
  menu: string = 'home';
  isMenuOpen = false;
  usuarioLogueado: any = null;

  @ViewChild('menuRef', { static: true }) menuRef!: ElementRef; // Referencia al menú
  @ViewChild('menuIconRef', { static: true }) menuIconRef!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.authService.usuarioLogueado$.subscribe((usuario) => {
    //   if (usuario) {
    //     console.log('Usuario logueado:', usuario.email); // Mostrar el email del usuario
    //   }
    //   this.usuarioLogueado = usuario;
    // });
  }

  // logout() {
  //   this.authService.logout().then(() => {
  //     this.router.navigate(['/login']);
  //   });
  // }

  openMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;

    const clickedInsideMenu =
      this.menuRef.nativeElement.contains(targetElement);
    const clickedOnMenuIcon =
      this.menuIconRef.nativeElement.contains(targetElement);

    if (!clickedInsideMenu && !clickedOnMenuIcon) {
      this.closeMenu();
    }
  }

  preventMenuClose(event: MouseEvent) {
    event.stopPropagation();
  }

  setMenu(menu: string) {
    this.menu = menu;
  }
}
