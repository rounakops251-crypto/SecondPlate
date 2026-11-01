// Mobile menu
var m=document.getElementById('menu'),l=document.getElementById('links');
m.onclick=function(){var o=l.classList.toggle('open');m.setAttribute('aria-expanded',o)};
l.onclick=function(e){if(e.target.tagName==='A')l.classList.remove('open')};
// Carousels
function carousel(id,ms){var c=document.getElementById(id),t=c.querySelector('.track'),n=t.children.length,i=0,
ctl=document.querySelector('[data-for='+id+']'),dw=ctl.querySelector('.dots'),b=ctl.querySelectorAll('.arrow'),ds=[],timer;
for(var k=0;k<n;k++)(function(k){var d=document.createElement('button');d.className='dot';d.setAttribute('aria-label','Slide '+(k+1));d.onclick=function(){go(k);rs()};dw.appendChild(d);ds.push(d)})(k);
function go(x){i=(x+n)%n;t.style.transform='translateX(-'+i*100+'%)';ds.forEach(function(d,j){d.classList.toggle('on',j===i)})}
function rs(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(function(){go(i+1)},ms)}
b[0].onclick=function(){go(i-1);rs()};b[1].onclick=function(){go(i+1);rs()};
var x0;c.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
c.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40){go(i+(d<0?1:-1));rs()}});
go(0);rs()}
carousel('car1',6000);carousel('car2',5000);
// Donation form
document.getElementById('dform').onsubmit=function(e){e.preventDefault();document.getElementById('ok').textContent='Thank you. Nearby NGOs have been notified.';e.target.reset()};
// React recipe finder
var h=React.createElement,
ING=['Rice','Bread','Potato','Dal','Tomato','Onion','Egg','Paneer','Roti','Spinach'],
REC=[{n:'Veg fried rice',i:['Rice','Onion','Egg'],t:'15 min',d:'Stir-fry cold rice with onion and scrambled egg.'},
{n:'Bread upma',i:['Bread','Onion','Tomato'],t:'10 min',d:'Crumble bread and toss with onion, tomato and spices.'},
{n:'Aloo tikki',i:['Potato','Onion'],t:'20 min',d:'Mash potato, shape into patties and pan-fry until crisp.'},
{n:'Dal paratha',i:['Dal','Roti','Onion'],t:'15 min',d:'Stuff leftover dal into roti dough and roast on a tawa.'},
{n:'Egg bhurji toast',i:['Egg','Bread','Tomato'],t:'10 min',d:'Spiced scrambled egg served on crisp toasted bread.'},
{n:'Paneer roti roll',i:['Paneer','Roti','Onion'],t:'12 min',d:'Wrap sautéed paneer and onion in a leftover roti.'},
{n:'Palak rice bowl',i:['Spinach','Rice','Tomato'],t:'18 min',d:'Fold wilted spinach and tomato through leftover rice.'},
{n:'Potato dal curry',i:['Potato','Dal','Tomato'],t:'25 min',d:'Simmer diced potato into leftover dal for a thick curry.'}];
function App(){var s=React.useState([]),sel=s[0],set=s[1];
function tog(x){set(sel.includes(x)?sel.filter(function(y){return y!==x}):sel.concat(x))}
var res=REC.map(function(r){var k=r.i.filter(function(x){return sel.includes(x)}).length;return{r:r,k:k}}).filter(function(o){return o.k>0}).sort(function(a,b){return b.k/b.r.i.length-a.k/a.r.i.length}).slice(0,4);
return h(React.Fragment,null,
h('div',{className:'chips'},ING.map(function(x){return h('button',{key:x,className:'chip','aria-pressed':sel.includes(x),onClick:function(){tog(x)}},x)})),
res.length?res.map(function(o){return h('div',{className:'rec',key:o.r.n},h('h3',null,o.r.n,h('small',null,o.k+' of '+o.r.i.length+' ingredients · '+o.r.t)),h('p',null,o.r.d))}):h('p',{className:'lead'},'Choose at least one ingredient to see recipes.'))}
ReactDOM.createRoot(document.getElementById('app')).render(h(App));

(function(){
var root=document.documentElement;root.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
// Scroll-reveal with stagger
var groups=['.stats>div','.steps li','.feats .feat','details'];
var sel='section h2,section .lead,.stats,.finder,.split>div,form,.tcar,footer .wrap>div';
document.querySelectorAll(sel).forEach(function(el){if(!el.closest('.hero .slide'))el.classList.add('reveal')});
groups.forEach(function(g){document.querySelectorAll(g).forEach(function(el,i){el.classList.add('reveal');el.style.setProperty('--d',(i%4)*0.09+'s')})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
// Count-up stats
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var b=e.target,m=b.textContent.match(/^(\d+)(.*)$/);if(!m||reduce)return;var n=+m[1],t0=null;function f(t){t0=t0||t;var p=Math.min((t-t0)/1200,1),v=Math.round(n*(1-Math.pow(1-p,3)));b.textContent=v+m[2];if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.6});
document.querySelectorAll('.stats b').forEach(function(b){if(b.textContent.indexOf('/')<0)cio.observe(b)});
// Scroll progress + header shadow
var bar=document.createElement('div');bar.id='progress';document.body.appendChild(bar);
var hdr=document.querySelector('header'),tick=false;
function upd(){var h=root.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')';hdr.classList.toggle('scrolled',scrollY>8);tick=false}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
// Smooth anchor scrolling (offset handled by scroll-padding-top)
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;var t=document.querySelector(a.getAttribute('href'));if(!t)return;e.preventDefault();t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});history.replaceState(null,'',a.getAttribute('href'))});
})();
