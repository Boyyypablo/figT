import { officialHref } from '@/lib/officialHref';
import { buscarLanding, landings } from '@/data/servicos';
import { ContinuarAcessando } from '../ContinuarAcessando';
import './base.css';
/**
 * Casca da landing: a página com a identidade própria do serviço (classe `sv--<slug>` + fonte) e,
 * no fim, o bloco "continuar acessando" com os outros serviços do mesmo grupo.
 * Quem passa `rodape` troca esse bloco final pelo próprio rodapé.
 * Topo e menu ficam por conta do site que receber a landing.
 */
export function Casca({ slug, classe = '', rodape, children }: {
    slug: string;
    classe?: string;
    rodape?: React.ReactNode;
    children: React.ReactNode;
}) {
    const atual = buscarLanding(slug);
    const outros = landings.filter((l) => l.slug !== slug && l.grupo === atual?.grupo);
    const programa = atual?.grupo === 'programas';
    return (<main className={`sv sv--${slug} ${classe}`}>
      {children}
      {rodape ?? <ContinuarAcessando titulo={programa ? 'Outros programas' : 'Mais tecnologia para sua profissão'} verTodos={{ href: programa ? '/programas' : '/beneficios#tecnologicos', rotulo: 'Ver todos' }} itens={outros.map((l) => ({ nome: l.nome, linha: l.linha, href: l.href, cor: l.cor }))}/>}
    </main>);
}
/** Trilha de navegação no topo de cada landing. */
export function Trilha({ nome, grupo }: {
    nome: string;
    grupo: 'tecnologicos' | 'programas';
}) {
    return (<nav className="sv-trilha" aria-label="Você está aqui">
      <a href={officialHref("/")}>Início</a><span aria-hidden>/</span>
      {grupo === 'programas' ? <a href={officialHref("/programas")}>Programas</a> : <><a href={officialHref("/beneficios")}>Benefícios</a><span aria-hidden>/</span><a href={officialHref("/beneficios#tecnologicos")}>Tecnológicos</a></>}
      <span aria-hidden>/</span><span aria-current="page">{nome}</span>
    </nav>);
}
