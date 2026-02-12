import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TastyResponse, Recipe } from '../models/tasty.model';

@Injectable({
    providedIn: 'root'
})
export class TastyService {

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'x-rapidapi-key': environment.rapidApiKey,
            'x-rapidapi-host': environment.rapidApiHost
        });
    }

    getRecipes(from: number = 0, size: number = 20, tags?: string): Observable<TastyResponse<Recipe>> {
        let params = new HttpParams()
            .set('from', from.toString())
            .set('size', size.toString());

        if (tags) {
            params = params.set('tags', tags);
        }

        return this.http.get<TastyResponse<Recipe>>(`${environment.apiUrl}/recipes/list`, {
            headers: this.getHeaders(),
            params: params
        });
    }

    searchRecipes(query: string, from: number = 0, size: number = 20): Observable<TastyResponse<Recipe>> {
        const params = new HttpParams()
            .set('from', from.toString())
            .set('size', size.toString())
            .set('q', query);

        return this.http.get<TastyResponse<Recipe>>(`${environment.apiUrl}/recipes/list`, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getRecipeDetails(id: number): Observable<Recipe> {
        const params = new HttpParams().set('id', id.toString());
        return this.http.get<Recipe>(`${environment.apiUrl}/recipes/get-more-info`, {
            headers: this.getHeaders(),
            params: params
        });
    }
}
