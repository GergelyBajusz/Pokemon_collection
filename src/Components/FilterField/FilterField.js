import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { InputLabel, MenuItem, FormControl, Select, Paper, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

const FilterField = ({ setRenderList, setFetching }) => {
  const pokeList = useSelector(state => state)
  const [types, setTypes] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [searchName, setSearchName] = useState('')
  const [isCatched, setIsCatched] = useState(false)

  const handleFilterChange = (event) => {
    setSelectedType(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
    setRenderList(pokeList.filter(name => name.name === event.target.value))
  }

  const handleCheckboxChange = () => {
    setIsCatched(!isCatched)
  }

  useEffect(() => {
    if(pokeList && pokeList.length > 0){
        let allTypes = pokeList.map(item => item.types
          .map(type => type.type.name).reduce(el => {return el}))
          let uniqueChars = [...new Set(allTypes)]
          setTypes(uniqueChars)
      }
  }, [pokeList])

  useEffect(() => {
    if(pokeList && pokeList.length > 0) {
        const filteredList = pokeList.filter(item => item.types.some(type => type.type.name === selectedType))
        setRenderList(filteredList)          
    }
    if(selectedType === 'all') {
      setRenderList(pokeList)
    }
    return () => {
      setFetching(false)
    }
  }, [selectedType])

  useEffect(() => {
    if(searchName.length > 0) {
      let rgxp = new RegExp(searchName, "g");
      setRenderList(pokeList.filter(name => name.name.match(rgxp)))
    }
    if(searchName.length === 0) {
      setRenderList(pokeList)
    }
    return () => {
      setFetching(false)
    }
  }, [searchName])

  useEffect(() => {
    if(isCatched){
      setRenderList(pokeList.filter(catched => catched.catched === true))
    } if(!isCatched) {
      setRenderList(pokeList)
    }
    return () => {
      setFetching(false)
    }
  }, [isCatched])
 
  return (
    <Paper 
      sx={{
          padding: '4px',
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
      }}>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="select-type">Select a Type</InputLabel>
        <Select
          labelId="select-type"
          id="select-helper"
          value={selectedType}
          label="Select a Type"
          autoWidth
          onChange={(e) => handleFilterChange(e)}
        >
          <MenuItem value="all">
            <em>All</em>
          </MenuItem>
          {types && types.map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
       sx={{
          marginLeft: "40px",
          '@media (max-width: 600px)': {
            marginLeft: 0,
          },
       }}
       label="Search Pokemon" 
       variant="outlined"
       onChange={(e) => handleSearchChange(e)} />
      <FormGroup>
      <FormControlLabel
       control={
       <Checkbox
       checked={isCatched}
       onChange={() => handleCheckboxChange()}
       />
      }
        label="Catched Pokemon(s)" />
    </FormGroup>
    </Paper>
  );
}

FilterField.propTypes = {
  setFetching: PropTypes.func,
  setRenderList: PropTypes.func,
}


export default FilterField