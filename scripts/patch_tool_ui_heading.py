from pathlib import Path
import re

path = Path("/var/www/sikhadenge.space/sikhadenge-website-space/app/[skill]/page.tsx")
text = path.read_text()

old_norm = r'''function normalizeDisplayTitle\(value\?: string\) \{
  if \(!value\) return "";
  return value
    \.replace\(\/\\bai\\b\/gi, "AI"\)
    \.replace\(\/\\bseo\\b\/gi, "SEO"\)
    \.replace\(\/\\bui\\b\/gi, "UI"\)
    \.replace\(\/\\bux\\b\/gi, "UX"\)
    \.replace\(\/\\s\+\/g, " "\)
    \.trim\(\);
\}'''

new_norm = '''function normalizeDisplayTitle(value?: string) {
  if (!value) return "";
  return value
    .replace(/\\bchatgpt\\b/gi, "ChatGPT")
    .replace(/\\bclaude\\b/gi, "Claude")
    .replace(/\\bgemini\\b/gi, "Gemini")
    .replace(/\\bperplexity\\b/gi, "Perplexity")
    .replace(/\\bnano banana\\b/gi, "Nano Banana")
    .replace(/\\bnano-banana\\b/gi, "Nano Banana")
    .replace(/\\bcopilot\\b/gi, "Copilot")
    .replace(/\\bcanva ai\\b/gi, "Canva AI")
    .replace(/\\bcanva-ai\\b/gi, "Canva AI")
    .replace(/\\bcursor\\b/gi, "Cursor")
    .replace(/\\bmidjourney\\b/gi, "Midjourney")
    .replace(/\\belevenlabs\\b/gi, "ElevenLabs")
    .replace(/\\bai\\b/gi, "AI")
    .replace(/\\bseo\\b/gi, "SEO")
    .replace(/\\bui\\b/gi, "UI")
    .replace(/\\bux\\b/gi, "UX")
    .replace(/\\s+/g, " ")
    .trim();
}'''

text = re.sub(old_norm, new_norm, text, flags=re.MULTILINE)

old_heading = r'''function makeRootPageHeading\(title: string\) \{
  const clean = normalizeDisplayTitle\(title\);
  const lower = clean\.toLowerCase\(\);

  if \(
    lower\.includes\("roadmap"\) \|\|
    lower\.includes\("salary"\) \|\|
    lower\.startsWith\("how to "\) \|\|
    lower\.includes\("without coding"\) \|\|
    lower\.includes\("projects"\) \|\|
    lower\.includes\("kaise seekhe"\)
  \) \{
    return clean;
  \}

  const startsWithVowelSound = \/^\(ai\|seo\|ui\|ux\|a\|e\|i\|o\|u\)\/i\.test\(clean\);
  return `How to Become \$\{startsWithVowelSound \? "an" : "a"\} \$\{clean\}`;
\}'''

new_heading = '''function makeRootPageHeading(title: string) {
  const clean = normalizeDisplayTitle(title);
  const lower = clean.toLowerCase();

  const toolKeywords = [
    "chatgpt","claude","gemini","perplexity","nano banana","copilot",
    "canva ai","cursor","midjourney","elevenlabs"
  ];

  if (
    lower.includes("roadmap") ||
    lower.includes("salary") ||
    lower.startsWith("how to ") ||
    lower.includes("without coding") ||
    lower.includes("projects") ||
    lower.includes("kaise seekhe")
  ) {
    return clean;
  }

  if (toolKeywords.some((kw) => lower.includes(kw))) {
    return `${clean} Guide`;
  }

  const startsWithVowelSound = /^(ai|seo|ui|ux|a|e|i|o|u)/i.test(clean);
  return `How to Become ${startsWithVowelSound ? "an" : "a"} ${clean}`;
}'''

text = re.sub(old_heading, new_heading, text, flags=re.MULTILINE)

old_meta = r'''function makeRootMetaTitle\(title: string\) \{
  const clean = normalizeDisplayTitle\(title\);
  const lower = clean\.toLowerCase\(\);

  if \(
    lower\.includes\("roadmap"\) \|\|
    lower\.includes\("salary"\) \|\|
    lower\.startsWith\("how to "\) \|\|
    lower\.includes\("without coding"\) \|\|
    lower\.includes\("projects"\) \|\|
    lower\.includes\("kaise seekhe"\)
  \) \{
    return `\$\{clean\} \| Sikhadenge`;
  \}

  const startsWithVowelSound = \/^\(ai\|seo\|ui\|ux\|a\|e\|i\|o\|u\)\/i\.test\(clean\);
  return `How to Become \$\{startsWithVowelSound \? "an" : "a"\} \$\{clean\} \| Sikhadenge`;
\}'''

new_meta = '''function makeRootMetaTitle(title: string) {
  const clean = normalizeDisplayTitle(title);
  const lower = clean.toLowerCase();

  const toolKeywords = [
    "chatgpt","claude","gemini","perplexity","nano banana","copilot",
    "canva ai","cursor","midjourney","elevenlabs"
  ];

  if (
    lower.includes("roadmap") ||
    lower.includes("salary") ||
    lower.startsWith("how to ") ||
    lower.includes("without coding") ||
    lower.includes("projects") ||
    lower.includes("kaise seekhe")
  ) {
    return `${clean} | Sikhadenge`;
  }

  if (toolKeywords.some((kw) => lower.includes(kw))) {
    return `${clean} Guide | Sikhadenge`;
  }

  const startsWithVowelSound = /^(ai|seo|ui|ux|a|e|i|o|u)/i.test(clean);
  return `How to Become ${startsWithVowelSound ? "an" : "a"} ${clean} | Sikhadenge`;
}'''

text = re.sub(old_meta, new_meta, text, flags=re.MULTILINE)

path.write_text(text)
print("patched", path)
