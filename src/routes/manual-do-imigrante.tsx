import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  School, Stethoscope, Pill, ShoppingCart, Bus, Briefcase, Siren, Home, Landmark,
  Smartphone, Users, Wrench, MapPin, Calendar, Volume2, ShoppingBasket, Ear, ShieldAlert,
  Lock, ChevronDown, Check, ArrowRight,
} from "lucide-react";

import heroImg from "@/assets/mi-hero.jpg";
import familiaImg from "@/assets/mi-familia.jpg";
import consultaImg from "@/assets/mi-consulta.jpg";
import mesaImg from "@/assets/mi-mesa.jpg";

const CHECKOUT_URL = "";

const TITLE = "Manual do Imigrante – Reino Unido | Frases prontas para a sua família";
const DESC =
  "Aplicativo web de consulta rápida para mães e famílias brasileiras no Reino Unido: escola, médico, NHS, farmácia, mercado e emergência, com áudio em inglês britânico.";

export const Route = createFileRoute("/manual-do-imigrante")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
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
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`mi-fade ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Photo({ src, alt, ratio, eager, w, h }: { src: string; alt: string; ratio: string; eager?: boolean; w: number; h: number }) {
  return (
    <div className={`mi-media ${ratio}`}>
      <img src={src} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />
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

const situations = [
  { icon: School, t: "Escola dos filhos" },
  { icon: Stethoscope, t: "Médico e NHS" },
  { icon: Pill, t: "Farmácia" },
  { icon: ShoppingCart, t: "Mercado" },
  { icon: Bus, t: "Transporte" },
  { icon: Briefcase, t: "Trabalho" },
  { icon: Siren, t: "Emergência" },
  { icon: Home, t: "Moradia" },
  { icon: Landmark, t: "Banco" },
  { icon: Smartphone, t: "Telefone e internet" },
  { icon: Users, t: "Vizinhança" },
  { icon: Wrench, t: "Serviços do dia a dia" },
  { icon: MapPin, t: "Outras situações comuns no Reino Unido" },
];

const benefits = [
  { icon: Calendar, t: "Preparar-se antes de uma consulta" },
  { icon: School, t: "Revisar frases antes de falar com a escola" },
  { icon: Volume2, t: "Ouvir uma frase antes de pronunciá-la" },
  { icon: ShoppingBasket, t: "Consultar uma expressão na farmácia ou no mercado" },
  { icon: Ear, t: "Entender melhor o que alguém pode dizer" },
  { icon: ShieldAlert, t: "Encontrar apoio em uma situação de emergência" },
];

const bullets: [string, string, string][] = [
  ["A frase que você pode ouvir do outro lado", "ajuda a se preparar para além daquilo que você vai dizer.", "O que você pode ouvir"],
  ["A pronúncia aparece escrita em português", "para você ter um apoio antes de tentar falar.", "Como falar"],
  ["O botão Ouvir traz voz britânica", "para você escutar a frase no idioma usado no Reino Unido.", "Áudio da frase"],
  ["O quadro de emergência fica dentro do Manual", "para consultar quando a situação exigir mais rapidez.", "Quadro de emergência"],
  ["As situações ficam separadas por contexto", "para você não precisar procurar tudo em uma tela sem organização.", "13 situações"],
  ["O acesso acontece pelo navegador do celular", "sem precisar baixar o aplicativo em uma loja.", "Acesso web"],
  ["O conteúdo e os áudios continuam funcionando depois que a página carrega", "mesmo sem internet naquele momento.", "Funcionamento offline após carregamento"],
  ["Você recebe um código de acesso depois da compra", "para entrar no aplicativo protegido.", "Código de acesso"],
];

const objections: { q: string; a: string[] }[] = [
  {
    q: "EU POSSO PESQUISAR ISSO DE GRAÇA",
    a: [
      "Pode.",
      "Mas existe uma diferença entre procurar uma frase solta e ter um conjunto organizado por situações da vida no Reino Unido.",
      "Quando você está preocupada com seu filho, diante de um atendente ou com pouco tempo, não precisa começar escolhendo palavras para pesquisar.",
      "Você abre a situação correspondente, consulta as frases e pode ouvir como elas soam.",
    ],
  },
  {
    q: "EU NÃO FALO INGLÊS BEM O SUFICIENTE",
    a: [
      "O Manual foi feito justamente para momentos em que você ainda não se sente segura.",
      "Você pode ler a tradução, conferir o “Como falar”, ouvir a frase e usar o conteúdo como apoio.",
      "Ele não exige que você já fale inglês fluentemente.",
      "Também não promete resolver todas as conversas. Ele ajuda você a não depender sempre de alguém para começar ou entender uma situação simples.",
    ],
  },
  {
    q: "MINHA ROTINA É MUITO CORRIDA",
    a: [
      "O Manual não tem aulas em vídeo nem exercícios para acompanhar.",
      "Ele foi criado para consulta.",
      "Você pode abrir antes de sair de casa, durante uma pausa ou quando surgir uma situação específica. A proposta é encontrar rapidamente o apoio necessário, sem precisar reservar um horário longo para estudar.",
    ],
  },
  {
    q: "PRECISO BAIXAR ALGUMA COISA?",
    a: [
      "Não.",
      "O Manual abre pelo navegador do celular. Você não precisa baixar nada pela App Store ou pelo Google Play.",
      "Depois da compra, você recebe o link do aplicativo e um código de acesso.",
      "É necessário ter internet para abrir o Manual pela primeira vez. Depois que a página carregou, o conteúdo e os áudios continuam funcionando mesmo sem internet.",
      "Se você fechar o aplicativo, precisará de internet para abri-lo novamente.",
    ],
  },
];

const offerItems = [
  "aplicativo web em português e inglês britânico;",
  "13 situações da vida real;",
  "130 frases úteis;",
  "tradução em português;",
  "pronúncia aproximada escrita em português;",
  "áudio com voz britânica;",
  "seção “O que você pode ouvir”;",
  "dicas para cada situação;",
  "quadro de emergência;",
  "fotos reais do dia a dia;",
  "acesso vitalício.",
];

const faqs = [
  ["O Manual é um curso de inglês?", "Não. É um aplicativo web de consulta rápida, com frases organizadas por situações reais. Não há aulas em vídeo nem exercícios."],
  ["O aplicativo é para quem tem filhos?", "Ele foi criado com atenção especial à rotina de mães e famílias, incluindo situações como escola, médico e farmácia. Também traz frases para mercado, transporte, trabalho, emergência e outras situações do cotidiano."],
  ["Preciso instalar o aplicativo?", "Não. Ele abre pelo navegador do celular. Você não precisa baixá-lo pela App Store ou pelo Google Play."],
  ["O acesso é por quanto tempo?", "O acesso é vitalício, mediante pagamento único."],
  ["O pagamento é mensal?", "Não. O valor é de £17 em pagamento único. Não é uma assinatura."],
  ["Preciso de internet?", "Você precisa de internet para abrir o Manual pela primeira vez. Depois que a página carregou, o conteúdo e os áudios continuam funcionando mesmo sem internet. Se você fechar o aplicativo, precisará de internet para abri-lo novamente."],
  ["O Manual garante fluência?", "Não. O Manual não promete fluência. Ele é um apoio para consultar, ouvir e entender frases úteis em situações reais do dia a dia no Reino Unido."],
];

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
        {/* 1 Hero */}
        <section className="mi-section">
          <div className="mi-container grid items-center gap-10 lg:grid-cols-[48fr_52fr]">
            <div className="flex flex-col gap-6">
              <span className="mi-eyebrow">Para brasileiras e famílias no Reino Unido</span>
              <h1 className="mi-h1">Quando você precisa resolver algo pelos seus filhos, mas o inglês trava</h1>
              <p className="mi-body">
                Escola, médico, NHS, farmácia, mercado ou emergência: o Manual do Imigrante – Reino Unido reúne frases
                prontas em inglês britânico, com tradução, pronúncia escrita em português e áudio, para você consultar
                no celular antes de falar.
              </p>
            </div>
            <Photo src={heroImg} w={1024} h={1024} eager ratio="aspect-[4/5] lg:aspect-square"
              alt="Mãe brasileira em casa no Reino Unido, de casaco, consultando o celular antes de sair para a escola dos filhos" />
          </div>
        </section>

        {/* 2 Família */}
        <section className="mi-section bg-mi-white">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-[45fr_55fr]">
            <Photo src={familiaImg} w={864} h={1088} ratio="aspect-[4/5]"
              alt="Mãe brasileira com o filho na sala de espera de uma clínica no Reino Unido, olhando o celular juntos" />
            <div className="flex flex-col gap-6">
              <h2 className="mi-h2">Uma ajuda para quando a família precisa de você</h2>
              <p className="mi-body">
                Marcar uma consulta, explicar o que seu filho está sentindo, conversar com a professora, pedir um remédio
                na farmácia. São momentos em que você quer estar presente e falar por quem você ama.
              </p>
              <p className="mi-body">
                O Manual foi pensado para essa rotina: você abre a situação, encontra a frase e se prepara antes do
                atendimento.
              </p>
            </div>
          </Fade>
        </section>

        {/* 3 Dentro do app */}
        <section className="mi-section">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h2 className="mi-h2">O que você encontra dentro do aplicativo</h2>
              <p className="mi-body">Cada situação traz frases úteis organizadas para consulta rápida:</p>
              <ul className="flex flex-col gap-3">
                {["A frase em inglês britânico", "A tradução em português", "O “Como falar”, com a pronúncia escrita em português", "O botão “Ouvir”, com voz britânica"].map((i) => (
                  <li key={i} className="mi-body flex items-start gap-3">
                    <Check size={22} aria-hidden="true" className="mt-1 shrink-0 text-mi-blue" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mi-media flex aspect-square items-center justify-center bg-mi-yellow/30 p-6">
              <PhoneMockup
                situation="Médico e NHS"
                en="I'd like to book an appointment for my son, please."
                pt="Eu gostaria de marcar uma consulta para o meu filho, por favor."
                how="ái-d láik tu buk an apóint-ment for mai san, plíz"
              />
            </div>
          </Fade>
        </section>

        {/* 4 Situações */}
        <section className="mi-section bg-mi-white">
          <div className="mi-container flex flex-col gap-10">
            <Fade className="flex max-w-3xl flex-col gap-4">
              <h2 className="mi-h2">13 situações do dia a dia no Reino Unido</h2>
              <p className="mi-body">As frases ficam separadas pelo lugar onde você está e pelo que você precisa resolver.</p>
            </Fade>
            <div className="grid gap-4 md:grid-cols-3">
              {situations.map(({ icon: Icon, t }) => (
                <div key={t} className="mi-card flex items-center gap-4">
                  <span className="mi-icon"><Icon size={24} strokeWidth={2} aria-hidden="true" /></span>
                  <span className="font-semibold text-mi-navy">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 Consulta rápida */}
        <section className="mi-section">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-[45fr_55fr]">
            <div className="flex flex-col gap-6">
              <h2 className="mi-h2">Quando você não tem tempo para montar a frase do zero</h2>
              <p className="mi-body">
                Na fila da farmácia, na porta da escola ou na recepção da clínica, não dá para parar e traduzir palavra
                por palavra.
              </p>
              <p className="mi-body">
                Com o Manual, você abre a situação, lê a frase pronta, confere como falar e toca em “Ouvir” para escutar
                antes de dizer.
              </p>
            </div>
            <Photo src={consultaImg} w={864} h={1088} ratio="aspect-[4/5]"
              alt="Mãe brasileira em uma farmácia no Reino Unido consultando uma frase no celular antes de falar com a atendente" />
          </Fade>
        </section>

        {/* 6 Mecanismo */}
        <section className="mi-section bg-mi-white">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-[45fr_55fr]">
            <Photo src={mesaImg} w={864} h={1088} ratio="aspect-[4/5]"
              alt="Mãos de uma mãe organizando a rotina na mesa, com celular, agenda escolar, chaves e lista de compras" />
            <div className="flex flex-col gap-6">
              <h2 className="mi-h2">O apoio está organizado do jeito que a vida acontece</h2>
              <p className="mi-body">
                Em vez de uma lista solta de palavras, o Manual segue os compromissos da sua semana: a escola, a
                consulta, a farmácia, o mercado, o transporte, o trabalho.
              </p>
              <p className="mi-body">
                Em cada situação, você encontra o que dizer, o que pode ouvir do outro lado e dicas para se preparar. E,
                se algo sair do normal, o quadro de emergência está lá dentro.
              </p>
            </div>
          </Fade>
        </section>

        {/* 7 Benefícios */}
        <section className="mi-section">
          <div className="mi-container flex flex-col gap-10">
            <Fade className="max-w-3xl">
              <h2 className="mi-h2">Com o Manual no celular, você pode</h2>
            </Fade>
            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map(({ icon: Icon, t }) => (
                <div key={t} className="mi-card flex flex-col gap-4">
                  <span className="mi-icon"><Icon size={24} strokeWidth={2} aria-hidden="true" /></span>
                  <h3 className="mi-h3">{t}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8 O que você recebe */}
        <section className="mi-section bg-mi-white">
          <Fade className="mi-container grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h2 className="mi-h2">O que você recebe ao comprar</h2>
              <ul className="flex flex-col gap-3">
                {["Aplicativo web em português e inglês britânico", "13 situações da vida real", "130 frases úteis", "Tradução, pronúncia escrita e áudio com voz britânica", "Seção “O que você pode ouvir” e dicas para cada situação", "Quadro de emergência", "Acesso vitalício"].map((i) => (
                  <li key={i} className="mi-body flex items-start gap-3">
                    <Check size={22} aria-hidden="true" className="mt-1 shrink-0 text-mi-blue" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mi-media flex aspect-square items-center justify-center bg-mi-blue/10 p-6">
              <PhoneMockup
                situation="Escola dos filhos"
                en="My daughter won't be in school today. She's not feeling well."
                pt="Minha filha não vai à escola hoje. Ela não está se sentindo bem."
                how="mai dóter uônt bi in skúl tudêi. xíz nót fíling uél"
                hear="Thank you for letting us know. We hope she feels better soon."
              />
            </div>
          </Fade>
        </section>

        {/* 9 Curiosidade */}
        <section className="mi-section">
          <div className="mi-container flex flex-col gap-10">
            <div className="grid gap-4 md:grid-cols-2">
              {bullets.map(([b, rest, pill]) => (
                <div key={pill} className="mi-card flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <span className="mi-icon"><Lock size={22} strokeWidth={2} aria-hidden="true" /></span>
                    <p className="mi-body"><strong className="text-mi-navy">“{b}”</strong> {rest}</p>
                  </div>
                  <span className="mi-pill self-start">→ {pill}</span>
                </div>
              ))}
            </div>
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

        {/* 10 Objeções */}
        <section className="mi-section bg-mi-white">
          <div className="mi-container grid gap-6 lg:grid-cols-2">
            {objections.map((o) => (
              <div key={o.q} className="mi-card flex flex-col gap-3 bg-mi-bg">
                <h3 className="mi-h3">“{o.q}”</h3>
                {o.a.map((p) => <p key={p} className="mi-body">{p}</p>)}
              </div>
            ))}
          </div>
        </section>

        {/* 11 Oferta */}
        <section id="oferta" className="mi-section scroll-mt-4">
          <div className="mi-container">
            <div className="mi-card mx-auto flex max-w-[720px] flex-col gap-8 border-2 border-mi-navy p-6 md:p-10">
              <h2 className="mi-h3 text-center text-2xl md:text-3xl">ACESSO AO MANUAL DO IMIGRANTE – REINO UNIDO</h2>
              <div>
                <p className="mi-eyebrow">O que você recebe</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {offerItems.map((i) => (
                    <li key={i} className="mi-body flex items-start gap-3">
                      <Check size={22} aria-hidden="true" className="mt-1 shrink-0 text-mi-blue" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-mi-yellow/30 p-6 text-center">
                <p className="mi-eyebrow">Investimento</p>
                <p className="font-mi-display text-6xl font-extrabold text-mi-navy">£17</p>
                <p className="mi-body font-semibold">Pagamento único. Sem mensalidade e sem assinatura.</p>
              </div>
              <p className="mi-body">Depois da confirmação da compra, você recebe o link do aplicativo e o seu código de acesso.</p>
              <p className="mi-body">O aplicativo abre pelo navegador do celular. Você não precisa baixar nada na loja de aplicativos.</p>
              <button type="button" className="mi-btn mi-btn-primary w-full" onClick={goToCheckout} aria-label="Quero acessar o Manual por £17">
                Quero acessar o Manual por £17
              </button>
            </div>
          </div>
        </section>

        {/* 12 Autora (foto omitida até a imagem estar disponível) */}
        <section className="mi-section bg-mi-white">
          <Fade className="mi-container">
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              <h2 className="mi-h2">FEITO POR QUEM JÁ DEPENDEU DOS OUTROS PARA SE VIRAR</h2>
              <p className="mi-body">Eu sou a Suzan.</p>
              <p className="mi-body">Saí do Brasil ainda adolescente, vivi na Itália e nos Estados Unidos, e hoje moro na Inglaterra com o meu marido, o Felipe, e os nossos três filhos.</p>
              <p className="mi-body">Durante muito tempo eu dependi totalmente dele, ou da ajuda de amigos, para qualquer coisa que exigisse inglês. Hoje eu consigo me virar.</p>
              <p className="mi-body">Aprender inglês é importante, mas mais importante ainda é meter a cara e não deixar o medo te parar.</p>
              <p className="mi-body">O Manual do Imigrante nasceu da dificuldade de aprender inglês com a rotina corrida de quem cuida da família. Eu o criei para ajudar mães brasileiras no Reino Unido, com frases prontas para o dia a dia.</p>
              <p className="mi-body">Espero de coração que ele possa te ajudar.</p>
            </div>
          </Fade>
        </section>

        {/* 13 FAQ */}
        <section className="mi-section">
          <div className="mi-container mx-auto flex max-w-3xl flex-col gap-8">
            <h2 className="mi-h2">Perguntas frequentes</h2>
            <div className="flex flex-col gap-3">
              {faqs.map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* 14 CTA final */}
        <section id="cta-final" className="mi-section bg-mi-navy">
          <div className="mi-container mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="mi-h2 text-mi-white">TENHA APOIO PARA AS SITUAÇÕES QUE A SUA FAMÍLIA VIVE NO REINO UNIDO</h2>
            <p className="mi-body text-mi-white">Quando surgir uma dúvida na escola, no médico, na farmácia, no mercado ou em outra situação do dia a dia, você poderá abrir o aplicativo e consultar frases úteis em inglês britânico.</p>
            <p className="mi-body text-mi-white">Leia a tradução. Veja o “Como falar”. Toque em “Ouvir”.</p>
            <p className="font-mi-display text-xl font-extrabold text-mi-yellow">Manual do Imigrante – Reino Unido</p>
            <p className="mi-body font-semibold text-mi-white">Pagamento único de £17. Acesso vitalício.</p>
            <p className="mi-body text-mi-white">O aplicativo abre pelo navegador do celular. Você não precisa baixar nada na loja de aplicativos.</p>
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
