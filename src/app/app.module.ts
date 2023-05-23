import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ItemComponent } from './components/item/item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MoveComponent } from './components/move/move.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { SmallMachineComponent } from './components/small-machine/small-machine.component';
import { SmallGameComponent } from './components/small-game/small-game.component';
import { SmallPokemonComponent } from './components/small-pokemon/small-pokemon.component';
import { SmallTypeComponent } from './components/small-type/small-type.component';
import { SmallItemComponent } from './components/small-item/small-item.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PokemonComponent,
        NavbarComponent,
        PokedexComponent,
        FooterComponent,
        ItemComponent,
        ItemListComponent,
        MoveComponent,
        MoveListComponent,
        SmallMachineComponent,
        SmallGameComponent,
        SmallPokemonComponent,
        SmallTypeComponent,
        SmallItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
