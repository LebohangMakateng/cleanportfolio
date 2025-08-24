import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Spent – Your Money Detective",
  description:
    "Analyze bank statements instantly and visualize where your money goes. Fast, accurate, privacy-first.",
  keywords: [
    "Spent",
    "budgeting",
    "bank statements",
    "South Africa",
    "visualizations",
    "personal finance",
  ],
  openGraph: {
    title: "Spent – Your Money Detective",
    description: "Transform 'Where did my money go?' into visual answers.",
    images: [
      {
        url: "/images/projects/spent/og.png",
        width: 1200,
        height: 630,
        alt: "Spent – Your Money Detective",
      },
    ],
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/projects/spent/og.png"],
    title: "Spent – Your Money Detective",
    description:
      "Analyze bank statements instantly and visualize where your money goes.",
  },
};

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Spent",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0" },
    description:
      "Analyze bank statements to visualize spending with charts and insights.",
    url: "https://www.lebohangmakateng.com/projects/spent",
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

const theme = {
  bg: "#0B1020",
  card: "#121833",
  primary: "#6EE7B7",
  primaryText: "#0B1020",
  text: "#E5E7EB",
  muted: "#9CA3AF",
  accent: "#60A5FA",
  warning: "#F59E0B",
  radius: "12px",
  shadow: "0 10px 30px rgba(0,0,0,0.25)",
};

