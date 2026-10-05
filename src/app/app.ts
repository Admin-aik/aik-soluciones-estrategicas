import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Splash } from './components/splash/splash';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Metodologia } from './components/metodologia/metodologia';
import { Contacto } from './components/contacto/contacto';
import { Disenador } from './components/disenador/disenador';
import { Aula } from './components/aula/aula';
import { Blog } from './components/blog/blog';
import { Footer } from './components/footer/footer';
import { CourseState } from './services/course-state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [Splash, Header, Hero, Metodologia, Contacto, Disenador, Aula, Blog, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly state = inject(CourseState);
}
