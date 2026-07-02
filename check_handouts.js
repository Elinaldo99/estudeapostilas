
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcacygkhjofybcuchcpr.supabase.co';
const supabaseAnonKey = 'sb_publishable_rHfwHjXQVUb8p_ore9yMUA_CV-kHzgL';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Checking handouts...');
    
    const { data: handouts, error } = await supabase
        .from('handouts')
        .select('*')
        .limit(5);

    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Handouts in DB (first 5):');
        handouts.forEach(h => {
            console.log(`- Title: ${h.title} | Category: "${h.category}" | SubCatId: ${h.subcategory_id}`);
        });
    }
}

check();
