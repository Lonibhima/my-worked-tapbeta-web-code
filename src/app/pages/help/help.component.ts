import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  faqs = [
    {
      title: 'How do I recharge?',
      answer: 'These are the steps to recharge'
    },
    {
      title: 'How fast is it?',
      answer: 'Our reply'
    },
    {
      title: 'What are the payment methods?',
      answer: 'MasterCard, VisaCard, VerveCard'
    }
  ];

  filteredFaq: any;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public notification: NotificationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.filteredFaq = this.faqs;

  }

  filter(value) {
    this.filteredFaq = this.doFilter(value);
  }

  doFilter(filterValue: string) {
    const filter = filterValue.toLowerCase();
    return this.faqs.filter(option =>
        option.title.toLowerCase().includes(filter));
  }

}
