import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTab: 'stateWise' | 'centreWise' = 'stateWise';
  selectedReformArea = '';
  daysLeft = -74;

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

  ngOnInit(): void {}

  setTab(tab: 'stateWise' | 'centreWise'): void {
    this.activeTab = tab;
  }
}
