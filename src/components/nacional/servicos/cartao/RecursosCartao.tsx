import { BarChart3, Bookmark, LayoutTemplate, Palette, QrCode, Search, Share2, Sparkles, Users } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate } from 'animejs/animation';
import { onScroll } from 'animejs/events';
import { createScope } from 'animejs/scope';
import { stagger } from 'animejs/utils';
import { waapi } from 'animejs/waapi';
import { Cta } from '@/components/nacional/Cta';

type Chave = 'criar' | 'compartilhar' | 'acompanhar';
const RECURSOS: { chave: Chave; grupo: string; itens: { Icone: typeof Palette; t: string; d: string }[] }[] = [
    { chave: 'criar', grupo: 'Criar', itens: [
            { Icone: Palette, t: 'Cartão personalizado', d: 'Templates exclusivos e cores personalizadas.' },
            { Icone: LayoutTemplate, t: 'Design profissional', d: 'Templates modernos com preview em tempo real.' },
            { Icone: Sparkles, t: 'IA para resumo', d: 'Melhore seu resumo profissional automaticamente.' },
        ] },
    { chave: 'compartilhar', grupo: 'Compartilhar', itens: [
            { Icone: QrCode, t: 'QR Code', d: 'Gere QR Codes para eventos, obras e reuniões.' },
            { Icone: Share2, t: 'WhatsApp, LinkedIn e mais', d: 'Envie o cartão por onde você já conversa.' },
            { Icone: Search, t: 'Busca de profissionais', d: 'Encontre associados por nome, área de atuação ou número de registro.' },
            { Icone: Users, t: 'Networking facilitado', d: 'Compartilhe seu cartão e expanda sua rede de contatos.' },
        ] },
    { chave: 'acompanhar', grupo: 'Acompanhar', itens: [
            { Icone: BarChart3, t: 'Métricas e analytics', d: 'Visualizações, cliques e desempenho do seu cartão.' },
            { Icone: Bookmark, t: 'Salvar cartões', d: 'Organize os cartões de outros profissionais em um só lugar.' },
        ] },
];
const REDUZIDO = '(prefers-reduced-motion: reduce)';
const reduzido = () => matchMedia(REDUZIDO).matches;
const crescimento = (el: HTMLElement) => parseFloat(getComputedStyle(el).flexGrow) || 0;
const subida = (distancia: number) => ({ opacity: [0, 1], transform: [`translateY(${distancia}px)`, 'translateY(0px)'] });
/**
 * "Crie, compartilhe e acompanhe": sempre há um cartão em destaque, que ganha largura e mostra as descrições.
 * A troca anima só `flex-grow` e a altura da lista; os detalhes entram depois de 40% do movimento,
 * quando o cartão já está largo o bastante para o texto não quebrar em muitas linhas.
 */
export function RecursosCartao({ href }: { href: string }) {
    const [ativo, setAtivo] = useState<Chave>('criar');
    const secao = useRef<HTMLElement>(null);
    const titulo = useRef<HTMLHeadingElement>(null);
    const lista = useRef<HTMLOListElement>(null);
    const antes = useRef<{ grow: number[]; altura: number } | null>(null);
    const cartoes = () => Array.from(lista.current?.children ?? []) as HTMLElement[];

    useEffect(() => {
        const escopo = createScope({ root: secao, mediaQueries: { reduzido: REDUZIDO } }).add((s) => {
            if (!titulo.current || !lista.current || s?.matches.reduzido) return;
            waapi.animate(titulo.current, { ...subida(56), duration: 900, ease: 'outQuint', autoplay: onScroll({ target: titulo.current, enter: '85% top', sync: 'play', repeat: false }) });
            waapi.animate(cartoes(), { ...subida(56), duration: 800, delay: stagger(90), ease: 'outQuint', autoplay: onScroll({ target: lista.current, enter: '85% top', sync: 'play', repeat: false }) });
        });
        return () => escopo.revert();
    }, []);

    const escolher = (chave: Chave) => {
        if (chave === ativo) return;
        antes.current = { grow: cartoes().map(crescimento), altura: lista.current?.offsetHeight ?? 0 };
        setAtivo(chave);
    };

    useLayoutEffect(() => {
        const de = antes.current;
        antes.current = null;
        const raiz = lista.current;
        if (!de || !raiz || reduzido()) return;
        const lis = cartoes();
        const para = lis.map(crescimento);
        const alturaFinal = raiz.offsetHeight;
        const detalhes = Array.from(raiz.querySelectorAll<HTMLElement>(':scope > li[data-ativo="true"] :is(.sv-cv-panfleto__descricao, .sv-cv-panfleto__acao)'));
        detalhes.forEach((el) => { el.style.display = 'none'; });

        let entrada: ReturnType<typeof waapi.animate> | null = null;
        const mostrar = () => {
            if (entrada) return;
            detalhes.forEach((el) => el.style.removeProperty('display'));
            entrada = waapi.animate(detalhes, { ...subida(16), duration: 400, delay: stagger(90), ease: 'outQuint' });
        };
        const limpar = () => {
            lis.forEach((el) => el.style.removeProperty('flex-grow'));
            raiz.style.removeProperty('height');
            raiz.style.removeProperty('overflow');
        };

        raiz.style.overflow = 'clip';
        const largura = animate(lis, {
            flexGrow: (_?: unknown, i = 0) => [de.grow[i], para[i]],
            duration: 600,
            ease: 'outQuint',
            onUpdate: (a) => { if (a.progress >= 0.4) mostrar(); },
            onComplete: () => { mostrar(); limpar(); },
        });
        const altura = de.altura !== alturaFinal
            ? animate(raiz, { height: [de.altura, alturaFinal], duration: 600, ease: 'outQuint', onComplete: limpar })
            : null;

        return () => {
            largura.revert();
            altura?.revert();
            entrada?.revert();
            limpar();
            detalhes.forEach((el) => el.style.removeProperty('display'));
        };
    }, [ativo]);

    return (<section ref={secao} className="sv-cv-secao sv-cv-hq" aria-labelledby="cv-recursos">
      <div className="mt-wrap sv-cv-hq__grade">
        <h2 ref={titulo} id="cv-recursos" className="sv-cv-titulo">Crie, compartilhe e <span>acompanhe</span></h2>
        <ol ref={lista} className="sv-cv-panfletos">
          {RECURSOS.map((g) => {
              const aberto = g.chave === ativo;
              const corpo = `cv-recursos-${g.chave}`;
              return (<li key={g.chave} data-ativo={String(aberto)}>
                <article className="sv-cv-panfleto" onClick={() => escolher(g.chave)}>
                  <h3 className="sv-cv-panfleto__capa">
                    <button type="button" className="sv-cv-panfleto__botao" aria-expanded={aberto} aria-controls={corpo}>{g.grupo}</button>
                  </h3>
                  <ul id={corpo} className="sv-cv-panfleto__corpo">{g.itens.map(({ Icone, t, d }) => (<li key={t}>
                      <span className="sv-cv-panfleto__icone"><Icone size={20} aria-hidden/></span>
                      <div><h4>{t}</h4><p className="sv-cv-panfleto__descricao">{d}</p></div>
                    </li>))}</ul>
                  <div className="sv-cv-panfleto__acao"><Cta href={href} tamanho="p">Criar meu cartão digital</Cta></div>
                </article>
              </li>);
          })}
        </ol>
      </div>
    </section>);
}
