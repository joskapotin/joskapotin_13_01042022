import './hero.css'

type HeroProps = {
  children: React.ReactNode
}

function Hero({ children }: HeroProps) {
  return (
    <div className='hero'>
      <section className='hero-content'>{children}</section>
    </div>
  )
}

export default Hero
