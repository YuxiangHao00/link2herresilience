import bg from './images/bg60.png'
import '../../style.less'
import './triage.less'
import img10 from './images/10.png'
import img25 from './images/25.png'
import img26 from './images/26.png'

const Module2Triage = (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <header>
      <h1 className="page-title">Get Started by clicking on any one of the following modules</h1>
    </header>

    <div className='flex-box' style={{ justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
      <li><img src={img25} alt="Module 3" className="hover-lift" style={{ height: '600px', cursor: 'pointer', margin: '0 20px' }} onClick={() => {
        props.actType(10)
      }} /></li>
      <li><img src={img26} alt="Module 6" className="hover-lift" style={{ height: '650px', cursor: 'pointer', margin: '0 20px' }} onClick={() => {
        props.actType(11)
      }} /></li>
    </div>

    <img src={img10} alt="" className="hover-lift" style={{ height: '220px', position: 'absolute', right: '20px', bottom: '20px' }}
      onClick={() => { 
      props.actType(13)      
    }} />


    <button 
      onClick={() => props.actType(1)} 
      className='main-btn' 
      style={{ position: 'absolute', left: '20px', bottom: '20px' }}
    >
      Back
    </button>
  </div>
}

export default Module2Triage;