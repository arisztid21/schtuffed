import React, {Component} from 'react';
import axios from 'axios'
import './SingleTestimony.scss'

class SingleTestimony extends Component {

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.props.getTestimonies()
    }
  }

  render () {

    console.log(this.props)

    let { title,
      ratings,
      description,
      date_posted,
      stateTitle,
      stateRating,
      stateDescription,
      toggleEdit,
      editedTestimony,
      handleChange,
      handleToggleEdit,
      deleteTestimony,
      editTestimony
    } = this.props;

    return (

      <div className="SingleTestimony">

        {this.props.id &&
          <div className="SingleTestimonyInputs">
            <input className={toggleEdit ? "showInput" : "none" } name="title" type="text" value={toggleEdit && this.props.id == editedTestimony ? stateTitle : title} onChange={(e) => handleChange(e)} />
            <span>{date_posted}</span>
            <input className={toggleEdit ? "showInput" : "none" } name="rating" type="text" value={toggleEdit && this.props.id == editedTestimony ? stateRating : ratings} onChange={(e) => handleChange(e)}/>
            <input className={toggleEdit ? "showInput" : "none" } name="description" type="text" value={toggleEdit && this.props.id == editedTestimony ? stateDescription : description} onChange={(e) => handleChange(e)}/>
          </div>

        }

          {this.props.user && this.props.user_id == this.props.user.id ?

            <div className="SingleTestimonyLoggedIn">

            {this.props.toggleEdit ?
                <button onClick={() => editTestimony(this.props.id, stateTitle, stateRating, stateDescription, this.props.user_id)}>Save Changes</button> :
                <button onClick={() => handleToggleEdit(title, ratings, description, this.props.id)}>Edit</button>
            }

              <button onClick={() => deleteTestimony(this.props.id)}>Delete Button</button>
            </div>

            :

            null
          }

      </div>
    )
  }
}

export default SingleTestimony;
