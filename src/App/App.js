import React, {useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {profileRoute, homeRoute} from '../Constants/routes'
import ProfilePage from '../Pages/Profile/Profile'
import HomePage from '../Pages/Home/Home'

import { getPokemonList } from "../Api/Api"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const initialLoad = async () => {
      const list = await getPokemonList()
      dispatch({
        type: 'FETCH',
        payload: list.map(item => {
          return ({
             name: item.name,
             id: item.id,
             image: item.sprites.other.dream_world.front_default,
             height: item.height,
             weight: item.weight,
             abilities: item.abilities.filter(ability => ability.is_hidden === false),
             types: item.types,
             catched: false,}
          )
      })
      })
    }
    initialLoad()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
              <Route
                path={homeRoute}
                element={ <HomePage />}
              />
              <Route
                path={profileRoute}
                element={ <ProfilePage />}
              />
              </Routes>
    </BrowserRouter>
  
  )
}

export default App;
