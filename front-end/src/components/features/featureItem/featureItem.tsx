import * as PropTypes from 'prop-types'

import './featureItem.css'

type FeatureItemProps = {
  image: string
  alt: string
  title: string
  description: string
}

function FeatureItem({ image, alt, title, description }: FeatureItemProps) {
  return (
    <div className='feature-item'>
      <img src={image} alt={alt} className='feature-icon' />
      <h3 className='feature-item-title'>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

FeatureItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default FeatureItem
