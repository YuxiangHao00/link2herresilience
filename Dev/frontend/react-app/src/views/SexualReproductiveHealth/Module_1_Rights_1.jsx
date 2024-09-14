import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img15 from './images/15.png'
export default (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <div>
      <header>
        <h1 className="page-title">About your Reproductive Rights in Australia</h1>
      </header>
      <div className='main-card flex' style={{ width: '70%' }}>
        <img src={img15} alt="" />
        <div style={{ flex: '1' }}>
          <h3 className='subtitle'>You wouldn’t let someone else choose what you wear today, so why let anyone decide what’s best for your body?</h3>
          <p className='info-details'>Reproductive rights give you control over your body and life decisions. Whether it's family planning, contraception, or abortion, these rights ensure that everyone gets to decide what's best for them. It's about personal freedom, dignity, and access to safe healthcare without judgment.</p>
        </div>
      </div>
    </div>
    <div style={{ marginTop: '20px' }}>
      <header>
        <h1 className="page-title">Remember, no one likes a backseat driver… especially when it comes to your life choices!</h1>
      </header>
      <div className='main-card' style={{ width: '70%', float: 'right' }}>
        <ul>
          <li className='description-list info-details'>Reproductive rights ensure that people can make informed decisions about pregnancy and family planning.</li>
          <li className='description-list info-details'>Access to safe and legal abortion is a fundamental right in Australia.</li>
          <li className='description-list info-details'>Healthcare should be about respect and privacy, not shame or judgment.</li>
          <li className='description-list info-details'>Safe access zones mean no one should have to walk a “gauntlet of awkward stares and signs” when seeing their doctor.</li>
        </ul>
        <button onClick={()=>{props.actType(4)}} className='size-btn' style={{float:'right',marginRight:'20px'}}>Next →</button>
      </div>
    </div>

  </div>
}   