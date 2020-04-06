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

  changeState = (event) => {
    this.setState({
      filters: {type: event.target.value}
    })
  }

  onAdoptPet= (id) => {
    let pets = this.state.pets;
    let index = pets.findIndex(element => element.id === id);
    if (index >= 0) {
      pets[index].isAdopted = true;
    }
    this.setState(
      {
        pets: pets
      }
    )
  }

  fetchPets = () => {
    let petURL = '/api/pets';
    if (this.state.filters.type !== 'all') {
      petURL += `?type=${this.state.filters.type}`
    }
    fetch(petURL)
    .then(resp => resp.json())
    .then(json => this.setState({pets: json}))
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
              <Filters onChangeType={this.changeState} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
