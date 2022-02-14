import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { homeRoute } from '../../Constants/routes'
import logo from '../../images/pokemon_logo_small.png'

import './styles.scss'

const Header = () => {
  const navigate = useNavigate()

  const handleImgClick = (name) => {
    console.log(name)
    navigate(homeRoute)
  }

  return (
    <Fragment>
          <div className='header'>
          <img
           className='header__logo'
           src={logo}
           alt="logo"
           onClick={() => handleImgClick()}
            />
          </div>
    </Fragment>
  )
}

export default Header
