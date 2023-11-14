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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CocktailCrudComponent,
    StateCrudComponent,
    KanbanBoardComponent,
    FilterByStatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
