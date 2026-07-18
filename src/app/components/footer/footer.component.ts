import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  visitorCount = 116606;
  lastUpdated = '06 Apr 2026';
  currentYear = new Date().getFullYear();

  footerLinks = [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Copyright Policy', href: '#' },
    { label: 'Hyperlinking Policy', href: '#' },
    { label: 'Disclaimer', href: '#' },
    { label: 'Site Map', href: '#' },
    { label: 'Help', href: '#' },
  ];

  ngOnInit(): void {
    // Animate visitor count
    this.animateCounter();
  }

  animateCounter(): void {
    const target = this.visitorCount;
    let start = 0;
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        this.visitorCount = target;
        clearInterval(timer);
      } else {
        this.visitorCount = start;
      }
    }, 20);
  }
}
