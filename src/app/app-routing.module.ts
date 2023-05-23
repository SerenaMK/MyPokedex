import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { MoveComponent } from './components/move/move.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "navbar",
        component: NavbarComponent
    },
    {
        path: "pokedex",
        component: PokedexComponent
    },
    {
        path: "pokemon/:id",
        component: PokemonComponent
    },
    {
        path: "items",
        component: ItemListComponent
    },
    {
        path: "item/:id",
        component: ItemComponent
    },
    {
        path: "moves",
        component: MoveListComponent
    },
    {
        path: "move/:id",
        component: MoveComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
