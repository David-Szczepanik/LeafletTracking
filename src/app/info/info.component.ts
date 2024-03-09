import { Component } from '@angular/core';
import {MatAnchor, MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatChipRow} from "@angular/material/chips";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import { MatToolbarModule } from '@angular/material/toolbar';
import {RouterLink} from "@angular/router";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    MatFabButton,
    MatButton,
    MatChipRow,
    MatHint,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatInput,
    MatSuffix,
    MatLabel,
    MatFormField,
    MatIcon,
    MatDivider,
    MatAnchor,
    MatIconButton,
    MatMiniFabButton,
    MatToolbarModule,
    RouterLink,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  protected readonly Map = Map;
}
