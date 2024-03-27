import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-application-tracker-detail',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatGridListModule, MatDatepickerModule, MatSelectModule, MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './job-application-tracker-detail.component.html',
  styleUrl: './job-application-tracker-detail.component.scss'
})
export class JobApplicationTrackerDetailComponent {

  constructor (private router: Router) {}

  onClose() {
    this.router.navigate(['/jobList']);
  }
}
