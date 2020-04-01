import React from 'react'

class Pet extends React.Component {
  handleAdoptPet = () => {
    this.props.onAdoptPet(this.props.pet.id)
  }
  
  render() {
    return (
      <div className="card">
        <div className="content">
          <div className="header">
            {this.props.pet.gender === "female" ? '♀' : '♂'}
            {this.props.pet.name}
          </div>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.props.pet.isAdopted === true ? <button className="ui disabled button">Already adopted</button> :
          <button onClick={this.handleAdoptPet} className="ui primary button">Adopt pet</button>}
        </div>
      </div>
    )
  }
}

export default Pet
