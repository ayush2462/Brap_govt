import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;
  openDropdownIndex: number | null = null;  // tracks which mobile dropdown is open

  navItems = [
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

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.openDropdownIndex = null; // close all sub-menus when closing menu
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
