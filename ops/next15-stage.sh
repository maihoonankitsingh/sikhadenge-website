#!/usr/bin/env bash
set -Eeuo pipefail
export PM2_HOME=/root/.pm2

ACTIVE='/var/www/sikhadenge.in/releases/sitewide-manrope-font-20260902-231335'
CAND='/var/www/sikhadenge.in/candidates/next15-maintenance-lts-20260904'
APP='sikhadenge-next15-candidate-3995'
PORT=3995

test -d "$ACTIVE"
pm2 delete "$APP" >/dev/null 2>&1 || true
if ss -ltn | grep -qE ":${PORT}\\b"; then
  echo "candidate port ${PORT} already occupied"
  exit 20
fi

echo '===== COPY ACTIVE RELEASE ====='
rm -rf "$CAND"
mkdir -p "$CAND"
rsync -a --delete --exclude=node_modules --exclude=.next "$ACTIVE/" "$CAND/"
rm -rf "$CAND/node_modules" "$CAND/.next"

echo '===== UPGRADE DEPENDENCIES ====='
node - "$CAND/package.json" <<'NODE'
const fs=require('fs');
const f=process.argv[2];
const p=JSON.parse(fs.readFileSync(f,'utf8'));
p.dependencies=p.dependencies||{};
p.devDependencies=p.devDependencies||{};
p.dependencies.next='15.5.24';
p.dependencies.react='19.2.8';
p.dependencies['react-dom']='19.2.8';
p.devDependencies['@types/react']='^19';
p.devDependencies['@types/react-dom']='^19';
p.devDependencies['eslint-config-next']='15.5.24';
fs.writeFileSync(f,JSON.stringify(p,null,2)+'\n');
NODE

echo '===== APPLY MIGRATION DELTA ====='
python3 - "$CAND" <<'PY'
from pathlib import Path
import re, sys
root=Path(sys.argv[1])

def rw(rel, fn):
    p=root/rel
    if not p.exists(): return
    old=p.read_text()
    new=fn(old)
    if new != old: p.write_text(new)

rw(Path('app/reviews/page.tsx'), lambda s:s.replace('ref: React.RefObject<HTMLDivElement>,','ref: React.RefObject<HTMLDivElement | null>,'))
rw(Path('pages/contact.tsx'), lambda s:s.replace('refs: React.RefObject<HTMLElement>[],','refs: React.RefObject<HTMLElement | null>[],'))

def layout(s):
    hp=r'const Header\s*=\s*dynamic\(\(\)\s*=>\s*import\(["\']\.\./components/Header["\']\),\s*\{\s*ssr:\s*false\s*\}\s*\);'
    fp=r'const Footer\s*=\s*dynamic\(\(\)\s*=>\s*import\(["\']\.\./components/Footer["\']\),\s*\{\s*ssr:\s*false\s*\}\s*\);'
    if re.search(hp,s):
        s=re.sub(hp,'',s)
        if not re.search(r'^import Header from ["\']\.\./components/Header["\'];',s,re.M):
            s='import Header from "../components/Header";\n'+s
    if re.search(fp,s):
        s=re.sub(fp,'',s)
        if not re.search(r'^import Footer from ["\']\.\./components/Footer["\'];',s,re.M):
            s='import Footer from "../components/Footer";\n'+s
    if 'dynamic(' not in s:
        s=re.sub(r'^import dynamic from ["\']next/dynamic["\'];\n?','',s,flags=re.M)
    return s
rw(Path('app/layout.tsx'), layout)

def skill(s):
    old_meta='export function generateMetadata({ params }: { params: { skill: string } }): Metadata {'
    old_page='export default function SkillPage({ params }: { params: { skill: string } }) {'
    if old_meta in s:
        s=s.replace(old_meta,'export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {\n  const { skill } = await params;',1)
    if old_page in s:
        s=s.replace(old_page,'export default async function SkillPage({ params }: SkillPageProps) {\n  const { skill } = await params;',1)
    s=s.replace('params.skill','skill')
    if 'SkillPageProps' in s and 'type SkillPageProps' not in s:
        decl='type SkillPageProps = {\n  params: Promise<{ skill: string }>;\n};\n\n'
        for a in ['export async function generateStaticParams()','export async function generateMetadata','export const dynamicParams']:
            if a in s:
                s=s.replace(a,decl+a,1)
                break
    return s
rw(Path('app/[skill]/page.tsx'), skill)

