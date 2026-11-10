import { BarChart3, Brain, Globe, Mail, Phone, ShieldCheck, Smartphone, Users } from 'lucide-react';
import { useEffect } from 'react';
import { Cta } from '@/components/nacional/Cta';
import { Casca } from '../Casca';
import { RecursosCartao } from './RecursosCartao';
import './cartao.css';
const OFICIAL = 'https://cartaodevisita.mutua.com.br/';/** Perfis de exemplo usados no carrossel do site oficial. */
const EXEMPLOS = [
    { n: 'Maria Silva', t: 'Eng. Civil', empresa: 'Silva Construções', marca: 'SILVA', ramo: 'CONSTRUÇÕES', tel: '(61) 99110-2201', email: 'maria@silva.eng.br', site: 'www.silva.eng.br', tema: 'celular' },
    { n: 'Pedro Almeida', t: 'Eng. Agrônomo', empresa: 'Almeida Campo', marca: 'ALMEIDA', ramo: 'CAMPO', tel: '(62) 99220-3312', email: 'pedro@almeida.agr.br', site: 'www.almeida.agr.br', tema: 'mws' },
    { n: 'Ana Costa', t: 'Eng. Ambiental', empresa: 'Costa Ambiental', marca: 'COSTA', ramo: 'AMBIENTAL', tel: '(11) 99330-4423', email: 'ana@costa.eco.br', site: 'www.costa.eco.br', tema: 'mulher' },
    { n: 'Carlos Oliveira', t: 'Eng. Mecânico', empresa: 'Oliveira Máquinas', marca: 'OLIVEIRA', ramo: 'MÁQUINAS', tel: '(31) 99440-5534', email: 'carlos@oliveira.eng.br', site: 'www.oliveira.eng.br', tema: 'hub' },
    { n: 'Fernanda Lima', t: 'Eng. Elétrica', empresa: 'Lima Energia', marca: 'LIMA', ramo: 'ENERGIA', tel: '(41) 99550-6645', email: 'fernanda@lima.eng.br', site: 'www.lima.eng.br', tema: 'verso' },
    { n: 'Roberto Mendes', t: 'Eng. de Produção', empresa: 'Mendes Industrial', marca: 'MENDES', ramo: 'INDUSTRIAL', tel: '(71) 99660-7756', email: 'roberto@mendes.ind.br', site: 'www.mendes.ind.br', tema: 'clube' },
];
/** Repetições para a roda fechar o círculo sem vão. */
const VOLTAS = 2;
const PROJETOS = [
    { nome: 'Mútua Hub de IA', href: 'https://hubdeia.mutua.com.br/', img: 'hub-ia', w: 437, h: 144 },
    { nome: 'Mútua Mulher', href: 'https://www.mutua.com.br/programa-mutua-mulher/', img: 'mutua-mulher', w: 201, h: 160 },
    { nome: 'Mútua Celular', href: 'https://celular.mutua.com.br/', img: 'celular', w: 480, h: 148 },
    { nome: 'Mútua Jr', href: 'https://mutuajunior.com.br/', img: 'mutua-jr', w: 478, h: 151 },
    { nome: 'MútuaVerso', href: 'https://mutuaverso.mutua.com.br/', img: 'mutuaverso', w: 480, h: 127 },
    { nome: 'MWS — Mútua Web Service', href: 'https://mws.mutua.com.br/', img: 'mws', w: 459, h: 160 },
    { nome: 'Mútua Signer', href: 'https://signersite.mutua.com.br/', img: 'signer', w: 372, h: 160 },
];
const POR_QUE = [
    { card: 'digital', Icone: Smartphone, img: '/marca/servicos/cartao/porque-digital.webp', w: 1200, h: 900, t: '100% digital', d: 'Tudo na palma da sua mão. Sem papel, sem complicação.' },
    { card: 'insights', Icone: BarChart3, img: '/marca/servicos/cartao/porque-insights.webp', w: 1200, h: 900, t: 'Insights em tempo real', d: 'Veja quem visualiza seu cartão e acompanhe suas métricas.' },
    { card: 'ia', Icone: Brain, img: '/marca/servicos/cartao/porque-ia.webp', w: 1200, h: 900, t: 'Tecnologia IA', d: 'Inteligência artificial para melhorar seu conteúdo profissional.' },
];
/** Atraso da entrada em cascata: cada passo soma 90ms (ver `[data-revela]` em cartao.css). */
const atraso = (passo: number) => ({ '--d': passo } as React.CSSProperties);
/**
 * Mostra os blocos `[data-revela]` quando entram na tela, uma vez só.
 * Sem IntersectionObserver a classe `revela-ativo` não é aplicada e tudo fica visível.
 */
