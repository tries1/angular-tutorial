import {Component, OnInit} from '@angular/core';
import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers: []
})
export class HeroesComponent implements OnInit{

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  heroes = Hero[0];
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    //this.heroes = this.heroService.getHeroesSync();
  }

  add(name: String): void {
    name = name.trim();
    if (!name){ return;}
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if( this.selectedHero === hero) {
          this.selectedHero = null;
        }
      })
  }
}
