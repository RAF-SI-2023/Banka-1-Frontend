import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AppRoutes} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { PopupComponent } from "./popup/popup.component";
import { PermissionPopUpComponent } from "./permissions-popup/permission-pop-up/permission-pop-up.component";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {FormsModule} from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpClientModule,
    RouterOutlet,
    AppRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
