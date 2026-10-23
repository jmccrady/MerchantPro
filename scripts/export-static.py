#!/usr/bin/env python3
"""Export the published Merchant Pro pages to a portable static website."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import argparse, json, re, shutil, subprocess
from urllib.parse import urlsplit
parser=argparse.ArgumentParser()
parser.add_argument('--base-url',default='https://merchant-pro-business-payments.themccrady.chatgpt.site')
args=parser.parse_args();base=args.base_url.rstrip('/')
root=Path(__file__).resolve().parents[1];out=root/'deploy'
if out.exists():shutil.rmtree(out)
out.mkdir();shutil.copytree(root/'public',out,dirs_exist_ok=True)
routes=['','solutions','industries','why-merchant-pro','resources','about','contact','statement-review','privacy','resources/processing-statement','resources/pos-vs-terminal']
assets=set()
def fetch(url):
 return subprocess.check_output(['curl','--fail','--silent','--show-error','--location','--max-time','45',url])
def page(route):
 html=fetch(base+'/'+route).decode()
 html=re.sub(r'<script\b[^>]*>.*?</script>','',html,flags=re.S|re.I)
 html=re.sub(r'<link\b[^>]*(?:as="script"|rel="modulepreload")[^>]*>','',html,flags=re.I)
 html=html.replace(base,'')
 # Navigation has no server dependency in this portable export.
 html=html.replace('</body>','<script src="/navigation.js" defer></script></body>')
 for url in re.findall(r'<link[^>]+href="([^\"]+\.css(?:\?[^\"]*)?)"',html):assets.add(url)
 p=out/route/'index.html';p.parent.mkdir(parents=True,exist_ok=True);p.write_text(html)
 return route or '/'
with ThreadPoolExecutor(max_workers=4) as pool:
 for route in pool.map(page,routes):print('Exported',route,flush=True)
for url in assets:
 path=out/urlsplit(url).path.lstrip('/');path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(fetch(base+url))
(out/'navigation.js').write_text('''const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#main-navigation');function closeMenu(){nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.innerHTML='Menu <span aria-hidden="true">☰</span>';}toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open);toggle.innerHTML=open?'Close <span aria-hidden="true">×</span>':'Menu <span aria-hidden="true">☰</span>';});nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();toggle?.focus();}});''')
redirects=json.loads((root/'legacy-redirects.json').read_text())
(out/'_redirects').write_text(''.join(f"{r['source']} {r['destination']} 301\n" for r in redirects))
(out/'.htaccess').write_text('Options -Indexes\nDirectoryIndex index.html\n<IfModule mod_rewrite.c>\nRewriteEngine On\n'+''.join('RewriteRule ^'+re.escape(r['source'].lstrip('/'))+'/?$ '+r['destination']+' [R=301,L,NE]\n' for r in redirects)+'</IfModule>\n')
print('Ready: deploy/ — upload its contents to the web root.')
