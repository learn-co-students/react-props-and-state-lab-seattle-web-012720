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

  getPets = () => {
    let endpoint = '';
    if (this.state.filters.type === 'all') {
      endpoint = '/api/pets';
    } else {
      endpoint = `/api/pets?type=${this.state.filters.type}`;
    }
    fetch(endpoint)
      .then(resp => {
        return resp.json();
      }).then(data => {
        this.setState({
          pets: data
        })
      });
  }

  changeType = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  adoptPet = (id) => {
    this.setState(prev => {
      return { 
        pets: prev.pets.map(pet => {
          if (pet.id !== id) {
            return pet;
          } else {
            return {...pet, isAdopted: true};
          }
        })
      };
    });
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
              <Filters onChangeType={this.changeType} onFindPetsClick={this.getPets}/>
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
