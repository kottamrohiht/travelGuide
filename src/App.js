import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here

const apiConstants = {
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class App extends Component {
  state = {
    apiStatus: '',
    itemsList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiConstants.loading,
    })
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        itemsList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.fail,
      })
    }
  }

  renderSuccessView = () => {
    const {itemsList} = this.state

    console.log(itemsList)
    return (
      <div className="travel-container">
        <ul className="list-container">
          {itemsList.map(each => (
            <li key={each.id} className="each-container">
              <img src={each.imageUrl} alt={each.name} className="travel-img" />
              <div className="inner-container">
                <h1 className="tour-heading"> {each.name} </h1>
                <p className="tour-para"> {each.description} </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailView = () => <h1> renderFailView </h1>

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.loading:
        return this.renderLoadingView()
      case apiConstants.fail:
        return this.renderFailView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-main-container">
        <h1 className="heading"> Travel Guide </h1>
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default App
