import React, {Component} from 'react'
import axios from 'axios'
import './ProfileThumb.scss'
import {Link} from 'react-router-dom'

class ProfileThumb extends Component {
  constructor () {
    super()
    this.state = {
      userProfile: null
    }
  }

  componentDidMount () {
    console.log('hit componentdidm', this.props.id)
    axios.get(`/users/profiles/${this.props.id}`).then( res => {
      console.log(res.data)
      this.setState({
        userProfile: res.data
      })
    })
  }

  render () {
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="ProfileThumb">
          <img src={this.state.userProfile ? this.state.userProfile[0].photos : "Loading"} />
          <div className="ProfileThumbDetails">
             <h2>{this.state.userProfile ? this.state.userProfile[0].username : "Loading"}</h2>
            <h3>Followers:</h3>
            <h3>Total Reviews:</h3>
          </div>
      </div>
    )
  }
}

export default ProfileThumb
