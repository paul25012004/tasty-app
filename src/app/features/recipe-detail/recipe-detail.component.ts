import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TastyService } from '../../core/services/tasty.service';
import { Recipe } from '../../core/models/tasty.model';

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="detail-container" *ngIf="recipe; else loading">
      <div class="back-btn" (click)="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Feed
      </div>

      <header class="detail-hero">
        <div class="hero-image">
          <img [src]="recipe.thumbnail_url" [alt]="recipe.name">
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-text">
          <h1>{{ recipe.name }}</h1>
          <div class="meta-tags">
             <span *ngIf="recipe.total_time_minutes">⏱ {{ recipe.total_time_minutes }} mins</span>
             <span *ngIf="recipe.num_servings">👥 {{ recipe.num_servings }} servings</span>
             <span *ngIf="recipe.nutrition?.calories">🔥 {{ recipe.nutrition.calories }} kcal</span>
          </div>
        </div>
      </header>

      <div class="detail-content">
        <aside class="ingredients">
          <h2>Ingredients</h2>
          <div class="ingredient-section" *ngFor="let section of recipe.sections">
            <h3 *ngIf="section.name">{{ section.name }}</h3>
            <ul>
              <li *ngFor="let comp of section.components">
                <span class="bullet"></span>
                {{ comp.raw_text }}
              </li>
            </ul>
          </div>
        </aside>

        <main class="instructions">
          <h2>Step by Step</h2>
          <div class="step" *ngFor="let step of recipe.instructions; let i = index">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-text">{{ step.display_text }}</div>
          </div>

          <div class="video-section" *ngIf="recipe.original_video_url">
            <h2>Watch & Learn</h2>
            <div class="video-container">
               <video [src]="recipe.original_video_url" controls></video>
            </div>
          </div>
        </main>
      </div>
    </div>

    <ng-template #loading>
      <div class="loader-full">
        <div class="loader"></div>
      </div>
    </ng-template>
  `,
    styles: [`
    .detail-container {
      min-height: 100vh;
      background: #0f0f0f;
      color: white;
      padding-bottom: 100px;
    }

    .back-btn {
      position: fixed;
      top: 30px;
      left: 30px;
      z-index: 100;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(10px);
      padding: 10px 20px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s;
    }

    .back-btn:hover {
      background: rgba(255,255,255,0.1);
      transform: translateX(-5px);
    }

    .detail-hero {
      height: 70vh;
      position: relative;
      display: flex;
      align-items: flex-end;
      padding: 0 5% 60px;
    }

    .hero-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .hero-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, #0f0f0f 10%, transparent 90%);
    }

    .hero-text {
      position: relative;
      z-index: 2;
      max-width: 800px;
    }

    .hero-text h1 {
      font-size: 4.5rem;
      margin: 0 0 20px;
      font-weight: 800;
      line-height: 1.1;
    }

    .meta-tags {
      display: flex;
      gap: 20px;
      font-size: 1.1rem;
      color: #ff4d4d;
      font-weight: 600;
    }

    .detail-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 60px;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 30px;
      position: relative;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: #ff4d4d;
    }

    .ingredients {
      background: rgba(255,255,255,0.02);
      padding: 30px;
      border-radius: 24px;
      height: fit-content;
    }

    .ingredient-section h3 {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #666;
      margin: 25px 0 15px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      display: flex;
      align-items: flex-start;
      gap: 12px;
      color: #ccc;
    }

    .bullet {
      width: 6px;
      height: 6px;
      background: #ff4d4d;
      border-radius: 50%;
      margin-top: 8px;
    }

    .step {
      display: flex;
      gap: 25px;
      margin-bottom: 40px;
    }

    .step-num {
      width: 40px;
      height: 40px;
      background: rgba(255,77,77,0.1);
      color: #ff4d4d;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }

    .step-text {
      font-size: 1.2rem;
      line-height: 1.7;
      color: #dfdfdf;
    }

    .video-section {
      margin-top: 80px;
    }

    .video-container {
      border-radius: 24px;
      overflow: hidden;
      aspect-ratio: 16/9;
      background: #000;
    }

    .video-container video {
      width: 100%;
      height: 100%;
    }

    .loader-full {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top: 3px solid #ff4d4d;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 900px) {
      .detail-content { grid-template-columns: 1fr; }
      .hero-text h1 { font-size: 2.5rem; }
      .detail-hero { height: 50vh; }
    }
  `]
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private tastyService: TastyService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.tastyService.getRecipeDetails(id).subscribe({
                next: (res) => this.recipe = res,
                error: (err) => console.error('Error fetching details', err)
            });
        }
    }

    goBack() {
        this.router.navigate(['/']);
    }
}
