import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'qs'
import { Card, CardContent, CardMedia, Box, CircularProgress, Typography, Button } from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'

import { PrimaryColorDark, PrimaryWhite } from '../../Constants/colors' 

const PokeList = () => {
  const pokeList = useSelector(state => state)
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(true)
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  useEffect(() => {
    const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    if (pokeList.length !== 0) {
        const pokemon = pokeList.filter(name => name.name === urlParams.name)
        setPokemon(pokemon)    
        setFetching(false) 
    }
  }, [pokeList])

  const handleCatch = () => {
    dispatch({
      type: 'CATCH',
      payload: pokeList.map(item =>
          (item.name === pokemon[0].name ? {
            name: item.name,
            id: item.id,
            image: item.image,
            height: item.height,
            weight: item.weight,
            abilities: item.abilities,
            types: item.types,
            catched: !pokemon[0].catched,
          } :
          item)),
    })
  }
  
  return (
    <div className='pokeList'>
    <Box
     sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginTop: '12px',
        '@media (max-width: 600px)': {
          gridTemplateColumns: '1fr',
        },
         }}>
          {pokemon.length > 0 &&
              <Card
           key={pokemon[0].id}
           sx={{
              minWidth: 600,
              margin: '4px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: PrimaryColorDark,
              color: PrimaryWhite,
             }}
           >
              <CardMedia
               component="img"
               sx={{
                  width: 200,
                  paddingTop: '12px',
                 }}
               image={pokemon[0].image}
               alt={pokemon[0].name}
              />
              <CardContent>
              <Typography variant="h3" component="div" sx={{ margin: 2 }}>
               {pokemon[0].name}
               </Typography>
               <Typography variant="body1" component="div" sx={{ margin: 2 }}>
                 Height: {pokemon[0].height}&nbsp;
                 Weight: {pokemon[0].weight}
                 </Typography>
                 <Typography variant="h5" component="div">
                 Abilities:
                 </Typography>
                 {pokemon[0].abilities.map((ability => { return (
                  <Typography key={ability.ability.name} sx={{ fontSize: 16 }} gutterBottom>
                 {ability.ability.name}
                </Typography>
                 )}))}
              </CardContent>

          </Card>}
          {pokemon.length > 0 &&
          <Button
           variant="contained"
            startIcon={pokemon[0].catched ? <StarIcon /> : <StarOutlineIcon />}
            onClick={() => handleCatch()}
            >
              {pokemon[0].catched ? 'Release it!' :'Catch it!'}
              </Button>}
    </Box>
    {fetching &&
         <div style={{ display: 'flex', justifyContent: 'center' }}>
         <CircularProgress color="primary" />
       </div>
        }
    </div>
  )
}

export default PokeList
