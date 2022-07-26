import Features from '../../components/features'
import Hero from '../../components/hero'
import MainLayout from '../../layouts/main'

function Home() {
  return (
    <MainLayout>
      <Hero>
        <h2 className='sr-only'>Promoted Content</h2>
        <p className='subtitle'>No fees.</p>
        <p className='subtitle'>No minimum deposit.</p>
        <p className='subtitle'>High interest rates.</p>
        <p className='text'>Open a savings account with Argent Bank today!</p>
      </Hero>
      <Features />
    </MainLayout>
  )
}

export default Home
