# Cartão de Visita Digital — projeto independente para Lovable

## Instrução para a IA do Lovable

Use este projeto como referência de implementação e design para adaptar o site oficial https://cartaodevisita.mutua.com.br/. Preserve o conteúdo, a ordem das seções, as imagens, a hierarquia tipográfica, os estados interativos e a identidade desta landing. Integre as funções reais do site de destino aos componentes existentes sem redesenhar a página. Não substitua as imagens por imagens genéricas nem converta esta página em um template genérico de SaaS.

Apresentação do cartão profissional gratuito, com mockup, seis perfis demonstrativos, vantagens, recursos e chamadas para criação do cartão.

Referência capturada: `http://localhost:4300/beneficios/tecnologicos/cartao-de-visita-digital`, em 21/10/2026. O código foi copiado do front Next.js; este projeto funciona sozinho com React, Vite, TypeScript e Tailwind CSS 4. Não exige Next.js, backend, editor, painel nem arquivos das outras exportações.

## Executar

Requer Node.js 20.19+ ou 22.12+ e npm; validação realizada com Node.js 24.16.0.

```sh
npm install
npm run dev
npm run build
```

Para escolher porta: `npm run dev -- --port 5181`. O build executa TypeScript antes de gerar `dist/`. O projeto usa apenas CSS, React e dependências necessárias, sem servidor próprio de dados. O arquivo `package-lock.json` fixa a instalação validada.

## Estrutura

- `src/main.tsx`: entrada e ordem dos estilos globais.
- `src/App.tsx`: wrapper `.site-mutua` e a landing (sem topo, menu, rodapé ou botão de WhatsApp).
- `src/components/nacional/servicos/cartao/`: landing, estilos e interações específicas.
- `src/components/nacional/servicos/Casca.tsx`: conteúdo da landing, trilha e recomendações de outros serviços.
- `src/components/nacional/servicos/base.css`: trilha, animações de entrada e recomendações.
- `src/components/nacional/`: `Cta` e `ContinuarAcessando`, compartilhados pela landing.
- `src/data/`: `servicos.ts` (cards de recomendação, só serviços atuais) e dados auxiliares da landing.
- `src/app/(nacional)/`: CSS nacional e de páginas copiado.
- `src/styles/`: estilos visuais de seções; nenhum runtime do editor.
- `public/`: somente as imagens usadas pela landing, conservando caminhos da origem.
- `design-tokens.css`: variáveis de fontes e tokens com escopos/condições originais preservados.
- `design-tokens.json`: tokens essenciais (cores, tipografia, espaçamentos, raios, sombras, motion), coerentes com `design-tokens.css`.
- `MANIFESTO.json`: rastreabilidade de fontes, assets e dependências.

## Design system

Paleta institucional: azul `#2140C2`, azul forte `#1832A0`, azul claro `#3A58D6`, noite `#0A1733`, noite secundária `#13244A`, gelo `#E6ECFA`, borda gelo `#C9D3EC`, branco `#FFFFFF`, tinta `#0C1424`, tinta secundária `#4B5670`, linha `#D9DFEC` e verde `#3E9B48`.

Paleta do serviço: Azul #0854AA; azul claro #3B82F6; verde #10B981; ouro #EAB308; noite #0F172A; cinza #475569; fundo #F1F5FB.

Tipografia: Schibsted Grotesk 500/700/800 nos títulos e CTAs; Public Sans 400/500/600 no texto. Inter 400/500/600 e Plus Jakarta Sans 700/800 preservam o contexto do CSS global. As variáveis mantêm os nomes `--fonte-display`, `--fonte-texto`, `--fonte-quicksand`, `--fonte-pixel` e `--fonte-slab`; não substituir seus nomes ao integrar. As fontes estão declaradas no projeto; consulte a entrada para o carregamento.

Layout institucional: largura máxima de 1840 px; margem lateral `clamp(20px, 3.5vw, 72px)`; `--altura-topo` (80 px) reserva o espaço do topo fixo do site de destino; use `0px` se não houver topo fixo; raios base 16 px e pequeno 10 px. Espaçamento usa principalmente 8, 10, 14, 16, 20, 22, 24, 28, 32, 40, 48, 56, 64, 72, 80, 110, 120 e 140 px, com `clamp()` para adaptação. Não achatar valores fluidos em tamanhos fixos. Respeite as media queries existentes.

Cartões e mockups mantêm os raios e sombras definidos em `cartao.css`, incluindo o leque de cartões com rotação de cada cartão. Não aplicar essa rotação ao símbolo da Mútua.

As medidas específicas desta página, incluindo sombras literais, estão listadas ao fim deste arquivo e no CSS original copiado. As variáveis do CSS global MWS são contexto herdado; não devem substituir a paleta nacional ou a paleta da landing. Tokens locais de hover, tema, CTA e categoria devem conservar seus seletores; não promover todas as variáveis para `:root`.

Regras obrigatórias:

