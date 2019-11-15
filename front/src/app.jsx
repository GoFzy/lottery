import './app.scss';
import Turntable from './component/turntable';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: '',
    }
  }

  getResult = (result) => {
    this.setState({
      result,
    })
  }

  render() {
    return (
      <>
        <div className="title">
          <img src={require('./assets/title.png')} alt="标题" />
        </div>

        <Turntable getResult={this.getResult}/>

        <div className="result">{this.state.result}</div>
      </>
    )
  }
}

export default App;