import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/_models/card';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(public fb: FormBuilder, private route: ActivatedRoute,
              private userService: UserService,
              private notification: NotificationService,
              private router: Router,
              private authService: AuthService) { }
cardForm: FormGroup;
showForm = false;
newCard: Card;
user = this.authService.currentUser;

myCards: Card[] = [];

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.myCards = data.cards;
    });
    this.cardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      cardholderName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      isDefault: [false]
    });
  }

  addCard() {
    this.userService.addCard(this.user.id).subscribe(
      next => {
      }, error => {
        this.notification.error(error);
      }, () => {
      });
  }

  checkDate() {
    let input = this.cardForm.get('expiryDate').value;
    input = input.replace('/', '');
    const length = input.length;
    if (length === 2) {
      this.cardForm.patchValue({
        expiryDate: input + '/'
      });
    }
  }

  addSpace() {
    let input = this.cardForm.get('cardNumber').value;
    const current = this.cardForm.get('cardNumber').value;
    const currentLength = current.length;
    input = input.replace(/\s/g, '');
    const length = input.length;
    if (length % 4 === 0 && currentLength < 19) {
      this.cardForm.patchValue({
        cardNumber: current + ' '
      });
    }
  }


  // onSubmit() {
  //   const input = this.cardForm.get('cardNumber').value.replace(/\s/g, '')
  //   this.newCard = Object.assign({}, this.cardForm.value);
  //   this.newCard.cardNumber = input;
  //   this.userService.addCard(this.newCard).subscribe((card: Card) => {
  //     this.myCards.push(card);
  //     this.cardForm.reset();
  //     this.showForm = false;
  //     this.notification.success('Card added successfully');
  //     }, error => {
  //       this.notification.error(error);
  //     });
  // }

}
