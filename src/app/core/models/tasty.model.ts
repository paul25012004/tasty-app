export interface TastyResponse<T> {
    count: number;
    results: T[];
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    thumbnail_url: string;
    thumbnail_alt_text?: string;
    video_url?: string;
    prep_time_minutes: number | null;
    cook_time_minutes: number | null;
    total_time_minutes: number | null;
    num_servings: number | null;
    yields: string;
    instructions: Instruction[];
    sections: Section[];
    nutrition: Nutrition;
    user_ratings: {
        count_positive: number;
        count_negative: number;
        score: number;
    };
    original_video_url?: string;
}

export interface Instruction {
    id: number;
    display_text: string;
    position: number;
}

export interface Section {
    components: Component[];
    name: string | null;
    position: number;
}

export interface Component {
    id: number;
    raw_text: string;
    extra_comment: string;
    ingredient: Ingredient;
    measurements: Measurement[];
}

export interface Ingredient {
    id: number;
    name: string;
    display_singular: string;
    display_plural: string;
}

export interface Measurement {
    id: number;
    unit: Unit;
    quantity: string;
}

export interface Unit {
    name: string;
    display_singular: string;
    display_plural: string;
    abbreviation: string;
}

export interface Nutrition {
    carbohydrates: number;
    fiber: number;
    updated_at: string;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
}
