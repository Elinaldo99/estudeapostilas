import { supabase } from './supabaseClient';
import { Handout, Category } from '../types';

export const handoutService = {
    async getHandouts(): Promise<Handout[]> {
        const { data, error } = await supabase
            .from('handouts')
            .select('*, subcategories(*)')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching handouts:', error);
            return [];
        }

        return (data || []).map(item => ({
            id: item.id,
            title: item.title,
            category: item.category as Category,
            subCategory: item.subcategories ? {
                id: item.subcategories.id,
                name: item.subcategories.name,
                category: item.subcategories.category as Category
            } : undefined,
            subcategory_id: item.subcategory_id,
            description: item.description || '',
            author: item.author || '',
            pages: item.pages || 0,
            year: item.year || new Date().getFullYear(),
            rating: Number(item.rating) || 0,
            downloadUrl: item.download_url,
            thumbnail: item.thumbnail_url || ''
        }));
    },

    async createHandout(handout: Omit<Handout, 'id'>): Promise<Handout | null> {
        const { data, error } = await supabase
            .from('handouts')
            .insert([{
                title: handout.title,
                category: handout.category,
                subcategory_id: handout.subcategory_id,
                description: handout.description,
                author: handout.author,
                pages: handout.pages,
                year: handout.year,
                rating: handout.rating,
                download_url: handout.downloadUrl,
                thumbnail_url: handout.thumbnail
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating handout:', error);
            throw error;
        }

        return data ? {
            ...handout,
            id: data.id,
            category: data.category as Category,
            rating: Number(data.rating)
        } : null;
    },

    async updateHandout(id: string, handout: Partial<Handout>): Promise<void> {
        const updateData: any = {};
        if (handout.title) updateData.title = handout.title;
        if (handout.category) updateData.category = handout.category;
        if (handout.subcategory_id !== undefined) updateData.subcategory_id = handout.subcategory_id;
        if (handout.description !== undefined) updateData.description = handout.description;
        if (handout.author !== undefined) updateData.author = handout.author;
        if (handout.pages !== undefined) updateData.pages = handout.pages;
        if (handout.year !== undefined) updateData.year = handout.year;
        if (handout.rating !== undefined) updateData.rating = handout.rating;
        if (handout.downloadUrl) updateData.download_url = handout.downloadUrl;
        if (handout.thumbnail !== undefined) updateData.thumbnail_url = handout.thumbnail;

        const { error } = await supabase
            .from('handouts')
            .update(updateData)
            .eq('id', id);

        if (error) {
            console.error('Error updating handout:', error);
            throw error;
        }
    },

    async deleteHandout(id: string): Promise<void> {
        const { error } = await supabase
            .from('handouts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting handout:', error);
            throw error;
        }
    },

    async uploadThumbnail(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('materials')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading thumbnail:', uploadError);
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('materials')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
};
