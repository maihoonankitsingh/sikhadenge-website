import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Default SEO for Pages Router routes */}
          <meta property="og:type" content="website" />
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
          <link rel="stylesheet" href="/ai-video-brand-watermarks.css?v=20260827-higgsfield-contrast-v51" />
          <link rel="stylesheet" href="/ai-video-premium-tools-v6.css?v=20260827-premium-tools-v6" />
        </Head>
        <body>
          <Main />
          <script src="/ai-video-premium-tools-v6.js?v=20260827-premium-tools-v6" defer />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
