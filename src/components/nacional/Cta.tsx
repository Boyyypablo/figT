import { officialHref } from '@/lib/officialHref';
import { ArrowUpRight } from 'lucide-react';
/**
 * Botão de chamada (CTA) único do site: rótulo grande em Schibsted 800 + disco com seta.
 * No hover/foco a seta sai pelo canto superior direito e outra entra pelo canto oposto.
 *
 * - `tamanho`: `g` (hero e fechamento de página), `m` (seções) e `p` (dentro de cartão ou em linha).
 * - `sobre`: `claro` para fundo claro (texto escuro, disco escuro) e `escuro` para foto/fundo escuro
 *   (texto branco, disco branco). Com movimento reduzido só a cor muda.
 * - Link interno usa `next/link`; endereço externo abre em nova aba.
 */
export function Cta({ href, children, tamanho = 'm', sobre = 'claro', externo, }: {
    href?: string | null;
    children: React.ReactNode;
    tamanho?: 'g' | 'm' | 'p';
    sobre?: 'claro' | 'escuro';
    externo?: boolean;
}) {
    const fora = externo ?? /^https?:\/\//.test(href ?? '');
    const classe = `mt-cta mt-cta--${tamanho} mt-cta--${sobre}`;
    const conteudo = (<>
      <span className="mt-cta__rotulo">{children}</span>
      <span className="mt-cta__disco" aria-hidden>
        <ArrowUpRight className="mt-cta__seta is-saindo" strokeWidth={2.25}/>
        <ArrowUpRight className="mt-cta__seta is-entrando" strokeWidth={2.25}/>
      </span>
    </>);
    if (!href?.trim())
        return <span className={classe}>{conteudo}</span>;
    return fora ? (<a className={classe} href={officialHref(href)} target="_blank" rel="noreferrer">{conteudo}</a>) : (<a className={classe} href={officialHref(href)}>{conteudo}</a>);
}
