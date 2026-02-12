import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TastyService } from '../../core/services/tasty.service';
import { Recipe } from '../../core/models/tasty.model';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RecipeCardComponent, FormsModule],
    template: `
    <div class="home-container">
      <header class="hero">
        <div class="hero-content">
          <h1>Find Your Next <span class="highlight">Flavor</span></h1>
          <p>Discover thousands of recipes from Tasty's collection</p>
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              (keyup.enter)="onSearch()"
              placeholder="Search recipes, ingredients..."
            >
            <button (click)="onSearch()" class="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>
        </div>
      </header>

      <main class="content">
        <div class="section-header">
          <h2>{{ isSearching ? 'Search Results' : 'Trending Recipes' }}</h2>
          <div class="filters" *ngIf="!isSearching">
            <button (click)="loadRecipes('dinner')" [class.active]="currentTag === 'dinner'">Dinner</button>
            <button (click)="loadRecipes('dessert')" [class.active]="currentTag === 'dessert'">Desserts</button>
            <button (click)="loadRecipes('breakfast')" [class.active]="currentTag === 'breakfast'">Breakfast</button>
          </div>
        </div>

        <div class="recipe-grid" *ngIf="recipes.length > 0; else loading">
          <app-recipe-card 
            *ngFor="let recipe of recipes" 
            [recipe]="recipe"
          ></app-recipe-card>
        </div>

        <ng-template #loading>
          <div class="loader-container">
            <div class="loader"></div>
            <p>Gathering fresh ingredients...</p>
          </div>
        </ng-template>

        <div class="load-more" *ngIf="recipes.length > 0">
           <button class="btn-more" (click)="loadMore()" [disabled]="isLoading">
             {{ isLoading ? 'Loading...' : 'Show More' }}
           </button>
        </div>
      </main>
    </div>
  `,
    styles: [`
    .home-container {
      min-height: 100vh;
      background: #0f0f0f;
      color: white;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .hero {
      height: 60vh;
      background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), 
                  url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070') center/cover;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 20px;
    }

    .hero-content h1 {
      font-size: 4rem;
      margin-bottom: 1rem;
      font-weight: 800;
    }

    .highlight {
      background: linear-gradient(135deg, #ff4d4d, #f9cb28);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-content p {
      font-size: 1.25rem;
      color: #ccc;
      margin-bottom: 2.5rem;
    }

    .search-box {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 8px;
      border-radius: 50px;
      display: flex;
      max-width: 600px;
      margin: 0 auto;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .search-box:focus-within {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
    }

    .search-box input {
      background: transparent;
      border: none;
      color: white;
      padding: 12px 25px;
      flex: 1;
      font-size: 1.1rem;
      outline: none;
    }

    .search-btn {
      background: #ff4d4d;
      border: none;
      color: white;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }

    .search-btn:hover {
      transform: scale(1.1);
    }

    .content {
      max-width: 1400px;
      margin: -50px auto 0;
      padding: 0 20px 50px;
      position: relative;
      z-index: 10;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .filters {
      display: flex;
      gap: 10px;
    }

    .filters button {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      padding: 8px 20px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .filters button.active, .filters button:hover {
      background: #fff;
      color: #000;
    }

    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
    }

    .loader-container {
      text-align: center;
      padding: 100px 0;
    }

    .loader {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top: 3px solid #ff4d4d;
      border-radius: 50%;
      margin: 0 auto 20px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .load-more {
      display: flex;
      justify-content: center;
      margin-top: 50px;
    }

    .btn-more {
      background: transparent;
      border: 1px solid #ff4d4d;
      color: #ff4d4d;
      padding: 12px 40px;
      border-radius: 30px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-more:hover:not(:disabled) {
      background: #ff4d4d;
      color: white;
    }

    .btn-more:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .hero-content h1 { font-size: 2.5rem; }
      .section-header { flex-direction: column; align-items: flex-start; gap: 15px; }
    }
  `]
})
export class HomeComponent implements OnInit {
    recipes: Recipe[] = [];
    isLoading = false;
    searchQuery = '';
    isSearching = false;
    currentTag = '';
    currentPage = 0;
    pageSize = 20;

    constructor(private tastyService: TastyService) { }

    ngOnInit() {
        this.loadRecipes();
    }

    loadRecipes(tag?: string) {
        this.currentTag = tag || '';
        this.isSearching = false;
        this.recipes = [];
        this.currentPage = 0;
        this.fetchData();
    }

    onSearch() {
        if (!this.searchQuery.trim()) {
            this.loadRecipes();
            return;
        }
        this.isSearching = true;
        this.recipes = [];
        this.currentPage = 0;
        this.fetchData();
    }

    loadMore() {
        this.currentPage += this.pageSize;
        this.fetchData();
    }

    private fetchData() {
        this.isLoading = true;
        const obs = this.isSearching
            ? this.tastyService.searchRecipes(this.searchQuery, this.currentPage, this.pageSize)
            : this.tastyService.getRecipes(this.currentPage, this.pageSize, this.currentTag);

        obs.subscribe({
            next: (res) => {
                this.recipes = [...this.recipes, ...res.results];
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error fetching recipes', err);
                this.isLoading = false;
            }
        });
    }
}
