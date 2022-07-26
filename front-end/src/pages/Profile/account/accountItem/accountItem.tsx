import * as PropTypes from 'prop-types'

import './accountItem.css'

type AccountItemProps = {
  title: string
  amount: string
  description: string
}

function AccountItem({ title, amount, description }: AccountItemProps) {
  return (
    <section className='account'>
      <div className='account-content-wrapper'>
        <h3 className='account-title'>{title}</h3>
        <p className='account-amount'>{amount}</p>
        <p className='account-amount-description'>{description}</p>
      </div>
      <div className='account-content-wrapper cta'>
        <button type='button' className='transaction-button'>
          View transactions
        </button>
      </div>
    </section>
  )
}

AccountItem.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default AccountItem
