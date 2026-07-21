import { Component, OnInit, inject } from '@angular/core';
import { LoginOffice } from '../../data-access/models/login-office.model';

import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { ErrorPanel } from '../../../../shared/components/error-panel/error-panel';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { LoginOfficeCard } from '../../components/login-office-card/login-office-card';
import { LoginOfficeStore } from '../../state/login-office.store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginOfficeDialog } from '../../components/login-office-dialog/login-office-dialog';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input';

@Component({
  selector: 'app-login-office-list',
  standalone: true,
  imports: [
    PageHeader,
    LoadingSpinner,
    ErrorPanel,
    EmptyState,
    LoginOfficeCard,

    MatButtonModule,
    MatIconModule,

    SearchInputComponent,
  ],
  templateUrl: './login-office-list.html',
  styleUrls: ['./login-office-list.scss'],
})
export class LoginOfficeList implements OnInit {
  readonly store = inject(LoginOfficeStore);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.store.loadLoginOffices();
  }
  openCreateDialog(): void {
    this.dialog
      .open(LoginOfficeDialog, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result) {
          return;
        }

        this.store.createLoginOffice(result);
      });
  }
  openEditDialog(office: LoginOffice): void {
    this.dialog
      .open(LoginOfficeDialog, {
        width: '500px',

        data: office,
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result) {
          return;
        }

        this.store.updateLoginOffice({
          id: office.id,
          ...result,
        });
      });
  }

  deleteLoginOffice(office: LoginOffice): void {
    const confirmed = window.confirm(`Delete "${office.name}"?`);
    if (!confirmed) {
      return;
    }
    this.store.deleteLoginOffice(office.id);
  }
}

