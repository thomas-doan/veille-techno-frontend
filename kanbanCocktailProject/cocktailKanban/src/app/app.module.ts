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
import {CocktailService} from "./_services/cocktail.service";
import {StateManagementService} from "./_services/stateManagement.service";

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
