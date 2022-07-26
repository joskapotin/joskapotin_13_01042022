import * as PropTypes from 'prop-types'

import Footer from '../../components/footer'
import Header from '../../components/mainNav'

import './main.css'

type MainProps = {
  children: React.ReactNode
  bgDark?: boolean
}

function Main({ children, bgDark }: MainProps) {
  return (
    <>
      <Header />
      <main className={`main ${bgDark ? 'bg-dark' : 'bg-light'}`}>{children}</main>
      <Footer />
    </>
  )
}

Main.defaultProps = {
  bgDark: false,
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
  bgDark: PropTypes.bool,
}

export default Main
