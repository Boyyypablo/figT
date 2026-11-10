import { officialHref } from '@/lib/officialHref';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import './servicos/base.css';
export type ItemContinuar = {
    nome: string;
    linha?: string;
    href: string;
    cor?: string;
    externo?: boolean;
};
/** Cor da faixa de cada área (peças do mosaico com contraste para o texto branco do hover). */
export const COR_AREA: Partial<Record<string, string>> = { reembolsaveis: '#2140c2', sociais: '#1f2f6b', saude: '#2a4bd7', tecnologicos: '#2140c2', outros: '#0a1733' };
/**
 * Bloco "continuar acessando" do fim das páginas de benefício e de serviço: cards que levam aos
 * outros itens da mesma área. Sem irmãos na área (ex.: Outros, só com Hotéis), mostra as demais áreas.
 */
export function ContinuarAcessando({ titulo, itens, verTodos = { href: '/beneficios', rotulo: 'Ver todos' }, rotulo }: {
    titulo: string;
    itens: ItemContinuar[];
    verTodos?: {
        href: string;
        rotulo: string;
    };
    rotulo?: string;
}) {
    if (!itens.length)
        return null;
    return (<nav className="sv-outros" aria-label={rotulo ?? titulo}>
      <div className="mt-wrap">
        <div className="sv-outros__cabeca">
          <h2 className="sv-sobe">{titulo}</h2>
          <a className="mt-link-seta" href={officialHref(verTodos.href)}>{verTodos.rotulo} <ArrowRight size={18} aria-hidden/></a>
        </div>
        <ul className="sv-outros__lista sv-sobe">
          {itens.map((l) => {
            const corpo = <><strong>{l.nome}</strong>{l.linha && <span>{l.linha}</span>}{l.externo ? <ArrowUpRight className="sv-outros__seta" size={20} aria-hidden/> : <ArrowRight className="sv-outros__seta" size={20} aria-hidden/>}</>;
            return (<li key={l.href + l.nome} style={{ '--cor': l.cor ?? '#2140c2' } as React.CSSProperties}>
                {l.externo ? <a href={officialHref(l.href)} target="_blank" rel="noreferrer">{corpo}</a> : <a href={officialHref(l.href)}>{corpo}</a>}
              </li>);
        })}
        </ul>
      </div>
    </nav>);
}