def blog(s):
    if 'params: Promise<{ slug: string }>' in s: return s
    anchor='export async function generateMetadata({' 
    if anchor in s: s=s.replace(anchor,'type BlogPostProps = {\n  params: Promise<{ slug: string }>;\n};\n\n'+anchor,1)
    s=re.sub(r'export async function generateMetadata\(\{\s*params,?\s*\}:\s*\{\s*params:\s*\{\s*slug:\s*string\s*\};?\s*\}\):\s*Promise<Metadata>\s*\{','export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {\n  const { slug } = await params;',s,count=1)
    s=s.replace('export default function BlogPost({ params }: { params: { slug: string } }) {','export default async function BlogPost({ params }: BlogPostProps) {\n  const { slug } = await params;')
    return s.replace('params.slug','slug')
rw(Path('app/blog/[slug]/page.tsx'), blog)

def expert(s):
    if 'params: Promise<{ slug: string }>' in s: return s
    anchor='export async function generateMetadata'
    if anchor in s: s=s.replace(anchor,'type ExpertPageProps = {\n  params: Promise<{ slug: string }>;\n};\n\n'+anchor,1)
    s=re.sub(r'export async function generateMetadata\(\{ params \}: \{ params: \{ slug: string \} \}\): Promise<Metadata> \{','export async function generateMetadata({ params }: ExpertPageProps): Promise<Metadata> {\n  const { slug } = await params;',s,count=1)
    s=s.replace('export default function ExpertPage({ params }: { params: { slug: string } }) {','export default async function ExpertPage({ params }: ExpertPageProps) {\n  const { slug } = await params;')
    return s.replace('params.slug','slug')
rw(Path('app/expert/[slug]/page.tsx'), expert)

def admin_dashboard(s):
    old='searchParams?: Record<string, string | string[] | undefined>;'
    new='searchParams?: Promise<Record<string, string | string[] | undefined>>;'
    if old in s:
        s=s.replace(old,new,1)
    marker='  const cookieStore = await cookies();'
    if marker in s and 'const resolvedSearchParams = (await searchParams) || {};' not in s:
        s=s.replace(marker,'  const resolvedSearchParams = (await searchParams) || {};\n'+marker,1)
    s=s.replace('searchParams?.','resolvedSearchParams.')
    s=s.replace('searchParams.','resolvedSearchParams.')
    return s
rw(Path('app/admin/dashboard/page.tsx'), admin_dashboard)

def async_cookies(s):
    s=s.replace('const cookieStore = cookies();','const cookieStore = await cookies();')
    s=s.replace('const cookieStore=cookies();','const cookieStore=await cookies();')
    s=s.replace('cookies().get(', '(await cookies()).get(')
    s=s.replace('cookies().has(', '(await cookies()).has(')
    s=s.replace('cookies().getAll(', '(await cookies()).getAll(')
    return s
for p in list(root.rglob('*.ts')) + list(root.rglob('*.tsx')):
    if 'node_modules' in p.parts or '.next' in p.parts: continue
    old=p.read_text(errors='ignore')
    if 'cookies()' not in old: continue
    new=async_cookies(old)
    if new!=old: p.write_text(new)
PY

cd "$CAND"
rm -f package-lock.json
npm install --package-lock-only --ignore-scripts --no-audit --no-fund
npm ci --no-audit --no-fund
npx tsc --noEmit
npm run build
printf 'CAND_NEXT='; node -p "require('./node_modules/next/package.json').version"
printf 'CAND_BUILD_ID='; cat .next/BUILD_ID; echo

pm2 start ./node_modules/.bin/next --name "$APP" -- start -p "$PORT" >/dev/null
ok=0
for i in $(seq 1 30); do
  if curl -fsS --max-time 4 "http://127.0.0.1:${PORT}/" >/tmp/next15-home.html; then ok=1; break; fi
  sleep 1
done
test "$ok" = 1
grep -Fq 'Become an AI Expert' /tmp/next15-home.html

for u in / /about-us /blog /experts /contact /robots.txt /sitemap.xml; do
  code="$(curl -sS -o /tmp/next15-route -w '%{http_code}' --max-time 10 "http://127.0.0.1:${PORT}$u" || true)"
  echo "$code $u"
  case "$u" in
    /contact) test "$code" = 200 -o "$code" = 308 ;;
    *) test "$code" = 200 ;;
  esac
done

echo '===== STAGE SUCCESS: LIVE NGINX STILL ON 3955 ====='
grep -n 'proxy_pass http://127.0.0.1:3955' /etc/nginx/sites-enabled/sikhadenge.in-ssl | head -n 20
