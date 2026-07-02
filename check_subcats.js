
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcacygkhjofybcuchcpr.supabase.co';
const supabaseAnonKey = 'sb_publishable_rHfwHjXQVUb8p_ore9yMUA_CV-kHzgL';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Checking subcategories...');
    
    const { data: subcats, error } = await supabase
        .from('subcategories')
        .select('*');

    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Subcategories in DB:');
        subcats.forEach(s => {
            console.log(`- ${s.name} (Category: ${s.category})`);
        });
    }
}

check();
