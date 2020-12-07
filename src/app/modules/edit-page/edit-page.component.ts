import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MonthsService} from '../../core/services/months.service';
import {IDay, IMonth, IPlan} from '../../shared/interfaces/IMonth';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ROUTE} from '../../shared/routes/routes';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit, OnDestroy {

  currentMonth: string;
  month: IMonth;
  day: IDay;
  nothingPlaned: boolean;
  loading: boolean;
  form: FormGroup;
  private _notifier: Subject<any>;


  constructor(private _activatedRouter: ActivatedRoute,
              private _monthService: MonthsService,
              private _router: Router,
              private _fb: FormBuilder) {
    this.loading = true;
    this.nothingPlaned = true;
    this._notifier = new Subject();
  }


  ngOnInit(): void {
    this._monthService.getCurrentMonth()
      .pipe(
        takeUntil(this._notifier)
      )
      .subscribe(value => this.currentMonth = value);

    this.form = this._fb.group({
      plans: this._fb.array([]),
    });

    this._activatedRouter.params.subscribe((params: Params) => {
      this._monthService.getMonths()
        .pipe(
          takeUntil(this._notifier)
        )
        .subscribe({
          next: value => {
            this.month = value.filter(month => month.name === this.currentMonth).pop();
            this.day = this.month.days[+params.id - 1];
          },
          complete: () => {
            if (this.day.plans) {
              this.nothingPlaned = false;
              this.day.plans.forEach(plan => this.onAddPlan(plan));
            }
            this.loading = false;
          }
        });
    });
  }

  trackByFn(index: any): any {
    return index;
  }

  onAddPlan(plan?: IPlan): void {
    this.nothingPlaned = false;
    const plans = this.form.controls.plans as FormArray;

    if (plan) {
      plans.push(this._fb.group({
        icon: new FormControl(plan.icon, [Validators.required]),
        header: new FormControl(plan.header, [Validators.required]),
        text: new FormControl(plan.text, [Validators.required]),
      }));
    } else {
      plans.push(this._fb.group({
        icon: new FormControl('', [Validators.required]),
        header: new FormControl('', [Validators.required]),
        text: new FormControl('', [Validators.required]),
      }));
    }
  }

  onSubmit(formValue: any): void {
    if (this.form.valid) {
      this.month.days[this.day.day - 1].plans = formValue.plans;
      this._monthService.updatePlans(this.month)
        .pipe(
          takeUntil(this._notifier)
        )
        .subscribe({
          complete: () => this._router.navigate([ROUTE.main])
        });
    }
  }

  onCancel(): void {
    this._router.navigate([ROUTE.main]);
  }

  ngOnDestroy(): void {
    this._notifier.next();
    this._notifier.complete();
  }

}
