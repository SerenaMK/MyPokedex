import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
