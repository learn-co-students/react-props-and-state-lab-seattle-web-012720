import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  componentDidMount = () => {
    fetch('/api/pets').then(resp => resp.json())
    .then(data => {
      this.setState({
        pets: data
      })
  })
}

  adoptPet = (petId) => {
    this.setState(prevState => {
      return {pets: prevState.pets.map(pet => {
        if (pet.id === petId) {
          return { ...pet, isAdopted: true}
        } else {
          return pet
        }
      })}
  })
}

  changeType = (event) => {
    this.setState({
      filters: {type: event.target.value}
    })
  }

  findPets = () => {
    const currentType = this.state.filters.type
    const URL = '/api/pets' + (currentType !== 'all' ? `?type=${currentType}` : '');
    fetch(`${URL}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pets: data
        })
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPets={this.findPets} onChangeType={this.changeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

/*
App should pass a callback prop, onChangeType, to <Filters />. This callback needs to update <App />'s state.filters.type

<Filters /> needs a callback prop, onFindPetsClick. When the <Filters /> component calls onFindPetsClick, <App /> should fetch a list of pets using fetch().

Assuming your app is up and running, you can make a fetch to this exact URL: /api/pets with an optional query parameter to get your data.
Use App's state.filters to control/update this parameter
If the type is 'all', send a request to /api/pets
If the type is 'cat', send a request to /api/pets?type=cat. Do the same thing for dog and micropig.
The pet data received will include information on individual pets and their adoption status.

ould pass a callback prop, onAdoptPet, to <PetBrowser />. This callback should take in an id for a pet, find the matching pet in state.pets and set the isAdopted property to true.
Filters
*/