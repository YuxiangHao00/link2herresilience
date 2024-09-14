import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img16 from './images/16.png'
import img17 from './images/17.png'
import img18 from './images/18.png'
export default (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <div className='main-card flex zigzag-card small-card'>
      <img src={img18} alt="" />
      <ul style={{ flex: '1' }}>
        <li className='description-list'>
          Abortion is decriminalized across Australia, and it’s treated like any other healthcare service.
        </li>
        <li className='description-list'>
          You can make decisions about your pregnancy with medical support, and laws ensure you’re not harassed while accessing care.         </li>
        <li className='description-list'>
          It’s your right to have a safe, confidential experience without unnecessary barriers.        </li>
      </ul>
    </div>
    <div className='main-card flex zigzag-card small-card'>
      <ul style={{ flex: '1' }}>
        <li className='description-list'>
          Reproductive rights mean having control over decisions about your body, pregnancy, contraception, and sexual health.
        </li>
        <li className='description-list'>
          Whether you want kids, don’t want them, or want them later — it’s your call.
        </li>
        <li className='description-list'>
          Trans men, non-binary, and gender-diverse people are included too!
        </li>
        <li className='description-list'>
          It’s about creating a world where pregnancy and parenting decisions don’t depend on your wallet, location, or gender.
        </li>
      </ul>
      <img src={img16} alt="" />
    </div>
    <div className='main-card flex zigzag-card small-card'>
      <img src={img17} alt="" />
      <ul style={{ flex: '1' }}>
        <li className='description-list'>
          Abortion is decriminalized across Australia, and it’s treated like any other healthcare service.
        </li>
        <li className='description-list'>
          You can make decisions about your pregnancy with medical support, and laws ensure you’re not harassed while accessing care.
        </li>
        <li className='description-list'>
          It’s your right to have a safe, confidential experience without unnecessary barriers.
        </li>
      </ul>
    </div>
    <button onClick={()=>{props.actType(2)}} className='size-btn' style={{float:'right',marginRight:'20px'}}>Jump back to the Module</button>
    
  </div>
}   