export default function Page() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <JsonLd />

      {/* Hero */}
      <section
        aria-labelledby="hero-title"
        className="px-6 md:px-10 lg:px-16 py-20 max-w-6xl mx-auto"
      >
        <p className="text-sm" style={{ color: theme.muted }}>
          Your Money Detective
        </p>
        <h1
          id="hero-title"
          className="text-4xl md:text-6xl font-semibold leading-tight"
        >
          Turn &ldquo;Where did my money go?&rdquo; into visual answers.
        </h1>
        <p className="mt-4 text-lg max-w-2xl" style={{ color: "#C7CAD1" }}>
          Spent analyzes your bank statements and reveals exactly where your
          money went through beautiful, interactive visualizations.
        </p>
                 <div className="mt-8 flex flex-wrap gap-3">
           <a
             className="rounded-xl px-5 py-3 font-medium focus:outline-none focus-visible:ring-2"
             style={{
               backgroundColor: theme.primary,
               color: theme.primaryText,
               borderRadius: theme.radius,
             }}
             href="https://spentbylebo.onrender.com/"
           >
             Try the Demo
           </a>
         </div>
        <ul className="mt-6 flex flex-wrap gap-4 text-sm" style={{ color: theme.muted }}>
          <li>Under 10 seconds</li>
          <li>96% categorization accuracy</li>
          <li>Privacy-first</li>
        </ul>

                 <div className="mt-12">
                                            <Image
               src="/images/image1.png"
               alt="Spent dashboard overview"
               width={1440}
               height={900}
               className="w-full h-auto rounded-2xl"
               priority
             />
         </div>
      </section>

      {/* Feature Grid */}
      <section
        aria-labelledby="features-title"
        className="px-6 md:px-10 lg:px-16 py-16 max-w-6xl mx-auto"
      >
        <h2 id="features-title" className="text-2xl md:text-3xl font-semibold">
          Why Spent
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: "🔍",
              title: "Smart Analysis",
              points: [
                "Intelligent categorization (96% accuracy)",
                "Real-time processing under 10 seconds",
              ],
            },
            {
              icon: "📊",
              title: "Visual Money Detective",
              points: [
                "Pie charts: Where did it all go?",
                "Bar charts: Who got my money?",
                "Line charts: How fast am I spending?",
                "Weekly patterns: Day-by-day habits",
              ],
            },
            {
              icon: "💡",
              title: "Instant Insights",
              points: [
                "Total spending breakdown",
                "Biggest categories & top destinations",
                "Daily averages & spending velocity",
              ],
            },
            {
              icon: "🛡️",
              title: "Privacy & Security",
              points: ["No data storage", "Local session processing", "No account required"],
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6"
              style={{ backgroundColor: theme.card }}
            >
              <div className="text-2xl" aria-hidden>
                {f.icon}
              </div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <ul className="mt-3 space-y-1 text-sm" style={{ color: "#C7CAD1" }}>
                {f.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        aria-labelledby="how-title"
        className="px-6 md:px-10 lg:px-16 py-16 max-w-6xl mx-auto"
      >
        <h2 id="how-title" className="text-2xl md:text-3xl font-semibold">
          How it works
        </h2>
        <ol className="mt-6 grid md:grid-cols-3 gap-6">
          {["Export your bank statement as CSV", "Upload to Spent", "Get instant charts and insights"].map(
            (s, i) => (
              <li key={s} className="rounded-2xl p-6" style={{ backgroundColor: theme.card }}>
                <div className="font-mono" style={{ color: theme.primary }}>
                  0{i + 1}
                </div>
                <div className="mt-2 font-medium">{s}</div>
              </li>
            )
          )}
        </ol>
      </section>

      {/* Screens */}
      <section className="px-6 md:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
                          <div className="grid md:grid-cols-2 gap-6">
            <div 
              className="rounded-2xl w-full h-80 flex items-center justify-center"
              style={{ backgroundColor: theme.card }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-lg font-medium">Pie Chart Breakdown</p>
                <p className="text-sm" style={{ color: theme.muted }}>Category spending visualization</p>
              </div>
            </div>
            <div 
              className="rounded-2xl w-full h-80 flex items-center justify-center"
              style={{ backgroundColor: theme.card }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-lg font-medium">Spending Trends</p>
                <p className="text-sm" style={{ color: theme.muted }}>Monthly spending patterns</p>
              </div>
            </div>
          </div>
      </section>

      {/* Categories */}
      <section
        aria-labelledby="categories-title"
        className="px-6 md:px-10 lg:px-16 py-16 max-w-6xl mx-auto"
      >
        <h2 id="categories-title" className="text-2xl md:text-3xl font-semibold">
          Categories Spent Understands
        </h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            "Groceries & Food",
            "Restaurants & Takeaways",
            "Transport & Fuel",
            "Entertainment & Subscriptions",
            "Shopping & Retail",
            "Utilities & Bills",
            "Banking & Fees",
            "Health & Pharmacy",
            "Transfers & Payments",
            "Income & Credits",
            "Investments & Savings",
          ].map((cat) => (
            <div
              key={cat}
              className="text-sm px-3 py-2 rounded-full border"
              style={{ borderColor: "#2A335D" }}
            >
              {cat}
            </div>
          ))}
        </div>
      </section>
      {/* FAQ */}
      <section
        aria-labelledby="faq-title"
        className="px-6 md:px-10 lg:px-16 py-16 max-w-6xl mx-auto"
      >
        <h2 id="faq-title" className="text-2xl md:text-3xl font-semibold">
          FAQs
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Do you store my bank data?",
              a: "No. Spent never stores your data; analysis stays in your browser session.",
            },
            {
              q: "Which banks are supported?",
              a: "FNB, ABSA, Standard Bank, Nedbank, Capitec (CSV export).",
            },
            {
              q: "How accurate is categorization?",
              a: "Tested at ~96% accuracy with merchant recognition.",
            },
            { q: "How fast is it?", a: "Typically under 10 seconds for typical statements." },
          ].map((item) => (
            <details key={item.q} className="rounded-2xl p-6" style={{ backgroundColor: theme.card }}>
              <summary className="cursor-pointer font-medium focus:outline-none focus-visible:ring-2">
                {item.q}
              </summary>
              <p className="mt-2" style={{ color: "#C7CAD1" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ backgroundColor: theme.card }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold">
            Ready to see where your money goes?
          </h2>
                     <div className="mt-6 flex justify-center gap-3">
             <a
               className="rounded-xl px-5 py-3 font-medium focus:outline-none focus-visible:ring-2"
               style={{
                 backgroundColor: theme.primary,
                 color: theme.primaryText,
                 borderRadius: theme.radius,
               }}
               href="https://spentbylebo.onrender.com/"
             >
               Open Spent
             </a>
           </div>
        </div>
      </section>
    </main>
  );
}


