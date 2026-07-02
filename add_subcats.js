
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcacygkhjofybcuchcpr.supabase.co';
const supabaseAnonKey = 'sb_publishable_rHfwHjXQVUb8p_ore9yMUA_CV-kHzgL';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addSubcats() {
    console.log('Adding subcategories for "Concursos"...');
    
    const subcats = [
        { name: 'Direito Administrativo', category: 'Concursos' },
        { name: 'Direito Penal', category: 'Concursos' },
        { name: 'Direito Constitucional', category: 'Concursos' },
        { name: 'Português', category: 'Concursos' },
        { name: 'Matemática', category: 'Concursos' }
    ];

    const { data, error } = await supabase
        .from('subcategories')
        .insert(subcats)
        .select();

    if (error) {
        console.error('Error adding subcategories:', error.message);
        return;
    }

    console.log(`Added ${data.length} subcategories.`);

    // Associate some handouts with these subcategories for demonstration
    const { data: handouts } = await supabase
        .from('handouts')
        .select('id, title')
        .eq('category', 'Concursos')
        .limit(5);

    if (handouts && handouts.length > 0 && data.length > 0) {
        for (let i = 0; i < Math.min(handouts.length, data.length); i++) {
            await supabase
                .from('handouts')
                .update({ subcategory_id: data[i].id })
                .eq('id', handouts[i].id);
            console.log(`Linked "${handouts[i].title}" to "${data[i].name}"`);
        }
    }
}

addSubcats();
