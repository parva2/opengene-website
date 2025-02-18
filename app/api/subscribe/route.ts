import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Insert email into Supabase
    const { error } = await supabase.from('waitlist').insert([{ email }]);
    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Database insertion failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Email submitted successfully.' });
  } catch (err) {
    console.error('Unknown error:', err);
    return NextResponse.json(
      { error: 'An unknown error occurred.' },
      { status: 500 }
    );
  }
}
