import {Injectable} from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Headers, Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/heroes';

  constructor(private http: Http){ }

  getHero(id: number): Promise<Hero> {
    //return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    if(!id){ id = 0; }

    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    //return Promise.resolve(HEROES); //old
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 500))
      .then(() => this.getHeroes());
  }

  getHeroesSync(): Hero[] {
    this.sleep(2000);
    return HEROES;
  }

  sleep(seconds) {
    var e = new Date().getTime() + (seconds);
    while (new Date().getTime() <= e) {
    }
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: String): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
