import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const alt = 'Sikhadenge Masterclass';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { skill: string } }) {
  let title = 'Premium AI Masterclass';
  let category = 'Verified Training by Sikhadenge';
  
  try {
    const filePath = path.join(process.cwd(), 'data/generated-seo-merged.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const seoData = JSON.parse(fileContents);
    const generatedPage = seoData.find((s: any) => s.slug === params.skill);
    
    if (generatedPage) {
      title = generatedPage.title.split('|')[0];
      if (generatedPage.type === 'freelance') category = 'Expert Professional Guide';
      else if (generatedPage.type === 'institute') category = 'Authorized Training Institute';
      else category = 'Sikhadenge Accelerated Learning';
    }
  } catch (e) {
    // Fallback normal details
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0B1220', // Sikhadenge Premium Dark Mode
          padding: '80px 100px',
          fontFamily: 'sans-serif',
          position: 'relative'
        }}
      >
        {/* Glow Effect / Background styling */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(11,18,32,0) 70%)',
          borderRadius: '50%',
        }} />

        <div style={{
          fontSize: 28,
          color: '#F5B301', // Pure Golden Accent
          textTransform: 'uppercase',
          letterSpacing: '3px',
          fontWeight: 'bold',
          marginBottom: 30,
          background: 'rgba(245, 179, 1, 0.1)',
          padding: '10px 24px',
          borderRadius: '40px',
          border: '1px solid rgba(245, 179, 1, 0.2)'
        }}>
          {category}
        </div>

        <div
          style={{
            fontSize: 76,
            fontWeight: '900',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: 50,
            maxWidth: '1000px',
            letterSpacing: '-1px'
          }}
        >
          {title}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#2563EB',
          color: 'white',
          padding: '20px 48px',
          borderRadius: '50px',
          fontSize: 32,
          fontWeight: 'bold',
          boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)'
        }}>
          Join Free Masterclass Today
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
