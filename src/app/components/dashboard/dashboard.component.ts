import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as d3Geo from 'd3-geo';

interface StateFeature {
  type: string;
  properties: { st_nm: string };
  geometry: any;
}

interface GeoData {
  type: string;
  features: StateFeature[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('indiaMapSvg', { static: false }) mapSvgRef!: ElementRef<SVGSVGElement>;

  activeTab: 'stateWise' | 'centreWise' = 'stateWise';
  selectedReformArea = '';
  daysLeft = -74;

  // Map state
  geoData: GeoData | null = null;
  statePaths: { name: string; path: string; color: string; percentage: number }[] = [];
  hoveredState: string | null = null;
  hoveredPercentage: number | null = null;
  tooltipX = 0;
  tooltipY = 0;
  currentZoom = 1;
  translateX = 0;
  translateY = 0;

  // Mock reform % per state
  stateReformData: Record<string, number> = {
    'Andhra Pradesh': 92,
    'Arunachal Pradesh': 45,
    'Assam': 67,
    'Bihar': 55,
    'Chhattisgarh': 78,
    'Goa': 88,
    'Gujarat': 95,
    'Haryana': 82,
    'Himachal Pradesh': 74,
    'Jharkhand': 60,
    'Karnataka': 91,
    'Kerala': 85,
    'Madhya Pradesh': 72,
    'Maharashtra': 93,
    'Manipur': 50,
    'Meghalaya': 48,
    'Mizoram': 42,
    'Nagaland': 38,
    'Orissa': 65,
    'Punjab': 80,
    'Rajasthan': 76,
    'Sikkim': 55,
    'Tamil Nadu': 89,
    'Tripura': 52,
    'Uttar Pradesh': 70,
    'Uttaranchal': 73,
    'West Bengal': 68,
    'Delhi': 94,
    'Puducherry': 83,
    'Chandigarh': 90,
    'Dadra and Nagar Haveli': 62,
    'Daman and Diu': 58,
    'Jammu and Kashmir': 66,
    'Andaman and Nicobar': 40,
  };

  evaluatedReforms = [
    { category: 'Reform', yes: 0, no: 0, na1: 0, na2: 0 },
    { category: 'Percentage', yes: 0, no: 0, na1: 0, na2: 0 },
  ];

  totalReformData = [
    { category: 'Count', evaluated: 0, notEvaluated: 0, pendingClarification: 0, rejected: 0, notSubmitted: 0 },
    { category: 'Percentage', evaluated: 0, notEvaluated: 0, pendingClarification: 0, rejected: 0, notSubmitted: 100 },
  ];

  reformAreas = [
    'Construction Permits',
    'Environmental Registration',
    'Labour Regulation Reforms',
    'Access to Information',
    'Single Window System',
    'Inspections',
    'Online Courts',
    'Property Registration',
    'Tax Related Reforms',
  ];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadGeoJson();
  }

  setTab(tab: 'stateWise' | 'centreWise'): void {
    this.activeTab = tab;
  }

  private async loadGeoJson(): Promise<void> {
    try {
      const response = await fetch('/assets/geojson/india.geojson');
      const data: GeoData = await response.json();
      this.ngZone.run(() => {
        this.geoData = data;
        this.renderMap();
      });
    } catch (err) {
      console.error('Failed to load India GeoJSON:', err);
    }
  }

  private renderMap(): void {
    if (!this.geoData) return;

    const width = 420;
    const height = 460;

    const projection = d3Geo.geoMercator()
      .center([82, 23])
      .scale(850)
      .translate([width / 2, height / 2]);

    const pathGen = d3Geo.geoPath().projection(projection);

    this.statePaths = this.geoData.features.map(feature => {
      const name = feature.properties.st_nm;
      const pct = this.stateReformData[name] ?? 50;
      return {
        name,
        path: pathGen(feature.geometry as any) || '',
        color: this.getColorForPercentage(pct),
        percentage: pct,
      };
    });
  }

  getColorForPercentage(pct: number): string {
    if (pct >= 90) return '#2d8a2d';
    if (pct >= 80) return '#2288aa';
    if (pct >= 70) return '#44bbaa';
    return '#e8a020';
  }

  onStateHover(event: MouseEvent, name: string, pct: number): void {
    this.hoveredState = name;
    this.hoveredPercentage = pct;
    const svgEl = this.mapSvgRef?.nativeElement;
    if (svgEl) {
      const rect = svgEl.getBoundingClientRect();
      this.tooltipX = event.clientX - rect.left + 12;
      this.tooltipY = event.clientY - rect.top - 10;
    }
  }

  onStateMove(event: MouseEvent): void {
    const svgEl = this.mapSvgRef?.nativeElement;
    if (svgEl) {
      const rect = svgEl.getBoundingClientRect();
      this.tooltipX = event.clientX - rect.left + 12;
      this.tooltipY = event.clientY - rect.top - 10;
    }
  }

  onStateLeave(): void {
    this.hoveredState = null;
    this.hoveredPercentage = null;
  }

  zoomIn(): void {
    if (this.currentZoom < 4) {
      this.currentZoom *= 1.4;
    }
  }

  zoomOut(): void {
    if (this.currentZoom > 0.5) {
      this.currentZoom /= 1.4;
    }
  }

  resetZoom(): void {
    this.currentZoom = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  get mapTransform(): string {
    return `translate(${this.translateX}, ${this.translateY}) scale(${this.currentZoom})`;
  }

  // Pan support via mouse drag
  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panStartTX = 0;
  private panStartTY = 0;

  onMapMouseDown(event: MouseEvent): void {
    if (this.currentZoom > 1) {
      this.isPanning = true;
      this.panStartX = event.clientX;
      this.panStartY = event.clientY;
      this.panStartTX = this.translateX;
      this.panStartTY = this.translateY;
      event.preventDefault();
    }
  }

  onMapMouseMove(event: MouseEvent): void {
    if (this.isPanning) {
      this.translateX = this.panStartTX + (event.clientX - this.panStartX) / this.currentZoom;
      this.translateY = this.panStartTY + (event.clientY - this.panStartY) / this.currentZoom;
    }
  }

  onMapMouseUp(): void {
    this.isPanning = false;
  }
}
