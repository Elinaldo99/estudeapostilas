
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcacygkhjofybcuchcpr.supabase.co';
const supabaseAnonKey = 'sb_publishable_rHfwHjXQVUb8p_ore9yMUA_CV-kHzgL';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('--- ALL HANDOUT CATEGORIES ---');
    const { data: h, error: he } = await supabase.from('handouts').select('category');
    if (he) console.log('H error:', he.message);
    else {
        const counts = {};
        h.forEach(row => {
            counts[row.category] = (counts[row.category] || 0) + 1;
        });
        console.log('Counts:', JSON.stringify(counts, null, 2));
    }

    console.log('--- ALL SUBCATEGORIES ---');
    const { data: s, error: se } = await supabase.from('subcategories').select('*');
    if (se) console.log('S error:', se.message);
    else {
        console.log('Subcategories:', JSON.stringify(s, null, 2));
    }
}

check();
