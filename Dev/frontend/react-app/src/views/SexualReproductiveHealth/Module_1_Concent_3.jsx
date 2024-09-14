import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img24 from './images/24.png'

const Module1Consent3 = (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <div className='main-card flex' style={{ background: '#150406' }}>
      <img src={img24} alt="" style={{height:'100%'}} />
      <div>
        <p className='subtitle' style={{ color: '#fff' }}>
          Consent & Alcohol or Drugs
        </p>
        <p className='subtitle' style={{ color: '#fff' }}>
          Here’s an important rule: if someone is too drunk or out of it, they can’t give consent. Consent requires clear-minded decisions, and alcohol or drugs can mess with that. If there’s any doubt, it’s always best to pause and wait for a better time.
        </p>
        <p className='subtitle' style={{ color: '#fff', marginTop: '20px' }}>
          Everyone Deserves Respect!
        </p>
        <p className='subtitle' style={{ color: '#fff' }}>
          You have the right to say “no” at any time, no matter the situation or what happened before. It’s your body, your rules, and no one else’s. Respect goes both ways!
        </p>
        <p className='subtitle' style={{ color: '#fff', marginTop: '20px' }}>
          Fun Tip: Consent Is Sexy!
        </p>
        <p className='subtitle' style={{ color: '#fff' }}>
          Believe it or not, asking for consent can be fun and sexy! It shows confidence and care, making the experience more enjoyable for everyone. So go ahead, make consent part of your relationship routine!
        </p>
      </div>


    </div>

    <button onClick={() => { props.actType(2) }} className='size-btn' style={{ position: 'absolute', right: '50px', bottom: '30px' }}>Jump back to the Module</button>

  </div>
};

export default Module1Consent3;