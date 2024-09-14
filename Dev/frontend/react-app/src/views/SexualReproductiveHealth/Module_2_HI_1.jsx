import '../../style.less'
import './triage.less'
import img34 from './images/34.png'
import img35 from './images/35.png'
import img36 from './images/36.png'
import img37 from './images/37.png'
import img38 from './images/38.png'


const FamilyPlanningModule = (props) => {
  return <div className="main-page img">

    <header>
      <h1 className="page-title">Health Issues in Women</h1>
      <h3 className='subtitle' style={{ color: 'black' }}>{`Apart from STIs and mental health challenges, migrant women in Australia may face several other common health 
      issues. In this module, we discuss the 5 most common health issues faced by the migrant women.`}</h3>
    </header>

    <div className="big-card big-card-hi">
        <div className="big-card-content">
          <img src={img34} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">The Silent Sneak-Ups</h3>
            <h4 className="subtitle" style={{color:'black'}}>Let’s face it—chronic diseases like diabetes, high blood pressure, and asthma love to sneak up on us when we’re not 
              looking! But don’t worry, these conditions are manageable if caught early.  </h4>
            <br/>
            <h4 className="subtitle" style={{color:'black'}}>If you’re feeling more tired than usual or your body’s giving you a little “tap on the shoulder,” it might be time to 
              check in with a healthcare provider. Remember, your health is just as important as anyone else’s, and Australia’s healthcare system has got your back—once you know how 
              to navigate it! </h4>
          </div>
        </div>
    </div>

    <div className="big-card big-card-hi">
        <div className="big-card-content">
          <img src={img35} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">More Than Just Baby Talk</h3>
            <h4 className="subtitle" style={{color:'black'}}>Pregnancy can be a wonderful journey, but it’s no secret that it comes with a few extra health check-ups! Conditions like 
              gestational diabetes, anemia, and blood pressure issues can pop up, but the good news is they’re totally manageable with the right care.  </h4>
            <br/>
            <h4 className="subtitle" style={{color:'black'}}>Whether you're thinking about having a baby or already on the journey, regular check-ups are your best friend. You deserve 
              care that respects both you and your culture—because every mom-to-be deserves a smooth ride! </h4>
          </div>
        </div>
    </div>

    <div className="big-card big-card-hi">
        <div className="big-card-content">
          <img src={img36} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">The Ones You Don’t See Coming</h3>
            <h4 className="subtitle" style={{color:'black'}}>Diseases like tuberculosis (TB) and respiratory infections don’t send you a “heads-up” before they hit. Sometimes they come from 
              crowded living spaces or other conditions you might’ve encountered before coming to Australia. </h4>
            <br/>
            <h4 className="subtitle" style={{color:'black'}}>If you’re coughing or feeling off, it might be more than just the flu—so don’t ignore it! Getting tested can keep you and your 
              community safe. And hey, remember: it’s always better to know early so you can get treated and get back to your usual fabulous self! </h4>
          </div>
        </div>
    </div>

    <div className="big-card big-card-hi">
        <div className="big-card-content">
          <img src={img37} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">The Balancing Act</h3>
            <h4 className="subtitle" style={{color:'black'}}>Adapting to new foods in Australia might feel like a juggling act—one hand’s got meat pies, the other’s still missing your 
              favorite dish from back home! But nutrition matters, especially when it comes to making sure you’re getting enough vitamins like vitamin D, iron, and calcium. </h4>
            <br/>
            <h4 className="subtitle" style={{color:'black'}}>Feeling tired or weak? It might not just be the daily grind—it could be a lack of essential nutrients. A balanced diet is key, 
              and no worries—you don’t have to give up your cultural favorites! Mixing the old with the new can keep your body and soul healthy. </h4>
          </div>
        </div>
    </div>

    <div className="big-card big-card-hi">
        <div className="big-card-content">
          <img src={img38} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">The Back-Breakers</h3>
            <h4 className="subtitle" style={{color:'black'}}>All that heavy lifting at work, or just everyday life, can give your body a bit more than it bargained for—think back pain, 
              joint problems, and sore muscles. While you might be tempted to just "push through," taking care of your body is just as important as taking care of everyone else! </h4>
            <br/>
            <h4 className="subtitle" style={{color:'black'}}>Some simple exercises, proper lifting techniques, and rest can make a big difference. Remember, you’re stronger when you’re not 
              carrying the world (or too many boxes) on your back! </h4>
          </div>
        </div>
    </div>

    <button onClick={() => { props.actType(9) }} className='size-btn' style={{ float: 'right', marginRight: '20px' }}>Jump back to the Module</button>
  </div>
}

export default FamilyPlanningModule;
