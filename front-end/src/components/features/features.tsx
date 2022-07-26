import FeatureItem from './featureItem'
import featuresData from './features.data'

import './features.css'

function Features() {
  return (
    <section className='features'>
      <h2 className='sr-only'>Features</h2>
      {featuresData.map(({ id, image, alt, title, description }) => (
        <FeatureItem key={id} image={image} alt={alt} title={title} description={description} />
      ))}
    </section>
  )
}

export default Features
