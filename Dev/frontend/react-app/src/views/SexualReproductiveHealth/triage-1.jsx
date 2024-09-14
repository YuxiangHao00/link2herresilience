import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img10 from './images/10.png'
import img11 from './images/11.png'
import img12 from './images/12.png'
import img13 from './images/13.png'
export default () => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <header>
      <h1 className="page-title">Get Started by clicking on any one of the following modules</h1>
    </header>
    <div className='flex-box'>
      <li><img src={img13} style={{height:'420px'}}/></li>
      <li><img src={img11} style={{height:'420px'}} /></li>
    </div>
    <div className='flex-box' style={{marginTop:'-100px'}}>
      <li><img src={img12} style={{height:'420px'}} /></li>
    </div>
    <img src={img10} style={{height:'220px',position:'absolute',right:'20px',bottom:'20px'}} />
  </div>
}