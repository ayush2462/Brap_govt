import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;
  openDropdownIndex: number | null = null;
  isLoggedIn = false;
  userName = '';
  currentDate = '';
  showUserDropdown = false;

  private sub!: Subscription;

  // Public nav items (before login)
  publicNavItems = [
    { label: 'Home', icon: '🏠', link: '/', hasDropdown: false },
    { label: 'About the Website', icon: 'ℹ️', link: '/about-website', hasDropdown: false },
    { label: 'About DPIIT', icon: 'ℹ️', link: '/about', hasDropdown: false },
    { label: 'Contact Us', icon: '✉️', link: '/contact', hasDropdown: false },
    { label: 'Guideline', icon: '📋', link: '/guideline', hasDropdown: true },
    { label: 'Downloads', icon: '⬇️', link: '/downloads', hasDropdown: true },
    { label: 'Best Practices', icon: '⭐', link: '/best-practices', hasDropdown: true },
    { label: 'Press Release', icon: '📰', link: '/press-release', hasDropdown: true },
    { label: 'Previous Exercises', icon: '≡', link: '/exercises', hasDropdown: true },
  ];

  // Dashboard nav items (after login) — matching image
  dashboardNavItems = [
    { label: 'National Dashboard', icon: '🏠', link: '/dashboard', hasDropdown: false },
    { label: 'Dashboard', icon: '📊', link: '/reform-assessment', hasDropdown: false },
    { label: 'State - Reforms', icon: 'A', link: '/state-reforms', hasDropdown: true },
    { label: 'Reform Management', icon: '🔄', link: '/reform-management', hasDropdown: true },
    { label: 'Admin', icon: '👤', link: '/admin', hasDropdown: true },
    { label: 'Report', icon: '📋', link: '/report', hasDropdown: true },
    { label: 'User Data', icon: '📊', link: '/user-data', hasDropdown: true },
  ];

  get navItems() {
    return this.isLoggedIn ? this.dashboardNavItems : this.publicNavItems;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.authService.isLoggedIn$.subscribe(v => {
      this.isLoggedIn = v;
    });
    this.authService.userName$.subscribe(n => this.userName = n);
    // Format date like "18-Jul-2026"
    const d = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    this.currentDate = `${String(d.getDate()).padStart(2,'0')}-${months[d.getMonth()]}-${d.getFullYear()}`;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.openDropdownIndex = null;
    }
  }

  toggleMobileDropdown(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.openDropdownIndex = null;
  }

  toggleDropdown(label: string): void {
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
  }

  logout(): void {
    this.authService.logout();
    this.showUserDropdown = false;
    this.router.navigate(['/']);
  }

  increaseFontSize(): void {
    const current = parseFloat(document.documentElement.style.fontSize || '14');
    document.documentElement.style.fontSize = Math.min(current + 2, 20) + 'px';
  }

  decreaseFontSize(): void {
    const current = parseFloat(document.documentElement.style.fontSize || '14');
    document.documentElement.style.fontSize = Math.max(current - 2, 10) + 'px';
  }

  resetFontSize(): void {
    document.documentElement.style.fontSize = '14px';
  }
}
