export async function GET(){return Response.json({aiReady:!!process.env.GROQ_API_KEY},{headers:{'Cache-Control':'no-store'}})}
