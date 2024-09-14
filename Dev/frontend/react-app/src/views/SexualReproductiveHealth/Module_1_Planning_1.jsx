import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img19 from './images/19.png'
import img20 from './images/20.png'
import img21 from './images/21.png'

const FamilyPlanningModule = (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <header>
      <h1 className="page-title">Know About Family Planning</h1>
      <h3 className='subtitle'>{`Welcome to the fun world
       of family planning! Think of it like piecing together
        a puzzle — except, this one is for your life! Family
         planning is about deciding when and how many little
          puzzle pieces (aka kids) you want. Whether you’re
           planning for one, two, or none, it’s all about having control over your future.`}</h3>
      <h3 className='subtitle'>Curious to know more? Let’s explore the journey ahead!</h3>
    </header>
    <div>
      <div className='main-card flex  small-card'>
        <div className='item-center'>
          <img src={img19} alt="" />
          <h3 className='subtitle'>Contraception: Options for All</h3>
        </div>
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
      <div className='main-card flex  small-card'>
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
        <div className='item-center'>
          <img src={img20} alt="" />
          <h3 className='subtitle'>Timing Matters</h3>
        </div>

      </div>
      <div className='main-card flex  small-card'>
        <div className='item-center'>
          <img src={img21} alt="" />
          <h3 className='subtitle'>Why Family Planning is </h3>
          <h3 className='subtitle'> Empowering </h3>

        </div>
        <ul style={{ flex: '1' }}>
          <li className='description-list'>
            Your Choice, Your Future: Whether you’re climbing the career ladder or focusing on personal goals, family planning lets you decide when the timing is right.          </li>
          <li className='description-list'>
            Freedom and Flexibility: Want to travel, study, or simply enjoy life before having kids? No rush! You’ve got options.
          </li>
          <li className='description-list'>
            Positive Health Outcomes: Reduce unplanned pregnancies, prevent STIs, and improve your overall health — family planning is like a personal health boost!        </li>
          <li className='description-list'>
            Confidence: Managing your future with confidence means no pop quizzes… and definitely no surprise babies! Remember: with family planning, you’re the one in charge!  </li>
        </ul>
      </div>
    </div>
    <button onClick={() => { props.actType(2) }} className='size-btn' style={{ float: 'right', marginRight: '20px' }}>Jump back to the Module</button>

  </div>
}

export default FamilyPlanningModule;
