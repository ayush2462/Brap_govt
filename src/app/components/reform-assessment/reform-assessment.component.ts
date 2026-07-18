import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reform-assessment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reform-assessment.component.html',
  styleUrl: './reform-assessment.component.css'
})
export class ReformAssessmentComponent {
  activeTab: 'stateWise' | 'centreWise' = 'stateWise';
  activityTab: 'stateWise' | 'areaWise' = 'areaWise';
  daysLeft = -74;

  // Reform Assessment table columns
  reformColumns = [
    'State',
    'Total',
    'Submitted',
    'Reviewed Once',
    'Approved (Yes)',
    'Approved (NA1)',
    'Approved (NA2)',
    'Rejected',
    'Pending Clarification',
    'Pending Clarification (5 Days Left)',
    'Pending with Reviewer',
    'Pending with Reviewer (Iteration Count = 1)',
    'Pending with Reviewer (Iteration Count = 2)',
  ];

  reformTotalRow = {
    state: 'Total',
    total: 0,
    submitted: 0,
    reviewedOnce: 0,
    approvedYes: 0,
    approvedNA1: 0,
    approvedNA2: 0,
    rejected: 0,
    pendingClarification: 0,
    pendingClarification5Days: 0,
    pendingWithReviewer: 0,
    pendingReviewerIter1: 0,
    pendingReviewerIter2: 0,
  };

  // Activity Assessment columns
  activityColumns = [
    'Area',
    'Total Submitted',
    'Pending with Reviewer',
    'Pending with Approver',
    'Reviewed/Approved (By DPIIT)',
  ];

  activityTotalRow = {
    area: 'Total',
    totalSubmitted: 0,
    pendingWithReviewer: 0,
    pendingWithApprover: 0,
    reviewedApproved: 0,
  };

  setTab(tab: 'stateWise' | 'centreWise'): void {
    this.activeTab = tab;
  }

  setActivityTab(tab: 'stateWise' | 'areaWise'): void {
    this.activityTab = tab;
  }

  exportData(): void {
    alert('Export functionality coming soon.');
  }

  clearFilter(): void {
    // Reset any filters
  }
}
