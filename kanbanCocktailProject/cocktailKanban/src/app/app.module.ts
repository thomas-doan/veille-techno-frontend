import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CocktailCrudComponent } from './cocktail-crud/cocktail-crud.component';
import { StateCrudComponent } from './state-crud/state-crud.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import {FilterByStatePipe} from "./_pipes/filter-by-state.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StateAddComponent } from './state-add/state-add.component';
import {COCKTAIL_SERVICE_TOKEN, STATE_SERVICE_TOKEN} from "./_tokens/injection-tokens";
import {StateService} from "./_services/state.service";
import {CocktailService} from "./_services/cocktail.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CocktailCrudComponent,
    StateCrudComponent,
      StateAddComponent,
    KanbanBoardComponent,
    FilterByStatePipe,
    StateAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: COCKTAIL_SERVICE_TOKEN, useClass: CocktailService },
    { provide: STATE_SERVICE_TOKEN, useClass: StateService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