function useRevelar(seletorRaiz: string) {
    useEffect(() => {
        const raiz = document.querySelector(seletorRaiz);
        if (!raiz || !('IntersectionObserver' in window)) return;
        const observador = new IntersectionObserver((entradas) => {
            for (const entrada of entradas) {
                if (!entrada.isIntersecting) continue;
                entrada.target.classList.add('is-visivel');
                observador.unobserve(entrada.target);
            }
        }, { rootMargin: '0px 0px -10% 0px' });
        raiz.classList.add('revela-ativo');
        raiz.querySelectorAll('[data-revela]').forEach((alvo) => observador.observe(alvo));
        return () => observador.disconnect();
    }, [seletorRaiz]);
}
export function LandingCartao() {
    useRevelar('.sv--cartao-de-visita-digital');
    return (<Casca slug="cartao-de-visita-digital" rodape={<footer className="sv-cv-rodape">
          <div className="mt-wrap sv-cv-rodape__linha">
            <p>© 2026 Mútua — Caixa de Assistência dos Profissionais do Crea · CNPJ 00.509.026/0001-60</p>
            <img src="/marca/servicos/cartao/logos-sistema.webp" alt="Confea, Crea e Mútua" width={1024} height={105} loading="lazy" decoding="async"/>
          </div>
        </footer>}>
      <header className="sv-cv-hero">
        <div className="mt-wrap sv-cv-hero__grade">
          <div className="sv-cv-hero__texto" data-revela="">
            <h1>Seu cartão profissional <span>sempre à mão</span></h1>
            <p>Compartilhe contato, redes sociais e resumo profissional de um jeito moderno e prático. Funciona em qualquer dispositivo, sem instalar nada.</p>
            <Cta href={OFICIAL} tamanho="g">Criar meu cartão digital</Cta>
          </div>
          <img className="sv-cv-hero__mockup" data-revela="imagem" style={atraso(2)} src="/marca/servicos/cartao/celular.webp" alt="Cartão de visita digital aberto no celular" width={1000} height={720}/>
        </div>
      </header>

      <div className="sv-cv-provas-faixa mt-wrap">
        <div className="sv-cv-provas" data-revela="" style={atraso(3)}>
          <div className="sv-cv-provas__grupo">
            <span className="sv-cv-provas__avatares" aria-hidden="true"><span><Users size={22} strokeWidth={2.2}/></span></span>
            <p><b>+19.000 profissionais</b><span>já utilizam o cartão digital Mútua</span></p>
          </div>
          <span className="sv-cv-provas__divisor" aria-hidden="true"/>
          <p className="sv-cv-provas__gratis"><ShieldCheck size={22} strokeWidth={2.2} aria-hidden="true"/>100% gratuito</p>
        </div>
      </div>

      <section className="sv-cv-exemplos" aria-labelledby="cv-exemplos">
        <div className="mt-wrap">
          <h2 id="cv-exemplos" className="sv-cv-titulo" data-revela="">Um cartão para cada <span>profissional</span></h2>
        </div>
        <div className="sv-cv-arco" data-revela="" style={{ '--n': EXEMPLOS.length * VOLTAS, '--d': 1 } as React.CSSProperties}>
          <ul className="sv-cv-arco__roda" aria-label="Exemplos de cartões">
            {Array.from({ length: VOLTAS }, (_, volta) => EXEMPLOS.map((e, i) => (<li key={`${e.n}-${volta}`} style={{ '--i': volta * EXEMPLOS.length + i } as React.CSSProperties} aria-hidden={volta > 0 || undefined}>
                <div className="sv-cv-eixo">
                  <article className="sv-cv-card" data-tema={e.tema}>
                    <header className="sv-cv-card__topo">
                      <div className="sv-cv-card__ident">
                        <b>{e.n}</b>
                        <span className="sv-cv-card__cargo">{e.t}</span>
                        <span className="sv-cv-card__empresa">{e.empresa}</span>
                      </div>
                      <div className="sv-cv-card__marca" aria-hidden>
                        <span className="sv-cv-card__selo">{e.n.split(' ').map((p) => p[0]).join('')}</span>
                        <span className="sv-cv-card__word">
                          <strong>{e.marca}</strong>
                          <small>{e.ramo}</small>
                        </span>
                      </div>
                    </header>
                    <ul className="sv-cv-card__contatos">
                      <li><Phone size={16} strokeWidth={1.7} aria-hidden/><span>{e.tel}</span></li>
                      <li><Mail size={16} strokeWidth={1.7} aria-hidden/><span>{e.email}</span></li>
                      <li><Globe size={16} strokeWidth={1.7} aria-hidden/><span>{e.site}</span></li>
                    </ul>
                  </article>
                </div>
              </li>)))}
          </ul>
        </div>
      </section>

      <section className="sv-cv-secao" aria-labelledby="cv-porque">
        <div className="mt-wrap">
          <h2 id="cv-porque" className="sv-cv-titulo" data-revela="">Por que escolher o <span>cartão digital Mútua?</span></h2>
          <ul className="sv-cv-porque">
            {POR_QUE.map(({ card, Icone, img, w, h, t, d }, i) => (<li key={t} data-card={card} data-revela="" style={atraso(i + 1)}>
                <div className="sv-cv-porque__topo"><h3>{t}</h3><span className="sv-cv-porque__selo"><Icone size={22} strokeWidth={1.8} aria-hidden/></span></div>
                <p>{d}</p>
                <div className="sv-cv-porque__img"><img src={img} alt="" width={w} height={h} loading="lazy" decoding="async"/></div>
              </li>))}
          </ul>
        </div>
      </section>

      <RecursosCartao href={OFICIAL}/>

      <section className="sv-cv-rede" aria-labelledby="cv-fim">
        <div className="mt-wrap sv-cv-rede__topo">
          <h2 id="cv-fim" className="sv-cv-titulo" data-revela="">Pronto para digitalizar sua presença profissional?</h2>
          <p className="sv-cv-intro" data-revela="" style={atraso(1)}>Crie sua conta gratuitamente e comece agora mesmo. O app também pode ser instalado no celular, se você preferir.</p>
        </div>
        <div className="mt-wrap sv-cv-rede__cta" data-revela="" style={atraso(2)}>
          <Cta href={OFICIAL} tamanho="g">Criar meu cartão digital</Cta>
        </div>
        <img className="sv-cv-rede__panorama" data-revela="imagem" style={atraso(3)} src="/marca/servicos/cartao/rede-panorama.webp" alt="" width={1792} height={768} loading="lazy" decoding="async"/>
      </section>

      <section className="sv-cv-projetos" aria-labelledby="cv-projetos">
        <div className="mt-wrap sv-cv-projetos__grade">
          <h2 id="cv-projetos" data-revela="">Conheça o <span>ecossistema Mútua</span></h2>
          <div className="sv-cv-projetos__trilho" data-revela="" style={atraso(1)}>
            <ul className="sv-cv-projetos__lista">
              {[0, 1].map((copia) => PROJETOS.map((p) => (<li key={`${p.href}-${copia}`} aria-hidden={copia > 0 || undefined}>
                  <a href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.nome} (abre em nova aba)`} data-logo={p.img} tabIndex={copia > 0 ? -1 : undefined}>
                    <img src={`/marca/servicos/cartao/projetos/${p.img}.webp`} alt="" width={p.w} height={p.h} loading="lazy" decoding="async"/>
                  </a>
                </li>)))}
            </ul>
          </div>
        </div>
      </section>
    </Casca>);
}
