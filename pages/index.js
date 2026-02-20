import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

// ── Color schemes cycling through cards ──────────────────────────────────────
const SCHEMES = [
  { bg: '#fff8f0', border: '#f4a261', accent: '#c05e1a', ribbon: '#f4a261' },
  { bg: '#f5f0ff', border: '#9b72cf', accent: '#5a189a', ribbon: '#9b72cf' },
  { bg: '#f0fff6', border: '#52b788', accent: '#1b6b3a', ribbon: '#52b788' },
  { bg: '#fff0f6', border: '#f472b6', accent: '#9d174d', ribbon: '#f472b6' },
  { bg: '#f0f6ff', border: '#60a5fa', accent: '#1e40af', ribbon: '#60a5fa' },
];

// ── Funny message generator ───────────────────────────────────────────────────
function generateMessage(name, age, hobby) {
  const n = parseInt(age, 10);
  const h = hobby.toLowerCase().trim();

  // Age comment
  let ageComment;
  if (n < 10) {
    ageComment = `${age} whole years old! You've been alive longer than most smartphones, which is honestly more impressive than it sounds.`;
  } else if (n < 13) {
    ageComment = `${age}! You're basically a veteran at this birthday thing by now. Most people stop being impressed after year 5.`;
  } else if (n < 18) {
    ageComment = `${age} — surviving the most chaotic years of any human life. Heroes don't always wear capes; sometimes they just survive middle school.`;
  } else if (n < 22) {
    ageComment = `${age}! Young, vibrant, and statistically guaranteed to make at least three decisions you'll regret by Thursday.`;
  } else if (n < 26) {
    ageComment = `${age}! The age where you're legally an adult but still Google "how to adult" at 11pm on a Tuesday.`;
  } else if (n < 30) {
    ageComment = `${age}! Neuroscientists say your brain is fully developed now. We have questions. Many, many questions.`;
  } else if (n < 35) {
    ageComment = `${age}! The decade where "going out" becomes "staying in" and you call it a glow-up. (It is.)`;
  } else if (n < 40) {
    ageComment = `${age}! You're like a smartphone — getting better with each update, but everyone's quietly eyeing the newer model.`;
  } else if (n < 45) {
    ageComment = `${age}! At this age your back goes out more than you do. The silver lining? You've genuinely stopped caring what anyone thinks.`;
  } else if (n < 50) {
    ageComment = `${age}! You're not getting older, you're becoming a collector's item. Limited edition. Slightly weathered. Extremely valuable.`;
  } else if (n < 55) {
    ageComment = `${age}! "Getting lucky" now means finding a great parking spot on the first try. And honestly? That slaps.`;
  } else if (n < 60) {
    ageComment = `${age}! You're officially vintage. Not old — VINTAGE. There is a price difference, and it favors you.`;
  } else if (n < 70) {
    ageComment = `${age}! You've reached the age where your doctor is both impressed and slightly nervous at your annual checkup. A complex emotion to inspire.`;
  } else {
    ageComment = `${age}! An absolute icon. You've outlasted trends, empires, several social media platforms, and at least two "next big things" in tech.`;
  }

  // Hobby comment
  let hobbyComment;
  if (/gam(e|ing|er)/.test(h) || h === 'gaming' || h === 'video games') {
    hobbyComment = `With a passion for ${hobby} — let's be honest, the only "grinding" ${name} does is in-game, and they are VERY productive at it.`;
  } else if (/cook|bak|chef|cuisine/.test(h)) {
    hobbyComment = `${name} loves ${hobby}, which is just a sophisticated way of saying their most reliable relationship is with their oven. We respect it.`;
  } else if (/read|book|novel|literatur/.test(h)) {
    hobbyComment = `${name} is an avid ${hobby} enthusiast — also known as someone who has quietly decided that fictional people are just better company.`;
  } else if (/\bjog|runn/.test(h)) {
    hobbyComment = `${name} loves ${hobby} — voluntarily, without anyone chasing them. The authorities have been notified and they, too, are baffled.`;
  } else if (/gym|workout|fitness|lift|weight/.test(h)) {
    hobbyComment = `${name} is really into ${hobby}. Yes, they DO want a medal for showing up, and no, they will never stop mentioning leg day.`;
  } else if (/sleep|nap/.test(h)) {
    hobbyComment = `${name}'s hobby is ${hobby} — and this is, objectively, the most evolved life philosophy in this room.`;
  } else if (/paint|draw|sketch|art|illustrat/.test(h)) {
    hobbyComment = `${name} is into ${hobby} — because apparently having feelings without a creative outlet is for people who haven't discovered which brushes to buy.`;
  } else if (/music|guitar|piano|drum|bass|sing|violin|ukulele/.test(h)) {
    hobbyComment = `${name} loves ${hobby} — and the neighbors have formed a support group. It's going great.`;
  } else if (/travel|backpack|wander/.test(h)) {
    hobbyComment = `${name} loves ${hobby} — "collecting experiences" is the official term they use. "Never unpacking their suitcase" is the unofficial one.`;
  } else if (/hik|climb|trail/.test(h)) {
    hobbyComment = `${name} loves ${hobby} — voluntarily going uphill, over rocks, away from Wi-Fi. We've sent a wellness check.`;
  } else if (/cod|program|software|develop|hack/.test(h)) {
    hobbyComment = `${name} does ${hobby} for fun — when asked about touching grass, they filed a ticket, marked it low priority, and closed it as "won't fix."`;
  } else if (/watch|netflix|stream|tv|film|movie|cinema/.test(h)) {
    hobbyComment = `${name} loves ${hobby} — calling it "cultural research" after hour seven is a bold choice, and we respect the commitment to the bit.`;
  } else if (/yoga|meditat|mindful|pilates/.test(h)) {
    hobbyComment = `${name} practices ${hobby} — finding inner peace while their inbox has 847 unread emails. Namaste, king/queen.`;
  } else if (/photo|camera|photograph/.test(h)) {
    hobbyComment = `${name} is into ${hobby} — the world is their canvas, currently being used to photograph brunch at the golden hour. Valid.`;
  } else if (/danc|ballet|salsa|tango/.test(h)) {
    hobbyComment = `${name} loves ${hobby} — the floor is their domain, gravity is just a suggestion, and everyone else is merely audience.`;
  } else if (/writ|blog|journal|poet/.test(h)) {
    hobbyComment = `${name} loves ${hobby} — apparently talking to people just wasn't painful enough, so they decided to also write it all down.`;
  } else if (/garden|plant|grow/.test(h)) {
    hobbyComment = `${name} is into ${hobby} — and yes, they WILL tell you about their tomatoes. You will listen. You will be glad you did.`;
  } else if (/knit|crochet|sew|craft/.test(h)) {
    hobbyComment = `${name} does ${hobby} — making tangible things with their hands while the rest of us scroll mindlessly. One of us is winning.`;
  } else {
    hobbyComment = `${name} spends their time doing ${hobby}, which is either incredibly cool or slightly unhinged — but either way, fully committed, and that's what matters.`;
  }

  // Rotating closing lines
  const closings = [
    `May your birthday be as wonderful as you pretend your Monday mornings are! 🎂`,
    `Here's to another lap around the sun — may the cake be big and the meetings be canceled! 🥳`,
    `May your Wi-Fi be strong, your battery above 20%, and your birthday absolutely legendary! 🎈`,
    `You've survived another year against all odds. Statistically impressive. Have some cake. ☀️`,
    `May today bring you zero responsibilities and an irresponsible amount of dessert! 🎉`,
  ];

  const closing = closings[Math.floor(Math.random() * closings.length)];
  return { ageComment, hobbyComment, closing };
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState({ name: '', age: '', hobby: '' });
  const [cards, setCards] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Who is this card for?';
    const age = Number(form.age);
    if (!form.age.trim() || isNaN(age) || age < 1 || age > 150 || !Number.isInteger(age)) {
      e.age = 'Enter a whole number between 1 and 150.';
    }
    if (!form.hobby.trim()) e.hobby = 'What do they love doing?';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    // Brief artificial delay so the button state is visible
    setTimeout(() => {
      const { ageComment, hobbyComment, closing } = generateMessage(form.name, form.age, form.hobby);
      const scheme = SCHEMES[cards.length % SCHEMES.length];
      setCards(prev => [
        {
          id: Date.now(),
          name: form.name.trim(),
          age: form.age.trim(),
          hobby: form.hobby.trim(),
          ageComment,
          hobbyComment,
          closing,
          scheme,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
      setLoading(false);
    }, 500);
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>🎊 Birthday Card Generator</title>
        <meta name="description" content="Generate funny, personalised birthday cards" />
      </Head>

      {/* ── Header ── */}
      <header className={styles.header}>
        <h1 className={styles.title}>🎊 Birthday Card Generator 🎊</h1>
        <p className={styles.subtitle}>Spread joy, one roast at a time</p>
      </header>

      {/* ── Two-column layout ── */}
      <main className={styles.main}>

        {/* LEFT: Form */}
        <aside className={styles.formSide}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>✨ Create a Card</h2>
            <form onSubmit={handleSubmit} noValidate>
              <Field
                label="🎂 Name"
                placeholder="Who's the birthday star?"
                value={form.name}
                error={errors.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
              />
              <Field
                label="🎈 Age"
                placeholder="How old? Be honest."
                value={form.age}
                error={errors.age}
                inputMode="numeric"
                onChange={v => setForm(f => ({ ...f, age: v }))}
              />
              <Field
                label="🎯 Hobby"
                placeholder="What do they love doing?"
                value={form.hobby}
                error={errors.hobby}
                onChange={v => setForm(f => ({ ...f, hobby: v }))}
              />
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? '🎁 Generating…' : '🎉 Generate Card!'}
              </button>
            </form>
          </div>
        </aside>

        {/* RIGHT: Cards */}
        <section className={styles.cardsSide}>
          <h2 className={styles.cardsSideTitle}>
            🎂 Birthday Cards{cards.length > 0 ? ` (${cards.length})` : ''}
          </h2>

          {cards.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🎈</span>
              <p>No cards yet — fill in the form to get started!</p>
            </div>
          ) : (
            <div className={styles.stack}>
              {cards.map(card => (
                <BirthdayCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// ── Field helper ──────────────────────────────────────────────────────────────
function Field({ label, placeholder, value, error, onChange, inputMode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.inputErr : ''}`}
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {error && <span className={styles.errMsg}>{error}</span>}
    </div>
  );
}

// ── Birthday Card ─────────────────────────────────────────────────────────────
function BirthdayCard({ card }) {
  const { name, age, hobby, ageComment, hobbyComment, closing, scheme, time } = card;
  return (
    <article
      className={styles.card}
      style={{ backgroundColor: scheme.bg, borderColor: scheme.border }}
    >
      {/* Ribbon header */}
      <div className={styles.cardRibbon} style={{ backgroundColor: scheme.ribbon }}>
        <span>🎉 🎂 🎉</span>
        <span className={styles.cardRibbonTitle}>Happy Birthday!</span>
        <span>🎈 🥳 🎈</span>
      </div>

      {/* Card body — inside of the card */}
      <div className={styles.cardBody}>
        <p className={styles.cardTo}>
          To:{' '}
          <strong style={{ color: scheme.accent }}>{name}</strong>
          <span className={styles.cardMeta}> · {age} years young · loves {hobby}</span>
        </p>

        <hr className={styles.cardRule} style={{ borderColor: scheme.border }} />

        <p className={styles.cardMsg}>{ageComment}</p>
        <p className={styles.cardMsg}>{hobbyComment}</p>

        <hr className={styles.cardRule} style={{ borderColor: scheme.border }} />

        <p className={styles.cardClosing} style={{ color: scheme.accent }}>
          {closing}
        </p>
      </div>

      {/* Footer */}
      <div className={styles.cardFooter} style={{ color: scheme.border }}>
        Generated at {time} 🎊
      </div>
    </article>
  );
}
