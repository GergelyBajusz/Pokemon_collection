import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Card, CardContent, CardMedia, Box, CircularProgress, Typography,
} from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import { profileRoute } from '../../Constants/routes'
import { PrimaryColorDark, PrimaryWhite } from '../../Constants/colors'
import FilterField from '../FilterField/FilterField'

function PokeList() {
  const navigate = useNavigate();
  const pokemonList = useSelector((state) => state)
  const [fetching, setFetching] = useState(true)
  const [renderList, setRenderList] = useState([])

  useEffect(() => {
    if (pokemonList.length > 0) {
      setRenderList(pokemonList)
    }
    return () => {
      setFetching(false)
    };
  }, [pokemonList])

  const handleCardClick = (name) => {
    navigate(`${profileRoute}?name=${name}`)
  };

  return (
    <div className="pokeList">
      <FilterField
        renderList={renderList}
        setRenderList={setRenderList}
        setFetching={setFetching}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          marginTop: '12px',
          '@media (max-width: 600px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        {renderList && renderList.length > 0
        && renderList.map((pokemon) => (
          <Card
            key={pokemon.id}
            sx={{
              minWidth: 275,
              margin: '4px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: PrimaryColorDark,
              color: PrimaryWhite,
              '&:hover': {
                color: 'red',
                backgroundColor: 'white',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleCardClick(pokemon.name)}
          >
            <CardMedia
              component="img"
              sx={{
                width: 151,
                paddingTop: '12px',
              }}
              image={pokemon.image}
              alt={pokemon.name}
            />
            <CardContent>
              <Typography variant="h4" component="div" sx={{ margin: 2 }}>
                {pokemon.name}
              </Typography>

            </CardContent>
            <Typography variant="h4" component="div" sx={{ margin: 2 }}>
              {pokemon.catched ? <StarIcon /> : <StarOutlineIcon />}
            </Typography>

          </Card>
        ))}
      </Box>
      {fetching
         && (
         <div style={{ display: 'flex', justifyContent: 'center' }}>
           <CircularProgress color="primary" />
         </div>
         )}
    </div>
  );
}

export default PokeList
