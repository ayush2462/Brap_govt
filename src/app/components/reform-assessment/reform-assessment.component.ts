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

  reformRows = [
    { state: 'Andhra Pradesh', total: 18, submitted: 15, reviewedOnce: 12, approvedYes: 10, approvedNA1: 2, approvedNA2: 1, rejected: 1, pendingClarification: 1, pendingClarification5Days: 0, pendingWithReviewer: 3, pendingReviewerIter1: 2, pendingReviewerIter2: 1 },
    { state: 'Gujarat', total: 24, submitted: 22, reviewedOnce: 20, approvedYes: 18, approvedNA1: 1, approvedNA2: 1, rejected: 0, pendingClarification: 2, pendingClarification5Days: 1, pendingWithReviewer: 2, pendingReviewerIter1: 1, pendingReviewerIter2: 1 },
    { state: 'Karnataka', total: 20, submitted: 17, reviewedOnce: 15, approvedYes: 12, approvedNA1: 2, approvedNA2: 0, rejected: 1, pendingClarification: 1, pendingClarification5Days: 0, pendingWithReviewer: 3, pendingReviewerIter1: 2, pendingReviewerIter2: 1 },
    { state: 'Maharashtra', total: 25, submitted: 23, reviewedOnce: 21, approvedYes: 19, approvedNA1: 2, approvedNA2: 1, rejected: 0, pendingClarification: 1, pendingClarification5Days: 0, pendingWithReviewer: 2, pendingReviewerIter1: 1, pendingReviewerIter2: 1 },
    { state: 'Uttar Pradesh', total: 22, submitted: 18, reviewedOnce: 16, approvedYes: 11, approvedNA1: 3, approvedNA2: 1, rejected: 2, pendingClarification: 2, pendingClarification5Days: 1, pendingWithReviewer: 4, pendingReviewerIter1: 3, pendingReviewerIter2: 1 }
  ];

  reformTotalRow = {
    state: 'Total',
    total: 109,
    submitted: 95,
    reviewedOnce: 84,
    approvedYes: 70,
    approvedNA1: 10,
    approvedNA2: 4,
    rejected: 4,
    pendingClarification: 7,
    pendingClarification5Days: 2,
    pendingWithReviewer: 14,
    pendingReviewerIter1: 9,
    pendingReviewerIter2: 5,
  };

  // Activity Assessment columns
  activityColumns = [
    'Area',
    'Total Submitted',
    'Pending with Reviewer',
    'Pending with Approver',
    'Reviewed/Approved (By DPIIT)',
  ];

  activityRows = [
    { area: 'Labour Regulation', totalSubmitted: 15, pendingWithReviewer: 4, pendingWithApprover: 2, reviewedApproved: 9 },
    { area: 'Environmental Clearances', totalSubmitted: 12, pendingWithReviewer: 3, pendingWithApprover: 1, reviewedApproved: 8 },
    { area: 'Land Administration', totalSubmitted: 18, pendingWithReviewer: 5, pendingWithApprover: 3, reviewedApproved: 10 },
    { area: 'Construction Permits', totalSubmitted: 14, pendingWithReviewer: 2, pendingWithApprover: 2, reviewedApproved: 10 },
    { area: 'Paying Taxes', totalSubmitted: 10, pendingWithReviewer: 1, pendingWithApprover: 1, reviewedApproved: 8 },
    { area: 'Single Window System', totalSubmitted: 20, pendingWithReviewer: 6, pendingWithApprover: 4, reviewedApproved: 10 }
  ];

  activityTotalRow = {
    area: 'Total',
    totalSubmitted: 89,
    pendingWithReviewer: 21,
    pendingWithApprover: 13,
    reviewedApproved: 55,
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
