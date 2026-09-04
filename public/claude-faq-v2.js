(() => {
  "use strict";

  if (location.pathname !== "/masterclass/claude/free") return;
  if (window.__CLAUDE_FAQ_V2__) return;
  window.__CLAUDE_FAQ_V2__ = true;

  const STYLE_ID = "sd-claude-faq-v2-style";
  const SECTION_ATTR = "data-sd-claude-faq-v2";
  const ROOT_ATTR = "data-claude-faq-v2";
  const HEADING_TEXT = "Frequently asked questions.";

  const faqs = [
    {
      q: "Is this AI tools masterclass really free?",
      a: "Yes. The current masterclass registration on this page is free. Reserve your seat through the registration button on this page."
    },
    {
      q: "Do I need coding experience?",
      a: "No. The masterclass is designed to be beginner-friendly and does not require coding experience. The focus is on practical use of AI tools and workflows."
    },
    {
      q: "Which language is used?",
      a: "The session is explained in simple, easy-to-follow language so beginners, students and working professionals can follow the practical steps comfortably."
    },
    {
      q: "Do I need paid AI subscriptions?",
      a: "No paid AI subscription is required to understand or follow the masterclass. Some AI tools may offer optional paid plans, but the session is structured so you can start with accessible options."
    },
    {
      q: "Where will I get the joining details?",
      a: "After registration, follow the confirmation instructions shown in the registration flow. Your joining details are provided through the registered contact flow."
    },
    {
      q: "Is SikhaDenge affiliated with Anthropic?",
      a: "No. SikhaDenge is an independent learning platform and is not affiliated with or endorsed by Anthropic. Tool and brand names are used for educational reference."
    },
    {
      q: "Who is this masterclass for?",
      a: "It is designed for students, freshers, job seekers, freelancers, creators, business owners and working professionals who want to use AI more effectively in real work."
    },
    {
      q: "Is this masterclass beginner-friendly?",
      a: "Yes. The learning flow starts from practical basics and moves step by step, so even first-time AI learners can follow along."
    },
    {
      q: "Is the session practical or only theory?",
      a: "The session is practical. The page is built around learning AI tools by doing, with live, step-by-step workflows rather than theory-only explanations."
    },
    {
      q: "What will I learn in this masterclass?",
      a: "You will learn how to use modern AI tools for better prompting, faster execution, structured work, research, content and everyday productivity workflows."
    },
    {
      q: "Will I learn how to work with multiple AI tools?",
      a: "Yes. This masterclass introduces a multi-tool approach so you can understand which AI tool or workflow fits a particular task instead of relying on only one tool."
    },
    {
      q: "Does this masterclass cover 25+ AI tools?",
      a: "Yes. The page is structured around learning 25+ AI tools and understanding how they can support smarter work, faster execution and better results."
    },
    {
      q: "Is this useful for working professionals?",
      a: "Yes. A core focus of the masterclass is helping working professionals use AI for faster execution, clearer workflows and more efficient day-to-day digital work."
    },
    {
      q: "Is this only for technical learners?",
      a: "No. The session is designed for non-technical learners as well. You can follow the practical workflows without a programming background."
    },
    {
      q: "How do I reserve my free seat?",
      a: "Use any “Reserve My Free Seat” or registration button on this page and complete the registration flow. The registration destination remains the same as the rest of this page."
    }
  ];

  const normalize = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const esc = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html body section[${SECTION_ATTR}="1"] {
        background:
          radial-gradient(circle at 50% 0%, rgba(215,110,75,.075), transparent 30%),
          #FCF9F6 !important;
        padding: 84px 24px 92px !important;
        overflow: clip !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-shell {
        width: min(100%, 920px) !important;
        margin: 0 auto !important;
        font-family: "__manrope_a43dd5", "__manrope_Fallback_a43dd5", Manrope, sans-serif !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-head {
        text-align: center !important;
        margin: 0 0 36px !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-eyebrow {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 40px !important;
        margin: 0 0 12px !important;
        padding: 0 19px !important;
        border: 1px solid rgba(215,110,75,.36) !important;
        border-radius: 999px !important;
        background: rgba(255,255,255,.72) !important;
        color: #BF5234 !important;
        font-size: 12px !important;
        line-height: 1 !important;
        font-weight: 720 !important;
        letter-spacing: .12em !important;
        text-transform: uppercase !important;
        box-shadow: 0 8px 28px rgba(71,47,37,.045) !important;
      }

      html body section[${SECTION_ATTR}="1"] h2.sd-faq-v2-title {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        color: #1D1917 !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-list {
        display: grid !important;
        gap: 10px !important;
        margin: 0 !important;
      }

      html body section[${SECTION_ATTR}="1"] details.sd-faq-v2-item {
        margin: 0 !important;
        border: 1px solid rgba(63,51,44,.12) !important;
        border-radius: 14px !important;
        background: rgba(255,255,255,.92) !important;
        box-shadow: 0 5px 18px rgba(57,42,34,.035) !important;
        overflow: hidden !important;
        transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease !important;
      }

      html body section[${SECTION_ATTR}="1"] details.sd-faq-v2-item:hover {
        border-color: rgba(215,110,75,.28) !important;
        box-shadow: 0 10px 28px rgba(57,42,34,.065) !important;
      }

      html body section[${SECTION_ATTR}="1"] details.sd-faq-v2-item[open] {
        border-color: rgba(215,110,75,.34) !important;
        box-shadow: 0 12px 34px rgba(84,50,36,.075) !important;
      }

      html body section[${SECTION_ATTR}="1"] summary.sd-faq-v2-question {
        position: relative !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 18px !important;
        min-height: 62px !important;
        padding: 17px 18px 17px 20px !important;
        color: #2B2521 !important;
        font-size: 15px !important;
        line-height: 1.42 !important;
        font-weight: 650 !important;
        letter-spacing: -.012em !important;
        cursor: pointer !important;
        list-style: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }

      html body section[${SECTION_ATTR}="1"] summary.sd-faq-v2-question::-webkit-details-marker {
        display: none !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-icon {
        position: relative !important;
        flex: 0 0 28px !important;
        width: 28px !important;
        height: 28px !important;
        border: 1px solid rgba(215,110,75,.3) !important;
        border-radius: 8px !important;
        background: #FFF9F6 !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-icon::before,
      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-icon::after {
        content: "" !important;
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        width: 9px !important;
        height: 1.6px !important;
        border-radius: 999px !important;
        background: #D76E4B !important;
        transform: translate(-50%,-50%) !important;
        transition: transform .2s ease, opacity .2s ease !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-icon::after {
        transform: translate(-50%,-50%) rotate(90deg) !important;
      }

      html body section[${SECTION_ATTR}="1"] details[open] .sd-faq-v2-icon::after {
        opacity: 0 !important;
        transform: translate(-50%,-50%) rotate(0deg) !important;
      }

      html body section[${SECTION_ATTR}="1"] .sd-faq-v2-answer {
        margin: 0 58px 0 20px !important;
        padding: 0 0 19px !important;
        color: #746C67 !important;
        font-size: 14px !important;
        line-height: 1.68 !important;
        font-weight: 480 !important;
        letter-spacing: -.006em !important;
      }

      html body section[${SECTION_ATTR}="1"] details[open] .sd-faq-v2-answer {
        animation: sdFaqV2In .2s ease both !important;
      }

      @keyframes sdFaqV2In {
        from { opacity: 0; transform: translateY(-3px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 768px) {
        html body section[${SECTION_ATTR}="1"] {
          padding: 68px 18px 76px !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-faq-v2-head {
          margin-bottom: 28px !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-faq-v2-list {
          gap: 9px !important;
        }
        html body section[${SECTION_ATTR}="1"] summary.sd-faq-v2-question {
          min-height: 58px !important;
          padding: 15px 14px 15px 16px !important;
          font-size: 14px !important;
          line-height: 1.42 !important;
          gap: 12px !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-faq-v2-icon {
          flex-basis: 26px !important;
          width: 26px !important;
          height: 26px !important;
          border-radius: 7px !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-faq-v2-answer {
          margin: 0 42px 0 16px !important;
          padding-bottom: 16px !important;
          font-size: 13.5px !important;
          line-height: 1.62 !important;
        }
      }

      @media (max-width: 430px) {
        html body section[${SECTION_ATTR}="1"] {
          padding-left: 14px !important;
          padding-right: 14px !important;
        }
        html body section[${SECTION_ATTR}="1"] details.sd-faq-v2-item {
          border-radius: 12px !important;
        }
        html body section[${SECTION_ATTR}="1"] .sd-faq-v2-answer {
          margin-right: 16px !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        html body section[${SECTION_ATTR}="1"] details.sd-faq-v2-item,
        html body section[${SECTION_ATTR}="1"] .sd-faq-v2-icon::before,
        html body section[${SECTION_ATTR}="1"] .sd-faq-v2-icon::after,
        html body section[${SECTION_ATTR}="1"] details[open] .sd-faq-v2-answer {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function findFaqSection() {
    const heading = [...document.querySelectorAll("h2")]
      .find((node) => normalize(node.textContent) === HEADING_TEXT);
    return heading ? heading.closest("section") : null;
  }

  function render() {
    const section = findFaqSection();
    if (!section) return false;
    if (section.getAttribute(SECTION_ATTR) === "1") return true;

    ensureStyle();

    section.setAttribute(SECTION_ATTR, "1");
    section.innerHTML = `
      <div class="sd-faq-v2-shell">
        <div class="sd-faq-v2-head">
          <div class="sd-faq-v2-eyebrow" aria-hidden="true">FAQ</div>
          <h2 class="sd-faq-v2-title">Frequently asked questions.</h2>
        </div>
        <div class="sd-faq-v2-list" data-sd-faq-count="${faqs.length}">
          ${faqs.map((item, index) => `
            <details class="sd-faq-v2-item"${index === 0 ? " open" : ""}>
              <summary class="sd-faq-v2-question">
                <span>${esc(item.q)}</span>
                <span class="sd-faq-v2-icon" aria-hidden="true"></span>
              </summary>
              <p class="sd-faq-v2-answer">${esc(item.a)}</p>
            </details>
          `).join("")}
        </div>
      </div>
    `;

    section.addEventListener("toggle", (event) => {
      const current = event.target;
      if (!(current instanceof HTMLDetailsElement) || !current.open) return;
      section.querySelectorAll("details.sd-faq-v2-item[open]").forEach((node) => {
        if (node !== current) node.removeAttribute("open");
      });
    }, true);

    document.documentElement.setAttribute(ROOT_ATTR, String(faqs.length));
    return true;
  }

  function boot() {
    render();
    [500, 1200, 2400, 4500, 8000, 13000].forEach((ms) => setTimeout(render, ms));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
