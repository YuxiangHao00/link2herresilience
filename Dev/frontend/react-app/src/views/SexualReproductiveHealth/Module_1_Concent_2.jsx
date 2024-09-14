import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img22 from './images/22.png'
import img23 from './images/23.png'
import img18 from './images/18.png'
export default (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <div className='main-card flex  small-card'>
      <img src={img22} alt="" />

      <ul style={{ flex: '1' }}>
        <p className='info-details'>A healthy relationship makes you feel good, safe, and respected. Whether it's about holding hands or sharing life decisions, everything should be mutual. Here are a few signs you’re in a healthy relationship:</p>

        <li className='description-list'>
          You can say “no” without guilt.
        </li>
        <li className='description-list'>
          You can make decisions about your pregnancy with medical support, and laws ensure you’re not harassed while accessing care.
        </li>
        <li className='description-list'>
          You both respect each other’s space and choices. Remember, no one should ever feel pressured into doing something they’re not ready for — kissing doesn’t have to lead to sex, and that’s perfectly fine!
        </li>
      </ul>
    </div>
    <div className='main-card flex  small-card'>
      <ul style={{ flex: '1' }}>
        <p className='info-details'>Communicate Like a Pro</p>
        <p className='info-details'>Healthy relationships thrive on open communication. Don’t be afraid to talk about boundaries, feelings, or how far you’re comfortable going. Not sure how? Just start with simple questions like:</p>
        <li className='description-list'>
          Reproductive rights mean having control over decisions about your body, pregnancy, contraception, and sexual health.
        </li>
        <li className='description-list'>
          "Can we take things slow?"
        </li>
        <li className='description-list'>
          "How are you feeling about this?"
        </li>
        <li className='description-list'>
          It’s about creating a world where pregnancy and parenting decisions don’t depend on your wallet, location, or gender.
        </li>
        <p className='info-details'>The Role of Body Language</p>
        <p className='info-details'>Sometimes, it’s not just about words. Pay attention to body language! If your partner looks uncomfortable or pulls away, that’s a clear sign to stop and check in. Respect each other’s boundaries and be patient.</p>
      </ul>
      <img src={img23} alt="" />
    </div>

    <button onClick={() => { props.actType(8) }} className='size-btn' style={{ position: 'absolute', right: '30px', bottom: '30px' }}>Next →</button>

  </div>
}   