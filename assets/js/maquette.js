/* MAQUETTE UNIQUEMENT : navigation, affichage, filtres et fragments HTML.
 * Aucun calcul métier, API, session, stockage, transition de statut ou enregistrement. */
(function(){
 'use strict';const d=document,m=window.EXPORT_MAQUETTE;if(!m)return;let focusBefore=null,selected=document.querySelector('[data-m8-selected]')?.dataset.m8Selected||Object.keys(m.details)[0],tab='pieces',view=m.views.nouvelle?'nouvelle':'actuelle';
 const q=s=>d.querySelector(s),all=s=>[...d.querySelectorAll(s)];
 const mobile=q('#mobile-nav');if(mobile){const list=mobile.querySelector('.mobile-nav-list'),backdrop=d.createElement('div'),panel=d.createElement('div');backdrop.className='mobile-nav-backdrop';panel.className='mobile-nav-panel';panel.innerHTML='<div class="mobile-nav-head"><strong>Navigation</strong><button type="button" class="icon-btn" data-site-action="mobile" aria-label="Fermer le menu de navigation">×</button></div>';if(list)panel.append(list);mobile.replaceChildren(backdrop,panel);d.body.append(mobile);}
 function closeMobile(){if(mobile)mobile.hidden=true;all('[data-site-action="mobile"]').forEach(x=>x.setAttribute('aria-expanded','false'));}
 function unavailable(){let e=q('#export-feedback');if(!e){e=d.createElement('div');e.id='export-feedback';e.className='export-feedback';e.setAttribute('role','status');e.innerHTML='<span>Indisponible dans l\'export statique</span> <button type="button" data-export-close>Fermer</button>';d.body.append(e);}e.hidden=false;}
 let wizardStep=0;function wizard(step){if(!m.wizard?.[step])return;wizardStep=step;q('#view').innerHTML=m.wizard[step];}
 function close(){q('[data-export-layer]')?.remove();d.body.style.overflow='';focusBefore?.focus();}
 function drawer(ref){if(!m.drawers[ref])return unavailable();close();focusBefore=d.activeElement;const e=d.createElement('div');e.className='layer';e.dataset.exportLayer='';e.innerHTML='<div class="layer-backdrop" data-dclose></div><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabindex="-1">'+m.drawers[ref]+'</aside>';d.body.append(e);d.body.style.overflow='hidden';e.querySelector('.drawer').focus();}
 function detail(){if(!selected||!m.details[selected])return;const el=q('.m8-detail');if(el)el.innerHTML=m.details[selected][tab];all('[data-m8-ref]').forEach(e=>{if(e.dataset.m8Ref===selected)e.setAttribute('aria-current','true');else e.removeAttribute('aria-current');});}
 function show(which){if(!m.views[which])return;close();view=which;q('#view').innerHTML=m.views[which];if(which==='nouvelle')detail();}
 function pop(name){const el=q('[data-site-slot="'+name+'"]');if(!el||!m.chrome[name])return;const open=!!el.innerHTML;all('[data-site-slot]').filter(x=>x!==el).forEach(x=>x.innerHTML='');el.innerHTML=open?'':m.chrome[name];q('[data-cf-action="'+name+'"]')?.setAttribute('aria-expanded',String(!open));if(!open)el.querySelector('input,button,a')?.focus();}
 function filter(){
  const field=q('[data-m8-search]')||q('#df-q'),needle=(field?.value||'').toLocaleLowerCase(),status=q('[data-m8-filter="status"]')||q('#df-status');
  all('.m8-queue-item,#df-table tbody tr').forEach(e=>{const statusLabel=status?.selectedOptions?.[0]?.textContent||'',match=!status||!status.value||status.value==='all'||e.textContent.toLocaleLowerCase().includes(statusLabel.toLocaleLowerCase());e.hidden=!match||!e.textContent.toLocaleLowerCase().includes(needle);});
 }
 for(const key of ['name','role','initials'])all('[data-site-'+key+']').forEach(e=>e.textContent=m.labels[key]||e.textContent);
 d.addEventListener('submit',e=>{e.preventDefault();if(m.wizard?.length&&wizardStep<m.wizard.length-1)wizard(wizardStep+1);else unavailable();},true);
 d.addEventListener('change',e=>{if(e.target.matches('input[type=file]')){e.target.value='';unavailable();}else if(e.target.matches('[data-m8-filter],#df-status'))filter();});
 d.addEventListener('input',e=>{if(e.target.matches('[data-m8-search],#df-q'))filter();if(e.target.closest('[data-site-slot="search"]')){const value=e.target.value.toLocaleLowerCase();all('[data-site-slot="search"] a').forEach(a=>a.hidden=!a.textContent.toLocaleLowerCase().includes(value));}});
 d.addEventListener('keydown',e=>{
  if(e.key==='Escape'){close();closeMobile();all('[data-site-slot]').forEach(x=>x.innerHTML='');all('.dd-menu').forEach(x=>x.hidden=true);}
  const layer=q('[data-export-layer]');if(e.key==='Tab'&&layer){const list=[...layer.querySelectorAll('button:not([disabled]),a[href],input,select,textarea,[tabindex="0"]')].filter(x=>!x.hidden),first=list[0],last=list.at(-1);if(e.shiftKey&&d.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&d.activeElement===last){e.preventDefault();first?.focus();}}
  if(e.target.matches('[data-m8-tab]')&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const keys=['pieces','recipients','exchanges','payment','history'];let i=keys.indexOf(e.target.dataset.m8Tab);i=e.key==='Home'?0:e.key==='End'?4:(i+(e.key==='ArrowRight'?1:4))%5;tab=keys[i];detail();q('[data-m8-tab="'+tab+'"]')?.focus();}
 });
 d.addEventListener('click',e=>{
  const b=e.target.closest('button,a,input[type=submit],tr[data-ref]');if(!b)return;
  if(b.matches('[data-export-close]')){q('#export-feedback').hidden=true;return;}
  if(b.matches('[data-dclose]')||e.target.matches('[data-dclose]')){e.preventDefault();close();return;}
  if(b.hasAttribute('data-step')){wizard(Number(b.dataset.step));return;}if(b.dataset.nav==='prev'){wizard(wizardStep-1);return;}if(b.hasAttribute('data-goto')){wizard(Number(b.dataset.goto));return;}
  if(b.dataset.m8View){e.preventDefault();show(b.dataset.m8View);return;}
  if(b.dataset.m8Ref){selected=b.dataset.m8Ref;tab='pieces';detail();return;}
  if(b.dataset.m8Tab){tab=b.dataset.m8Tab;detail();return;}
  if(b.matches('[data-site-action="menu"]')){const el=b.parentElement.querySelector('.dd-menu');if(el){el.hidden=!el.hidden;b.setAttribute('aria-expanded',String(!el.hidden));}return;}
  if(b.matches('[data-site-action="mobile"]')){const el=q('#mobile-nav');if(el){el.hidden=!el.hidden;b.setAttribute('aria-expanded',String(!el.hidden));}return;}
  if(['search-off','account-off','notices-off','panel-off','view-off'].includes(b.dataset.cfAction)){all('[data-site-slot]').forEach(x=>x.innerHTML='');close();return;}
  if(['account','notices','search'].includes(b.dataset.cfAction)){pop(b.dataset.cfAction);return;}
  if(b.matches('[data-dd]')){const el=d.getElementById(b.dataset.dd);if(el)el.hidden=!el.hidden;return;}
  const ref=b.dataset.goRef||b.dataset.ref;if(ref&&m.drawers[ref]){e.preventDefault();drawer(ref);return;}
  if(b.matches('[data-back-to-top],[data-action="home-top"]')){window.scrollTo({top:0,behavior:'smooth'});return;}
  if(b.dataset.action==='ws-page'&&m.urls[b.dataset.page]){window.location.href=m.urls[b.dataset.page];return;}
  if(b.matches('[data-m8-group]')){const v=b.dataset.m8Group;all('[data-m8-group]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));all('.m8-queue-item').forEach(x=>{const text=x.textContent;x.hidden=v==='todo'?!/SOUMIS|APPROUVE|EN_ETUDE/.test(text):v==='wait'?!/LISTE_NOTIFIEE|ORDRE_EMIS/.test(text):v==='hand'?!/PAYE|MEDAILLES_REMISES|CEREMONIE_PLANIFIEE|CLOTURE/.test(text):false;});return;}
  if(b.matches('a[href]')&&!b.hasAttribute('data-export-unavailable')&&!b.hasAttribute('download'))return;
  e.preventDefault();unavailable();
 });
 d.addEventListener('click',e=>{if(e.target.matches('.layer-backdrop'))close();if(e.target.matches('.mobile-nav-backdrop'))closeMobile();});
 // L'URL permet de partager la présentation, pas une opération ou une permission.
 const params=new URL(window.location.href).searchParams;if(m.views.nouvelle&&params.get('vue')==='actuelle')show('actuelle');if(params.get('ref')&&m.drawers[params.get('ref')]){selected=params.get('ref');if(view==='nouvelle')detail();else drawer(selected);}
})();
