import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Volume2, Lock, ChevronDown, Check, ArrowRight,
  Frown, AlertCircle, Clock, Meh, Heart,
  ShieldCheck, Smile, ThumbsUp, Calendar, School, ShoppingBasket, Ear, ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import heroImg from "@/assets/mi-hero.jpg";
import familiaImg from "@/assets/mi-familia.jpg";
import mesaImg from "@/assets/mi-mesa.jpg";
import autoraImg from "@/assets/mi-autora.jpg";

const CHECKOUT_URL = "";

const TITLE = "Manual do Imigrante – Reino Unido | Frases prontas para a sua família";
const DESC =
  "Aplicativo web de consulta rápida para mães e famílias brasileiras no Reino Unido: escola, médico, NHS, farmácia, mercado e emergência, com áudio em inglês britânico.";

export const Route = createFileRoute("/manual-do-imigrante")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@800&display=swap",
      },
    ],
  }),
  component: ManualPage,
});

function scrollToOffer() {
  document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goToCheckout() {
  if (CHECKOUT_URL) window.location.href = CHECKOUT_URL;
  else scrollToOffer();
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  const v = window.speechSynthesis.getVoices().find((x) => x.lang === "en-GB");
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

function Fade({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setInView(true), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`mi-fade ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Photo({ src, alt, ratio, eager, w, h, pos }: { src: string; alt: string; ratio: string; eager?: boolean; w: number; h: number; pos?: string }) {
  return (
    <div className={`mi-media ${ratio}`}>
      <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} style={pos ? { objectPosition: pos } : undefined} />
    </div>
  );
}

function PhoneMockup({ situation, en, pt, how, hear }: { situation: string; en: string; pt: string; how: string; hear?: string }) {
  return (
    <div className="mi-phone" role="img" aria-label={`Tela do Manual do Imigrante mostrando a situação ${situation}`}>
      <div className="mi-phone-screen">
        <div className="bg-mi-navy px-5 py-4 text-mi-white">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Situação</p>
          <p className="mt-1 font-mi-display text-lg font-extrabold">{situation}</p>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="rounded-xl border border-mi-border bg-mi-white p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-mi-blue">Inglês britânico</p>
            <p className="mt-1 text-base font-semibold text-mi-navy">{en}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-mi-blue">Tradução</p>
            <p className="mt-1 text-sm text-mi-text">{pt}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-mi-blue">Como falar</p>
            <p className="mt-1 text-sm italic text-mi-text">{how}</p>
            <button
              type="button"
              onClick={() => speak(en)}
              aria-label={`Ouvir a frase: ${en}`}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-mi-blue px-4 text-sm font-semibold text-mi-white"
            >
              <Volume2 size={18} aria-hidden="true" /> Ouvir
            </button>
          </div>
          {hear && (
            <div className="rounded-xl bg-mi-yellow/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-mi-navy">O que você pode ouvir</p>
              <p className="mt-1 text-sm text-mi-text">{hear}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ThoughtList({ items, tone }: { items: { icon: LucideIcon; t: string }[]; tone: "neg" | "pos" }) {
  return (
    <ul className="mx-auto w-full max-w-[760px]">
      {items.map(({ icon: Icon, t }) => (
        <li key={t} className="flex items-center gap-4 border-b border-mi-border py-4 last:border-b-0">
          <Icon
            size={24}
            strokeWidth={2}
            aria-hidden="true"
            className={`shrink-0 ${tone === "neg" ? "text-mi-muted" : "text-mi-blue"}`}
          />
          <span className="mi-body italic">“{t}”</span>
        </li>
      ))}
    </ul>
  );
}

const negativeThoughts = [
  { icon: Frown, t: "Todo mundo entendeu, menos eu." },
  { icon: AlertCircle, t: "E se eu entender errado o que disseram sobre a minha família?" },
  { icon: Clock, t: "Vou pedir ajuda para alguém depois." },
  { icon: Meh, t: "Eu sei o que quero dizer. Só não sei dizer em inglês." },
  { icon: Heart, t: "Eu deveria ter perguntado mais." },
];

const positiveThoughts = [
  { icon: ShieldCheck, t: "Eu já sei o que vou dizer." },
  { icon: Ear, t: "Eu ouvi como se fala." },
  { icon: Smile, t: "Se a pessoa responder, eu já vi o que pode vir." },
  { icon: ThumbsUp, t: "Fui eu que falei pela minha família." },
];

const benefits = [
  { icon: Calendar, t: "Preparar-se antes de uma consulta" },
  { icon: School, t: "Revisar frases antes de falar com a escola" },
  { icon: Volume2, t: "Ouvir uma frase antes de pronunciá-la" },
  { icon: ShoppingBasket, t: "Consultar uma expressão na farmácia ou no mercado" },
  { icon: Ear, t: "Entender melhor o que alguém pode dizer" },
  { icon: ShieldAlert, t: "Encontrar apoio em uma situação de emergência" },
];

const receiveItems = [
  "Aplicativo web em português e inglês britânico",
  "13 situações da vida real",
  "130 frases úteis, com tradução",
  "“Como falar”, com a pronúncia escrita em português",
  "Botão “Ouvir”, com áudio em inglês britânico",
  "Seção “O que você pode ouvir”",
  "Uma dica para cada situação",
  "Situação de emergências e pedido de ajuda",
];

// [antes do destaque, destaque em negrito, depois do destaque, pílula com a parte do produto]
const bullets: [string, string, string, string][] = [
  ["Como saber ", "o que a outra pessoa pode responder", " antes de a conversa começar.", "O que você pode ouvir"],
  ["A forma de ", "ler em português o som", " de uma frase em inglês, para não travar na pronúncia.", "Como falar"],
  ["Por que ", "ouvir a frase uma vez", " antes de falar dá mais firmeza na hora.", "Ouvir"],
  ["A situação com ", "frases curtas para pedir ajuda", " quando você precisa falar rápido.", "Emergências"],
  ["A ", "dica de cada situação", " para chegar sabendo o que esperar no dia a dia no Reino Unido.", "Dicas"],
  ["Como achar a frase certa ", "em poucos toques", ", porque cada situação fica no seu lugar.", "13 situações"],
  ["Como abrir tudo ", "no navegador do celular", ", sem baixar nada na loja.", "Acesso web"],
  ["Como entrar com o ", "código que chega depois da compra", ".", "Código de acesso"],
];

const objections: { q: string; a: string }[] = [
  {
    q: "Eu posso pesquisar isso de graça.",
    a: "Pode. Mas procurar uma frase solta com alguém esperando é diferente de abrir a situação e ter a frase, a tradução, o “Como falar” e o áudio juntos.",
  },
  {
    q: "Meu inglês não é bom o suficiente.",
    a: "O Manual foi feito para esses momentos. Você lê a tradução, confere o “Como falar” e ouve a frase. Ele não promete fluência nem resolve todas as conversas, mas ajuda você a começar.",
  },
  {
    q: "Minha rotina é corrida.",
    a: "Não há aulas em vídeo nem exercícios. Você abre antes de sair de casa ou quando a situação surgir, e encontra o que precisa em poucos toques.",
  },
  {
    q: "Preciso baixar alguma coisa?",
    a: "Não. O Manual abre pelo navegador do celular. Depois da compra, você recebe o link e o código de acesso.",
  },
];

const faqs: [string, string][] = [
  ["O Manual é um curso de inglês?", "Não tem aulas em vídeo nem exercícios. É um aplicativo web de consulta rápida, com frases organizadas por situações reais."],
  ["É só para quem tem filhos?", "Foi pensado com atenção à rotina de mães e famílias, mas traz também frases para mercado, transporte, trabalho e emergência."],
  ["Preciso instalar o aplicativo?", "Não. Ele abre pelo navegador do celular."],
  ["O pagamento é mensal?", "Não. São £17 em pagamento único."],
  ["Como recebo o acesso?", "Depois da confirmação da compra, você recebe o link do aplicativo e o código de acesso."],
  ["O Manual garante fluência?", "Não. Ele é um apoio para consultar, ouvir e entender frases em situações reais do dia a dia."],
];

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Fade className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
      <span className="mi-eyebrow">{eyebrow}</span>
      <h2 className="mi-h2">{title}</h2>
      {children}
    </Fade>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mi-card p-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${open ? "Fechar" : "Abrir"} resposta: ${q}`}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-semibold text-mi-navy"
      >
        <span>{q}</span>
        <ChevronDown size={22} aria-hidden="true" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mi-body px-6 pb-6">{a}</p>}
    </div>
  );
}

function ManualPage() {
  const [showFloat, setShowFloat] = useState(false);
  // Teste A/B do topo da página: o endereço com ?v=b mostra a abertura alternativa.
  const [variant, setVariant] = useState<"a" | "b">("a");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("v") === "b") setVariant("b");
  }, []);

  useEffect(() => {
    const offer = document.getElementById("oferta");
    const final = document.getElementById("cta-final");
    const footer = document.getElementById("mi-footer");
    const blocking = new Set<Element>();
    let pastTwo = false;
    const update = () => setShowFloat(pastTwo && blocking.size === 0);
    const onScroll = () => {
      pastTwo = window.scrollY > window.innerHeight * 2;
      update();
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? blocking.add(e.target) : blocking.delete(e.target)));
      update();
    });
    [offer, final, footer].forEach((el) => el && io.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="mi-page pb-[72px]">
      <header className="border-b border-mi-border">
        <div className="mi-container flex min-h-16 items-center">
          <span className="font-mi-display text-lg font-extrabold text-mi-navy">Manual do Imigrante – Reino Unido</span>
        </div>
      </header>

      <main>
        {/* 1 Hero (sem botão de compra) */}
        <section className="mi-section">
          {variant === "a" ? (
            <div className="mi-container grid items-center gap-10 lg:grid-cols-[52fr_48fr]">
              <div className="flex flex-col gap-6">
                <span className="mi-eyebrow">Para mães brasileiras no Reino Unido</span>
                <h1 className="mi-h1">Alguém da sua família está passando mal, a recepcionista fala rápido e a única frase que vem é “sorry”?</h1>
                <p className="mi-body font-semibold text-mi-navy">
                  Existe uma frase certa para esse momento, e você pode ler, ouvir e ensaiar antes de entrar.
                </p>
                <p className="mi-body">
                  Você chegou cedo. Preencheu o que deu. Agora alguém chama o nome da sua família e faz uma pergunta que você entende pela metade.
                </p>
                <p className="mi-body">
                  Em português, você sabe exatamente o que dizer. Em inglês, a frase some. Sobra o sorriso, o gesto e a dúvida: <em>será que eu entendi certo?</em>
                </p>
                <p className="mi-body">
                  No caminho de volta para casa, a pergunta que fica é outra: <em>eu deveria ter dito mais?</em>
                </p>
                <p className="mi-body font-bold text-mi-navy">
                  O inglês trava nesses momentos porque você precisa entender, montar a frase e responder ao mesmo tempo, com alguém esperando.
                </p>
              </div>
              <Photo src={familiaImg} w={800} h={1000} eager pos="50% 30%" ratio="mx-auto aspect-[4/5] w-full max-w-[460px]"
                alt="Pai com três crianças esperando atendimento em uma sala de espera de clínica" />
            </div>
          ) : (
            <div className="mi-container grid items-center gap-10 lg:grid-cols-[52fr_48fr]">
              <div className="flex flex-col gap-6">
                <span className="mi-eyebrow">Para mães brasileiras no Reino Unido</span>
                <h1 className="mi-h1">Imagine abrir a porta do GP já sabendo exatamente o que vai dizer.</h1>
                <p className="mi-body font-semibold text-mi-navy">
                  Você leu a frase, ouviu como ela soa em inglês britânico e entra no consultório com a conversa ensaiada.
                </p>
              </div>
              <Photo src={heroImg} w={941} h={1672} eager ratio="mx-auto aspect-[941/1672] w-full max-w-[340px]"
                alt="Mão segurando um celular com o Manual do Imigrante aberto, sobre uma mesa com bloco de notas ao fundo" />
            </div>
          )}
        </section>

        {/* 2 Demonstração */}
        <section className="mi-section bg-mi-white">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-[55fr_45fr]">
            <div className="mi-media order-2 flex aspect-[4/5] items-center justify-center bg-mi-yellow/30 p-6 lg:order-1">
              <PhoneMockup
                situation="Farmácia"
                en="I need something for a headache."
                pt="Preciso de algo para dor de cabeça."
                how="ai nid SÂMthin fór a RÉDeik"
              />
            </div>
            <div className="order-1 flex flex-col gap-6 lg:order-2">
              <span className="mi-eyebrow">Dentro da tela</span>
              <h2 className="mi-h2">Toque em “Ouvir” antes de abrir a boca na farmácia</h2>
              <p className="mi-body">
                Cada frase traz o inglês britânico, a tradução e o “Como falar”, com a pronúncia escrita em português. O botão “Ouvir” toca a frase para você escutar antes de dizer.
              </p>
            </div>
          </Fade>
        </section>

        {/* 3 Diálogo interno negativo */}
        <section className="mi-section">
          <div className="mi-container flex flex-col gap-10">
            <SectionHead eyebrow="O que passa pela sua cabeça" title="Na porta da escola, a frase que você tinha pronta desaparece" />
            <Fade><ThoughtList items={negativeThoughts} tone="neg" /></Fade>
            <p className="mi-body mx-auto max-w-2xl text-center font-bold text-mi-navy">
              Você sabe o que quer dizer. Falta a frase pronta no momento certo.
            </p>
          </div>
        </section>

        {/* 4 Virada / mecanismo */}
        <section className="mi-section bg-mi-white">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-[45fr_55fr]">
            <Photo src={mesaImg} w={800} h={1000} ratio="aspect-[4/5] order-2 lg:order-1"
              alt="Mão escrevendo uma lista de compras em um bloco de notas, ao lado de um celular sobre a mesa" />
            <div className="order-1 flex flex-col gap-6 lg:order-2">
              <span className="mi-eyebrow">Como funciona</span>
              <h2 className="mi-h2">Uma situação por vez, do jeito que a semana da sua família acontece</h2>
              <p className="mi-body">
                Em vez de uma lista solta de palavras, o Manual segue os compromissos da sua rotina: escola, consulta, farmácia, mercado, transporte, trabalho.
              </p>
              <p className="mi-body">
                Você abre a situação e encontra o que dizer, a tradução, o “Como falar”, o áudio e o que você pode ouvir do outro lado. Cada situação ainda traz uma dica para se preparar.
              </p>
            </div>
          </Fade>
        </section>

        {/* 5 Diálogo interno positivo */}
        <section className="mi-section">
          <div className="mi-container flex flex-col gap-10">
            <SectionHead eyebrow="O que muda" title="Na recepção, com a frase já ensaiada" />
            <Fade><ThoughtList items={positiveThoughts} tone="pos" /></Fade>
            <p className="mi-body mx-auto max-w-2xl text-center font-bold text-mi-navy">
              Você continua sem fluência. Só chega na conversa com o primeiro passo dado.
            </p>
          </div>
        </section>

        {/* 6 Benefícios */}
        <section className="mi-section bg-mi-white">
          <div className="mi-container flex flex-col gap-10">
            <SectionHead eyebrow="Com o Manual no celular" title="Seis momentos em que ele está na sua mão" />
            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map(({ icon: Icon, t }) => (
                <div key={t} className="mi-card flex flex-col items-center gap-4 text-center">
                  <span className="mi-icon"><Icon size={24} strokeWidth={2} aria-hidden="true" /></span>
                  <h3 className="mi-h3">{t}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7 O que você recebe */}
        <section className="mi-section">
          <div className="mi-container flex flex-col gap-10">
            <SectionHead eyebrow="Ao comprar" title="O que você recebe" />
            <ul className="mx-auto flex w-full max-w-[760px] flex-col gap-3">
              {receiveItems.map((i) => (
                <li key={i} className="mi-card flex items-center gap-4 py-4">
                  <Check size={22} aria-hidden="true" className="shrink-0 text-mi-blue" />
                  <span className="mi-body">{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8 Bullets de curiosidade */}
        <section className="mi-section bg-mi-white">
          <div className="mi-container flex flex-col gap-10">
            <SectionHead eyebrow="O que está dentro do Manual do Imigrante" title="As respostas que você vai encontrar no Manual, já hoje" />
            <ul className="mx-auto flex w-full max-w-[900px] flex-col gap-4">
              {bullets.map(([pre, bold, post, pill]) => (
                <li key={pill} className="mi-card flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
                  <span className="mi-icon"><Lock size={22} strokeWidth={2} aria-hidden="true" /></span>
                  <p className="mi-body flex-1">{pre}<strong className="text-mi-navy">{bold}</strong>{post}</p>
                  <span className="mi-pill self-start md:self-center">→ {pill}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="mi-body max-w-2xl font-semibold text-mi-navy">
                Todas essas respostas estão dentro do Manual do Imigrante – Reino Unido, e você abre hoje.
              </p>
              <button type="button" className="mi-btn mi-btn-secondary" onClick={scrollToOffer} aria-label="Ir para a oferta">
                Ver a oferta <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 9 Objeções */}
        <section className="mi-section">
          <div className="mi-container flex flex-col gap-10">
            <SectionHead eyebrow="Antes de decidir" title="Quatro dúvidas que costumam aparecer, respondidas" />
            <div className="mx-auto flex w-full max-w-3xl flex-col">
              {objections.map((o) => (
                <div key={o.q} className="flex flex-col gap-3 border-b border-mi-border py-8 first:pt-0 last:border-b-0">
                  <h3 className="mi-h3">“{o.q}”</h3>
                  <p className="mi-body">{o.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10 Oferta */}
        <section id="oferta" className="mi-section scroll-mt-4 bg-mi-white">
          <div className="mi-container">
            <div className="mi-card mx-auto flex max-w-[720px] flex-col gap-8 border-2 border-mi-navy p-6 md:p-10">
              <h2 className="mi-h3 text-center text-2xl md:text-3xl">ACESSO AO MANUAL DO IMIGRANTE – REINO UNIDO</h2>
              <p className="mi-body text-center">
                Recapitulando o que você recebe: o aplicativo, as 13 situações, as 130 frases com tradução, o “Como falar”, o áudio, o “O que você pode ouvir” e as dicas.
              </p>
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-mi-yellow/30 p-6 text-center">
                <p className="mi-eyebrow">Investimento</p>
                <p className="font-mi-display text-6xl font-extrabold text-mi-navy">£17</p>
                <p className="mi-body font-semibold">Pagamento único. Sem mensalidade e sem assinatura.</p>
              </div>
              <p className="mi-body text-center">Depois da confirmação da compra, você recebe o link do aplicativo e o seu código de acesso.</p>
              <button type="button" className="mi-btn mi-btn-primary w-full" onClick={goToCheckout} aria-label="Quero acessar o Manual por £17">
                Quero acessar o Manual por £17
              </button>
            </div>
          </div>
        </section>

        {/* 11 Quem criou */}
        <section className="mi-section">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-[40fr_60fr]">
            <Photo src={autoraImg} w={600} h={800} pos="50% 40%" ratio="mx-auto aspect-[3/4] max-w-[420px]"
              alt="Suzan, criadora do Manual do Imigrante – Reino Unido, sorrindo em frente a uma ponte de pedra sobre um rio" />
            <div className="flex max-w-3xl flex-col gap-5">
              <span className="mi-eyebrow">Quem criou o Manual do Imigrante</span>
              <h2 className="mi-h2">Feito por quem já dependeu dos outros para se virar</h2>
              <p className="mi-body">
                Eu sou a Suzan. Saí do Brasil ainda adolescente, vivi na Itália e nos Estados Unidos, e hoje moro na Inglaterra com o meu marido, o Felipe, e os nossos três filhos.
              </p>
              <p className="mi-body">
                Durante muito tempo eu dependi dele, ou da ajuda de amigos, para qualquer coisa que exigisse inglês. Hoje eu consigo me virar. O Manual nasceu da dificuldade de aprender inglês com a rotina corrida de quem cuida da família, e eu o criei para ajudar mães brasileiras no Reino Unido.
              </p>
            </div>
          </Fade>
        </section>

        {/* 12 FAQ */}
        <section className="mi-section bg-mi-white">
          <div className="mi-container mx-auto flex max-w-3xl flex-col gap-8">
            <h2 className="mi-h2 text-center">Perguntas frequentes</h2>
            <div className="flex flex-col gap-3">
              {faqs.map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* 13 CTA final */}
        <section id="cta-final" className="mi-section bg-mi-navy">
          <div className="mi-container mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="mi-h2 text-mi-white">Tenha apoio para as situações que a sua família vive no Reino Unido</h2>
            <p className="mi-body text-mi-white">
              Quando surgir uma dúvida na escola, no médico ou na farmácia, você abre o aplicativo, lê a tradução, vê o “Como falar” e toca em “Ouvir”.
            </p>
            <button type="button" className="mi-btn mi-btn-primary" onClick={goToCheckout} aria-label="Quero acessar o Manual por £17">
              Quero acessar o Manual por £17
            </button>
          </div>
        </section>
      </main>

      <footer id="mi-footer" className="border-t border-mi-border py-8">
        <div className="mi-container text-center text-sm text-mi-muted">© Manual do Imigrante – Reino Unido</div>
      </footer>

      <button
        type="button"
        onClick={scrollToOffer}
        aria-label="Ver a oferta do Manual do Imigrante"
        aria-hidden={!showFloat}
        tabIndex={showFloat ? 0 : -1}
        className={`mi-btn mi-btn-primary mi-float ${showFloat ? "is-visible" : ""}`}
      >
        Quero o Manual por £17
      </button>
    </div>
  );
}
