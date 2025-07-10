import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if the webhook is from Sanity (optional security check)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.SANITY_WEBHOOK_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Extract the document type from the webhook payload
    const { _type, _id } = body;

    if (_type === 'startup') {
      // Revalidate all startup-related pages
      revalidatePath('/');
      revalidateTag('startups');
      
      // If it's a specific startup update, revalidate that startup's page
      if (_id) {
        revalidatePath(`/startup/${_id}`);
      }
      
      console.log('Revalidated startup pages');
    }

    if (_type === 'author') {
      // Revalidate author pages
      revalidateTag('authors');
      if (_id) {
        revalidatePath(`/user/${_id}`);
      }
      console.log('Revalidated author pages');
    }

    if (_type === 'playlist') {
      // Revalidate pages that use playlists
      revalidateTag('playlists');
      console.log('Revalidated playlist pages');
    }

    return NextResponse.json({ 
      message: 'Revalidated successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      message: 'Error processing webhook' 
    }, { status: 500 });
  }
}
