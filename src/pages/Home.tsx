export default function Home() {
  return (
    <section className="relative flex min-h-[calc(100vh-140px)] items-center overflow-hidden">
      {/* Pastel gradient blobs */}
      <div className="blob blob-blue left-[-8%] top-[5%] h-[26rem] w-[26rem]" aria-hidden="true" />
      <div className="blob blob-purple right-[-6%] top-[30%] h-[22rem] w-[22rem]" aria-hidden="true" />
      <div className="blob blob-pink bottom-[-15%] left-[30%] h-[24rem] w-[24rem]" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[22px] bg-ink shadow-[0_12px_40px_rgba(18,32,28,0.18)]">
          <svg width="44" height="44" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="12" cy="16" r="5" fill="none" stroke="#D4FF9E" strokeWidth="2.5" />
            <circle cx="21" cy="16" r="5" fill="none" stroke="#D4FF9E" strokeWidth="2.5" opacity="0.55" />
          </svg>
        </div>

        <p className="eyebrow mb-5">Operated by IQON Health</p>

        <h1 className="mx-auto max-w-2xl text-4xl leading-[1.1] text-ink md:text-6xl">
          IQONIC
        </h1>

        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-sage">
          Your health companion — simple tools and information, right in your
          pocket.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#" className="btn-pill hover-lift" aria-label="Download on the App Store">
            <AppleIcon />
            App Store
          </a>
          <a href="#" className="btn-pill hover-lift" aria-label="Get it on Google Play">
            <PlayIcon />
            Google Play
          </a>
        </div>

        <p className="mt-8 text-sm text-sage">
          Coming soon to iOS and Android
        </p>
      </div>
    </section>
  )
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.61 1.81 13.79 12 3.61 22.19c-.37-.19-.61-.57-.61-1.02V2.83c0-.45.24-.83.61-1.02zM14.85 13.06l2.56 2.56-11.6 6.44 9.04-9zM17.41 8.38l-2.56 2.56-9.04-9 11.6 6.44zM18.78 9.14l2.61 1.45c.81.45.81 1.37 0 1.82l-2.61 1.45L15.91 12l2.87-2.86z" />
    </svg>
  )
}
