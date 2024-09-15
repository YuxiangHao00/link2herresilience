import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img10 from './images/10.png'
import img11 from './images/11.png'
import img12 from './images/12.png'
import img13 from './images/13.png'

const Module2Triage = (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    
    <header>
      <h1 className="page-title">Get Started by clicking on any one of the following modules</h1>
    </header>

    <div className='flex-box'>
      <li><img src={img13} alt="Module 3" className="hover-lift" style={{ height: '420px', cursor: 'pointer' }} onClick={() => {
        props.actType(3)
      }} /></li>

      <li><img src={img11} alt="Module 6" className="hover-lift" style={{ height: '420px', cursor: 'pointer' }} onClick={() => {
        props.actType(6)
      }} /></li>
    </div>

    <div className='flex-box' style={{ marginTop: '-120px' }}>
      <li><img src={img12} alt="Module 5" className="hover-lift" style={{ height: '420px', cursor: 'pointer' }} onClick={() => {
        props.actType(5)
      }} /></li>
    </div>
    
    <img src={img10} alt="" className="hover-lift" style={{ height: '220px', position: 'absolute', right: '20px', bottom: '20px' }}
      onClick={() => { 
      props.actType(12)      
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