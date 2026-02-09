import { supabase } from './supabaseClient';
import { SubCategory, Category } from '../types';

export const subcategoryService = {
    async getSubCategories(): Promise<SubCategory[]> {
        const { data, error } = await supabase
            .from('subcategories')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching subcategories:', error);
            return [];
        }

        return (data || []).map(item => ({
            id: item.id,
            name: item.name,
            category: item.category as Category,
            created_at: item.created_at
        }));
    },

    async createSubCategory(subcategory: Omit<SubCategory, 'id'>): Promise<SubCategory | null> {
        const { data, error } = await supabase
            .from('subcategories')
            .insert([{
                name: subcategory.name,
                category: subcategory.category
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating subcategory:', error);
            throw error;
        }

        return data ? {
            id: data.id,
            name: data.name,
            category: data.category as Category,
            created_at: data.created_at
        } : null;
    },

    async updateSubCategory(id: string, subcategory: Partial<SubCategory>): Promise<void> {
        const updateData: any = {};
        if (subcategory.name) updateData.name = subcategory.name;
        if (subcategory.category) updateData.category = subcategory.category;

        const { error } = await supabase
            .from('subcategories')
            .update(updateData)
            .eq('id', id);

        if (error) {
            console.error('Error updating subcategory:', error);
            throw error;
        }
    },

    async deleteSubCategory(id: string): Promise<void> {
        const { error } = await supabase
            .from('subcategories')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting subcategory:', error);
            throw error;
        }
    }
};
