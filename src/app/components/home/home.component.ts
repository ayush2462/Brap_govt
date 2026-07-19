import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Slide {
  heading1: string;
  heading2: string;
  heading3: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
}

interface QuickLink {
  icon: string;
  label: string;
  sublabel: string;
  route: string;
}

interface Guideline {
  title: string;
  date: string;
  type: string;
}

interface PressRelease {
  title: string;
  day: string;
  month: string;
  year: string;
  source: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  // ---- Hero Slider ----
  currentSlide = 0;
  private slideTimer: any;

  slides: Slide[] = [
    {
      heading1: 'Welcome to',
      heading2: 'Business Reforms',
      heading3: 'Action Plan Portal',
      description: 'A single platform for monitoring, implementation and evaluation of business reform initiatives across States/UTs to enhance ease of doing business in India.',
      imgSrc: 'assets/parliament-hero.png',
      imgAlt: 'Indian Parliament Building'
    },
    {
      heading1: 'Empowering',
      heading2: 'States & Union',
      heading3: 'Territories',
      description: 'Enabling State and UT Governments to implement comprehensive reform programs that make business operations more efficient and less burdensome.',
      imgSrc: 'assets/parliament-hero.png',
      imgAlt: 'Government of India'
    },
    {
      heading1: 'Fostering',
      heading2: 'Industrial',
      heading3: 'Growth in India',
      description: 'DPIIT is responsible for formulation and implementation of promotional and developmental measures for growth of the industrial sector.',
      imgSrc: 'assets/parliament-hero.png',
      imgAlt: 'Industrial Growth'
    }
  ];

  // ---- Quick Access Links ----
  quickLinks: QuickLink[] = [
    { icon: 'dashboard', label: 'State', sublabel: 'Dashboard', route: '/dashboard' },
    { icon: 'assessment', label: 'Assessment', sublabel: 'Framework', route: '/assessment' },
    { icon: 'bar_chart', label: 'Performance', sublabel: 'Reports', route: '/reports' },
    { icon: 'description', label: 'Guidelines &', sublabel: 'Documents', route: '/guidelines' },
    { icon: 'campaign', label: 'Press', sublabel: 'Releases', route: '/press' },
    { icon: 'star', label: 'Best', sublabel: 'Practices', route: '/best-practices' },
  ];
  // ---- Guidelines ----
  guidelines: Guideline[] = [
    { title: 'BRAP 2024 Framework Guidelines for States & UTs', date: '15 Mar 2024', type: 'PDF' },
    { title: 'Business Reform Action Plan – Implementation Manual', date: '02 Jan 2024', type: 'PDF' },
    { title: 'Ease of Doing Business — Regulatory Compliance Guide', date: '20 Nov 2023', type: 'PDF' },
    { title: 'Industrial Park Rating System (IPRS) Guidelines', date: '05 Sep 2023', type: 'PDF' },
    { title: 'State Reform Score Computation Methodology 2023', date: '18 Jul 2023', type: 'PDF' },
    { title: 'Online Single Window System — Integration Manual', date: '01 Jun 2023', type: 'DOC' },
  ];

  // ---- Press Releases ----
  pressReleases: PressRelease[] = [
    { title: 'DPIIT releases BRAP 2024 Assessment Rankings for all States & UTs', day: '12', month: 'Apr', year: '2024', source: 'PIB — Ministry of Commerce & Industry' },
    { title: 'India ranked 63rd in World Bank Ease of Doing Business Index 2024', day: '24', month: 'Mar', year: '2024', source: 'DPIIT Press Release' },
    { title: 'Union Minister launches new Investor Facilitation Portal at Invest India', day: '08', month: 'Feb', year: '2024', source: 'PIB — DPIIT' },
    { title: 'Cabinet approves National Industrial Corridor Development Programme', day: '17', month: 'Jan', year: '2024', source: 'Cabinet Secretariat' },
    { title: 'DPIIT signs MoU with 12 State Governments for reform implementation', day: '05', month: 'Dec', year: '2023', source: 'PIB — Ministry of Commerce & Industry' },
    { title: 'Start-up India initiative crossed 1 lakh registered start-ups milestone', day: '30', month: 'Nov', year: '2023', source: 'DPIIT Press Release' },
  ];

  // ---- About Sections ----
  aboutWebsite = `Since 2015, the Department for Promotion of Industry and Internal Trade (DPIIT) has been actively developing and distributing the Business Reforms Action Plan to States and Union Territories (UTs), aimed at simplifying business regulations and fostering a more business-friendly environment throughout the nation.

The government, in partnership with State and UT Governments, is implementing a comprehensive reform program designed to make business operations more efficient and less burdensome. These reforms address the full spectrum of the business lifecycle, emphasising the reduction of industry compliance burdens.

States and UTs are deeply involved in shaping, crafting, and executing these reforms on an annual basis. The Action Plan is carefully designed to ensure that progress is measurable and that comparisons can be made effectively across different States.

To facilitate this initiative, the DPIIT launched an online portal (www.eodb.dpiit.gov.in) in April 2016, establishing a central hub for regulatory compliance information for all 36 States and UTs in India.

This portal promotes collaborative dialogue between the DPIIT and the State/UT governments, enabling them to confirm and present evidence of the implemented reforms. Moreover, it offers States and UTs the flexibility to update or add to their evidence as needed.`;

  aboutDPIIT = `The Department for Promotion of Industry and Internal Trade (DPIIT) was founded in 1995 and later expanded in 2000 through the merger with the Department of Industrial Development. Operating under the auspices of the Ministry of Commerce and Industry, Government of India, DPIIT is tasked with the development and execution of policies and strategies aimed at fostering the growth of the industrial sector. Its responsibilities are aligned with the nation's overarching priorities and socio-economic goals, ensuring that the industrial advancement it promotes is both sustainable and inclusive.`;

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  startSlider(): void {
    this.slideTimer = setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

  stopSlider(): void {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopSlider();
    this.startSlider();
  }

  getQuickLinkSvg(icon: string): string {
    const icons: Record<string, string> = {
      dashboard: `<svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>`,
      assessment: `<svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>`,
      bar_chart: `<svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M4 9h4v11H4zm6-5h4v16h-4zm6 8h4v8h-4z"/></svg>`,
      description: `<svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
      campaign: `<svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/></svg>`,
      star: `<svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
    };
    return icons[icon] || '';
  }
}
