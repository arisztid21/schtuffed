import React, {Component} from 'react'
import axios from 'axios'

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
      <div className="profilethumb-container">
        {this.state.userProfile ? this.state.userProfile[0].username : "Loading"}
          <img src={this.state.userProfile ? this.state.userProfile[0].photos : "Loading"} />
      </div>
    )
  }
}

export default ProfileThumb
