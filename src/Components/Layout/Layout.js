import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/Header'

import './styles.scss'

const Layout = ({
  children,
}) => {

  return (
    <Fragment>
      <Header />
          <div className='layout'>
            {children}
          </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

Layout.defaultProps = {
  children: null,
}

export default Layout
