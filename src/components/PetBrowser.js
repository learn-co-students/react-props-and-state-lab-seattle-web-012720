import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  
  render() {
    const petCards = this.props.pets.map(perpet => <Pet key={perpet.id} pet={perpet} onAdoptPet={this.props.onAdoptPet}/> )
    return (
    <div className="ui cards">{petCards}</div>
    )
  }
}

export default PetBrowser
