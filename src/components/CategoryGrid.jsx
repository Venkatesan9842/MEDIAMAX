const data=['Luxury Villas','Penthouse Suites','Apartments','Beachfront Properties','Golf Course Residences','Commercial Spaces','Townhouses','Waterfront Homes','Holiday Homes','Investment','Eco-friendly Properties','Desert Retreats'];

/* Replace these with your own images (same order as `data`) */
const imgs=[
'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80'
];

const css=`
.category-grid{display:grid;grid-template-columns:repeat(5,1fr);grid-auto-rows:44px;gap:14px;align-items:stretch}
.category-card{position:relative;display:block;overflow:hidden;border-radius:18px;color:#fff;text-decoration:none;background-color:#8aa08f;background-size:cover;background-position:center}
.category-card::before{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.45),rgba(0,0,0,0) 60%)}
.category-card>span{position:absolute;left:14px;bottom:56px;z-index:1;font-size:11px;opacity:.85}
.category-card>b{position:absolute;left:14px;right:40px;bottom:14px;z-index:1;font-size:22px;font-weight:500;line-height:1.1}
.category-card>i{position:absolute;top:12px;right:12px;z-index:1;width:34px;height:34px;border-radius:50%;background:#fff;color:#111;display:grid;place-items:center;font-style:normal;font-size:16px}
.category-cta{grid-column:3;grid-row:14/span 5;display:flex;flex-direction:column;justify-content:center;gap:14px;padding:6px 8px}
.category-cta>div{font-size:22px}
.category-cta p{margin:0;font-size:18px;line-height:1.3}
.discover-button{align-self:flex-start;display:inline-flex;align-items:center;gap:8px;padding:8px 18px 8px 8px;border:0;border-radius:999px;background:#111;color:#fff;cursor:pointer}
.discover-button span{width:28px;height:28px;border-radius:50%;background:#fff;color:#111;display:grid;place-items:center}
.cat-1{grid-column:1;grid-row:2/span 6}
.cat-6{grid-column:1;grid-row:8/span 9}
.cat-2{grid-column:2;grid-row:1/span 5}
.cat-7{grid-column:2;grid-row:6/span 8}
.cat-11{grid-column:2;grid-row:14/span 5}
.cat-3{grid-column:3;grid-row:1/span 4}
.cat-8{grid-column:3;grid-row:5/span 8}
.cat-4{grid-column:4;grid-row:1/span 5}
.cat-9{grid-column:4;grid-row:6/span 5}
.cat-10{grid-column:4;grid-row:11/span 5}
.cat-5{grid-column:5;grid-row:2/span 8}
.cat-12{grid-column:5;grid-row:10/span 6}
@media(max-width:900px){
.category-grid{grid-template-columns:repeat(2,1fr);grid-auto-rows:auto}
.category-card{grid-column:auto!important;grid-row:auto!important;min-height:200px}
.category-cta{grid-column:1/-1;grid-row:auto}
}
`;

export function CategoryGrid(){return <section className="section categories-section"><style>{css}</style><div className="category-grid">{data.map((item,i)=><a className={`category-card cat-${i+1}`} href="#top" key={item} style={{backgroundImage:`url(${imgs[i]})`}}><span>{String(i+1).padStart(2,'0')}</span><b>{item}</b><i>↗</i></a>)}<div className="category-cta"><div>Ⅲ</div><p>Explore Our Diverse<br />Range of Property Types<br />and Find Your Perfect<br />Match</p><button className="discover-button"><span>↘</span> Discover</button></div></div></section>}