import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export class Data {
    constructor() { }
}

@Injectable()
export class AppService {
    public url = 'assets/data/';
    constructor(public http: HttpClient, public snackBar: MatSnackBar) { }

}
