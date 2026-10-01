import { groupWorks, type Work } from './data/works';
import { site } from './data/site';

function WorkItem({work}:{work:Work}) {
  const thumbnail=work.thumbnail?.trim();
  const url=work.url?.trim();
  return <article>
    {thumbnail&&<img src={thumbnail} alt={work.thumbnailAlt||work.title} loading="lazy" width="800" height="600"/>}
    <h4>{work.title}</h4>
    <p>{work.description}</p>
    <p>{site.ui.scope}：{work.scope}</p>
    {work.type==='original'&&<small>{site.ui.original}</small>}
    {url&&<a href={url} target="_blank" rel="noopener noreferrer">{site.ui.view}<span aria-hidden="true">↗</span><span className="sr-only">（{site.externalNote}）</span></a>}
  </article>;
}

export function Works({items}:{items:readonly Work[]}) {
  const groups=groupWorks(items);
  if(!groups.length)return null;
  return <section id="works" className="section works" aria-labelledby="works-title">
    <div className="section-heading"><p className="section-index" aria-hidden="true"><span>03</span><i/></p><h2 id="works-title">{site.labels.works}</h2></div>
    {groups.map(group=><section className="work-group" key={group.id} aria-labelledby={`works-${group.id}`}>
      <h3 id={`works-${group.id}`}>{group.label}</h3>
      <div className="work-grid">{group.items.slice(0,group.initialCount).map(work=><WorkItem key={work.id} work={work}/>)}</div>
      {group.items.length>group.initialCount&&<details className="work-more">
        <summary>もっと見る<span>（残り{group.items.length-group.initialCount}件）</span><span className="sr-only">：{group.label}</span></summary>
        <div className="work-grid">{group.items.slice(group.initialCount).map(work=><WorkItem key={work.id} work={work}/>)}</div>
      </details>}
    </section>)}
  </section>;
}
