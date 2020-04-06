  
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

  componentDidMount() {
    this.getPets()
  }


  getPets = () => {
    let PETS_API = '/api/pets'
    let FILTER_TYPE = this.state.filters.type
    fetch(`${PETS_API}${FILTER_TYPE !== 'all' ? '?type=' + FILTER_TYPE : ""}`)
    .then((response) => {
      return response.json();
    })
    .then((pets) => {
      this.setState({
        pets
      });
    })
  }


  changeType = newType => {
    this.setState({
      filters: {
        type: newType}
    })
  }

  adoptPet = petId => {
    this.setState(prevState => {
      return {
        pets: prevState.pets.map(currentPet => {
          if (currentPet.id !== petId){
            return currentPet
          } else {
            return {...currentPet, isAdopted: true}
          }
        })
      }
    })
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.getPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser getPets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App