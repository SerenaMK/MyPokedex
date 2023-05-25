import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilityListComponent } from './components/ability-list/ability-list.component';
import { AbilityComponent } from './components/ability/ability.component';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { MoveComponent } from './components/move/move.component';
import { NatureListComponent } from './components/nature-list/nature-list.component';
import { NatureComponent } from './components/nature/nature.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { TypeListComponent } from './components/type-list/type-list.component';
import { TypeComponent } from './components/type/type.component';

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
    },
    {
        path: "abilities",
        component: AbilityListComponent
    },
    {
        path: "ability/:id",
        component: AbilityComponent
    },
    {
        path: "types",
        component: TypeListComponent
    },
    {
        path: "type/:id",
        component: TypeComponent
    },
    {
        path: "natures",
        component: NatureListComponent
    },
    {
        path: "nature/:id",
        component: NatureComponent
    },
    {
        path: "characteristics",
        component: AbilityListComponent
    },
    {
        path: "characteristic/:id",
        component: AbilityComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
