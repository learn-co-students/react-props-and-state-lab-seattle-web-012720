import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  goThroughPets = () => {
    return this.props.getPets.map(currentPet => {
      return <Pet key={currentPet.id} pet={currentPet} onAdoptPet={this.props.onAdoptPet}/>
    })
  } 

  render() {
    return <div className="ui cards">{this.goThroughPets()}</div>
  }
}

export default PetBrowser