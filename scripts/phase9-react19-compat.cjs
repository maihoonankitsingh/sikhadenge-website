const fs = require('node:fs');

const patches = [
  {
    file: 'app/reviews/page.tsx',
    from: 'ref: React.RefObject<HTMLDivElement>,',
    to: 'ref: React.RefObject<HTMLDivElement | null>,',
  },
  {
    file: 'pages/contact.tsx',
    from: 'refs: React.RefObject<HTMLElement>[],',
    to: 'refs: React.RefObject<HTMLElement | null>[],',
  },
];

for (const patch of patches) {
  const source = fs.readFileSync(patch.file, 'utf8');
  if (source.includes(patch.to)) {
    console.log(`${patch.file}: already migrated`);
    continue;
  }
  if (!source.includes(patch.from)) {
    throw new Error(`${patch.file}: expected React 18 ref signature not found`);
  }
  fs.writeFileSync(patch.file, source.replace(patch.from, patch.to));
  console.log(`${patch.file}: migrated React 19 ref signature`);
}
