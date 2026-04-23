import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document<{ pixelId?: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    };
  }

  render() {
    const pixelId = (this.props as any).pixelId as string | undefined;

    return (
      <Html lang="en">
        <Head>
          {/* Default SEO for Pages Router routes */}          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Sikhadenge" />
          <meta property="og:url" content="https://sikhadenge.in" />
          <meta
            property="og:title"
            content="Sikhadenge"
          />
          <meta
            property="og:description"
            content="Live online, structured courses with portfolio output and support. Learn industry tools with practical projects."
          />
          <meta
            property="og:image"
            content="https://sikhadenge.in/images/about/about-hero-desk.webp"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Sikhadenge" />
          <meta
            name="twitter:description"
            content="Live online, structured courses with portfolio output and support. Learn industry tools with practical projects."
          />
          <meta
            name="twitter:image"
            content="https://sikhadenge.in/images/about/about-hero-desk.webp"
          />

          {/* Meta Pixel (Pages Router) */}
          {pixelId && pixelId !== "REPLACE_ME" && pixelId !== "YOUR_REAL_PIXEL_ID" ? (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${pixelId}');
                    fbq('track', 'PageView');
                  `,
                }}
              />
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: "none" }}
                  src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                  alt=""
                />
              </noscript>
            </>
          ) : null}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

