import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../core/models/tasty.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipe-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="card" (click)="goToDetail()">
      <div class="card-image">
        <img [src]="recipe.thumbnail_url" [alt]="recipe.name">
        <div class="overlay">
          <span class="rating" *ngIf="recipe.user_ratings?.score">
             ★ {{ (recipe.user_ratings.score * 5).toFixed(1) }}
          </span>
        </div>
      </div>
      <div class="card-body">
        <h3>{{ recipe.name }}</h3>
        <p class="description">{{ recipe.description | slice:0:80 }}{{ recipe.description.length > 80 ? '...' : '' }}</p>
        <div class="card-footer">
          <span class="time" *ngIf="recipe.total_time_minutes">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            {{ recipe.total_time_minutes }}m
          </span>
          <span class="calories" *ngIf="recipe.nutrition?.calories">
            🔥 {{ recipe.nutrition.calories }} kcal
          </span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .card {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
    }

    .card:hover {
      transform: translateY(-10px);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }

    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .card:hover .card-image img {
      transform: scale(1.1);
    }

    .overlay {
      position: absolute;
      top: 15px;
      right: 15px;
    }

    .rating {
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
      font-weight: bold;
      color: #f9cb28;
    }

    .card-body {
      padding: 20px;
    }

    .card-body h3 {
      margin: 0 0 10px;
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .description {
      color: #aaa;
      font-size: 0.9rem;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      color: #888;
      font-size: 0.8rem;
    }

    .card-footer span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  `]
})
export class RecipeCardComponent {
    @Input({ required: true }) recipe!: Recipe;

    constructor(private router: Router) { }

    goToDetail() {
        this.router.navigate(['/recipe', this.recipe.id]);
    }
}