- Sem degradê. Superfícies e mudanças de seção usam cores sólidas. Utilitários de degradê herdados no CSS global não são usados nesta landing e não devem ser aplicados.
- Sem círculo decorativo. Discos funcionais de CTA, botões de contato e partes dos ícones existentes podem ser preservados.
- O símbolo e a assinatura da Mútua nunca giram. Rotação de cartões, avatar ou ícones não autoriza animar a marca.
- Respeite `prefers-reduced-motion`: sem animação contínua para quem pede redução; contadores mostram valor final e trilho horizontal vira rolagem comum. Preserve as condições de CSS e JavaScript copiadas.
- Preserve foco visível, navegação por teclado, textos alternativos, rótulos e estrutura semântica.
- Mantenha hierarquia e contraste dos CTAs; não substitua todos os links por botões preenchidos.

## Componentes e conteúdo

Os seis cartões demonstrativos são HTML/CSS e ícones Lucide, sem imagens pessoais ou backend. O QR Code é ilustrativo; o CTA abre o serviço oficial.

`Casca` envolve a landing e acrescenta, no fim, o bloco de recomendações. `Cta` mantém seta/disco e estados de hover/foco. `ContinuarAcessando` usa `src/data/servicos.ts`, com os serviços atuais apontando para `https://www.mutua.com.br/...`. Topo, menu, rodapé e WhatsApp ficam por conta do site de destino.

As APIs Next foram substituídas por `<a>` e `<img>`. Imagens com `fill` mantêm posicionamento absoluto e dimensões. `next/font/google` foi substituído por famílias e pesos equivalentes. Links para outras páginas nacionais usam `https://www.mutua.com.br`, pois cada projeto contém apenas sua própria landing; âncoras internas e URLs oficiais dos serviços continuam funcionando. Para integrar ao roteamento do site de destino, ajuste `src/lib/officialHref.ts`.

## Dependências

As faixas de versão dos pacotes usados são as mesmas de `front/package.json`; Vite é a ferramenta acrescentada para a exportação. Não foram acrescentados GSAP ou Framer Motion: estas páginas usam animações CSS, IntersectionObserver, requestAnimationFrame e os componentes listados.

```json
{
  "lucide-react": "^0.575.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^4.0.9",
  "tw-animate-css": "^1.3.4"
}
```

As fontes são carregadas pelos links Google Fonts em index.html e exigem acesso a fonts.googleapis.com e fonts.gstatic.com. Todas as imagens da landing são locais.

As chamadas para contratação, inscrição, atendimento, redes e plataformas abrem serviços externos. Esses serviços não são reimplementados. Conteúdo e preços são um retrato da captura, sem atualização automática.

## Inventário de componentes

- `src/components/nacional/servicos/cartao/LandingCartao.tsx` — copiado de `front/src/components/nacional/servicos/cartao/LandingCartao.tsx` e adaptado para React/Vite.
- `src/components/nacional/Cta.tsx` — copiado de `front/src/components/nacional/Cta.tsx` e adaptado para React/Vite.
- `src/components/nacional/servicos/Casca.tsx` — copiado de `front/src/components/nacional/servicos/Casca.tsx` e adaptado para React/Vite.
- `src/components/nacional/ContinuarAcessando.tsx` — copiado de `front/src/components/nacional/ContinuarAcessando.tsx` e adaptado para React/Vite.

## Origem das imagens e demais assets

Cada caminho abaixo é um arquivo local copiado de `front/public/`. Não há hotlink necessário para as imagens da landing. SVGs de mapas, avatares e ícones renderizados no código são cobertos pelo inventário de componentes, não por arquivos de imagem.

- `public/favicon.png` — origem: `front/public/favicon.png`.
- `public/marca/servicos/cartao/celular.webp` — origem: `front/public/marca/servicos/cartao/celular.webp`.
- `public/marca/servicos/cartao/logo.webp` — origem: `front/public/marca/servicos/cartao/logo.webp`.

## Medidas e sombras específicas preservadas

```css
padding-block: clamp(80px, 9vw, 140px);
padding: 28px 0 clamp(64px, 8vw, 110px);
gap: clamp(32px, 5vw, 80px);
gap: 22px;
gap: 10px;
padding: 0;
gap: 8px;
padding: 14px 18px;
border-radius: 18px;
box-shadow: 0 1px 2px rgb(15 23 42 / 0.06);
padding-block: clamp(80px, 9vw, 140px) clamp(100px, 10vw, 160px);
gap: 4px;
padding: 24px;
border-radius: 26px;
box-shadow: 0 30px 50px -30px rgb(15 23 42 / 0.6);
gap: 16px;
gap: 12px;
padding: 32px;
border-radius: 28px;
gap: 14px;
gap: 2px;
padding-block: clamp(100px, 10vw, 160px) clamp(80px, 9vw, 140px);
gap: 40px;
gap: 4px 16px;
border-radius: 22px;
padding-block: clamp(90px, 10vw, 160px);
```

## Conferência

A exportação foi preparada para comparação em 1440×1000 e 390×844. Resultados, capturas, limitações e integridade dos arquivos de origem constam no `RELATORIO.md` da pasta que contém as cinco exportações. Este projeto não requer aquela pasta para funcionar.
