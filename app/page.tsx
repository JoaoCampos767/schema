import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link href="/schema">
        <button
          className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm tracking-wide shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
            color: "#e2e8f0",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.15)",
          }}
        >
          {/* Glow ring animado */}
          <span
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))",
              filter: "blur(1px)",
            }}
          />
          {/* Ícone de streaming */}
          <span
            className="relative flex items-center justify-center w-8 h-8 rounded-xl"
            style={{ background: "rgba(99,102,241,0.2)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#818cf8" }}
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </span>
          <span className="relative flex flex-col items-start leading-tight">
            <span
              style={{
                color: "#94a3b8",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Demo
            </span>
            <span>Schema Separado</span>
          </span>
          {/* Seta */}
          <svg
            className="relative transition-transform duration-300 group-hover:translate-x-1"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: "#6366f1" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
