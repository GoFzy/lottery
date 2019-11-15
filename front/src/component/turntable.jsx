import './turntable.scss';
import Axios from 'axios';

class Turntable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gifts: [],
      panelTrans: {
        deg: 0,
        transition: 'none',
        transform: 'rotate(0)',
      },
    }
  }

  handleClick = (() => {
    // 使用wait标志防止用户在动画期间多次点击
    let wait;
    return async () => {
      if (!wait) {
        wait = true;
        const illuminationBox = this.refs.illuminationBox;
        await Axios
          .get('api/lottery').then((res) => {
            let prizeLevel = res.data.result;
            let deg = this.state.panelTrans.deg;
            let result = '';
            switch (prizeLevel) {
              // 设hi抽中对应等级奖项时，转盘转动的角度
              case 1:
                deg += -(deg % 360) + [-108, 144][Math.floor(Math.random()) * 2];
                result = '一等奖牛皮';
                break
              case 2:
                deg += -(deg % 360) + 36;
                result = '二等奖厉害';
                break
              case 3:
                deg += -(deg % 360) + [-144, -36, 72][Math.floor(Math.random()) * 3];
                result = '三等奖还行';
                break
              default:
                deg += -(deg % 360) + [-72, 0, 108, 180][Math.floor(Math.random()) * 4];
                result = '很遗憾未能中奖';
            }

            // 转盘最少转五圈
            deg += 1800;
            console.log(result);
            this.setState({
              panelTrans: {
                deg,
                transition: '5s ease',
                transform: `rotate(${deg}deg)`,
              },
            }, () => {
              illuminationBox.classList.add('illumination-twinkling');
              setTimeout(() => {
                this.props.getResult(result);
                illuminationBox.classList.remove('illumination-twinkling');
                wait = false;
              }, 6000);
            })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  })()

  render() {
    return (
      <div className="turntable">
        <ul className="illumination-box" ref="illuminationBox">
          {this.state.gifts.map((item, index) =>
            <li className="illumination" key={index} />
          )}
        </ul>

        <ul className="panel" style={this.state.panelTrans}>
          {this.state.gifts.map((item, index) =>
            <li className="sector" key={index} >
              <div className="sector-inner" >
                <span>{item.name}</span>
              </div>
            </li>
          )}
        </ul>

        <div className="pointer" onClick={this.handleClick}>
          <img src={require('../assets/pointer.png')} alt="指针" />
        </div>

      </div>
    )
  }

  componentDidMount() {
    // 请求服务端奖项数据
    Axios
      .get('api/lottery').then((res) => {
        this.setState({
          gifts: res.data.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export default Turntable