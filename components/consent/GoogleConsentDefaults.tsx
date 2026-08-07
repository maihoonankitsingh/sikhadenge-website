import Script from "next/script";

export function GoogleConsentDefaults() {
  return (
    <Script id="google-consent-defaults" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function gtag(){
          window.dataLayer.push(arguments);
        };

        if (!window.__sdGoogleConsentDefaultSet) {
          window.gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            wait_for_update: 500
          });

          window.__sdGoogleConsentDefaultSet = true;
        }
      `}
    </Script>
  );
}
