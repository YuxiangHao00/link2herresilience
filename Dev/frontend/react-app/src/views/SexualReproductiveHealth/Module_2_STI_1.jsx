import '../../style.less'
import './triage.less'
import img27 from './images/27.png'
import img28 from './images/28.png'
import img29 from './images/29.png'
import img30 from './images/30.png'
import img31 from './images/31.png'
import img32 from './images/32.png'
import img33 from './images/33.png'

const FamilyPlanningModule = (props) => {
  return <div className="main-page img">

    <header>
      <h1 className="page-title">STIs in Australia: Stay Safe, Stay Healthy!</h1>
      <h3 className='subtitle' style={{ color: 'black' }}>{`Welcome to the world of STIs (Sexually Transmitted Infections)! 
      We know it sounds a bit scary, but don't worry — we’re 
      here to help you understand how to protect yourself, 
      stay healthy, and feel confident.`}</h3>
      <h1 className="page-title">What are STIs?</h1>
      <h3 className='subtitle' style={{ color: 'black' }}>{`STIs are infections passed through sexual contact, and they’re more common 
      than you think. One in six Australians has had an STI, but the good news is they can often be prevented and treated!`}</h3>
      <h1 className="page-title">Common STIs in Australia</h1>
      <h3 className='subtitle' style={{ color: 'black' }}>{`In this module we discuss the seven most common Sexually Transmitted 
      Infections in Australia and learn about how to prevent them.`}</h3>
    </header>

    <div className="big-card big-card-sti">
        <div className="big-card-content">
          <img src={img27} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">CHLAMYDIA</h3>
            <h4 className="subtitle" style={{color:'black'}}>It’s one of the most common STIs in Australia, often without symptoms. Caused by a bacteria which 
              manifests in different ways, if left untreated, it can cause some serious issues like infertility. </h4>
            <h3 className="subtitle">Prevention Techniques</h3>
            <ul className="description-list">
              <li>Use condoms: Always use a condom during vaginal, oral, or anal sex to reduce the risk of infection.</li>
              <li>Get tested regularly: If you're sexually active, especially under 30, get tested for Chlamydia and other STIs annually.</li>
              <li>Limit sexual partners: Reducing the number of sexual partners lowers the chances of contracting Chlamydia.</li>
            </ul>
          </div>
        </div>
    </div>

    <div className="big-card big-card-sti">
      <div className="big-card-content">
        <div className="big-card-text">
          <h3 className="subtitle"> The Pop-Up Surprise - Once it arrives, it can pop up again unexpectedly like that neighbour you didn’t invite to dinner.</h3>
          <h4 className="subtitle" style={{color:'black'}}>Genital herpes might sound scary, but it’s more common than you think! It’s caused by a virus that can 
            lead to painful blisters. The good news is you can manage the symptoms and keep it from bothering you too much. Think of it like an annoying but 
            manageable roommate! </h4>
          <h3 className="subtitle">Prevention Techniques</h3>
          <ul className="description-list">
            <li>Use protection: Always use condoms or dental dams during sex to reduce the risk of transmission.</li>
            <li>Avoid contact during outbreaks: Don’t engage in sexual activity when you or your partner have visible sores or symptoms.</li>
          </ul>
          <img src={img28} alt="Chlamydia information" className="big-card-image" />
        </div>
      </div>
    </div>

    <div className="big-card big-card-sti">
        <div className="big-card-content">
          <img src={img29} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">Nicknamed “The Clap”, but trust us, you won’t be applauding this infection!</h3>
            <h4 className="subtitle" style={{color:'black'}}>Bacterial infection that can make things uncomfortable down 
              there. It’s not a great party guest, but with the right treatment, you can send it packing. Don’t worry, it’s just a temporary guest – 
              if treated in time! It can develop within a week of exposure to an infected person. </h4>
            <h3 className="subtitle">Prevention Techniques</h3>
            <ul className="description-list">
              <li>The most common way would obviously using condoms during a sexual encounter.</li>
              <li>Regular STI tests help catch and treat Gonorrhoea early, even if there are no symptoms.</li>
            </ul>
          </div>
        </div>
    </div>

    <div className="big-card big-card-sti">
        <div className="big-card-content">
          <img src={img30} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">Hepatitis B - The Liver’s Frenemy </h3>
            <h4 className="subtitle" style={{color:'black'}}>It’s not just passed through sex but also through blood contact, like sharing needles. It can 
              cause short-term illness, but in some cases, it sticks around and leads to long-term liver problems like liver cancer. Many people don’t show 
              symptoms initially, making it a bit of a silent visitor, but it's definitely one to keep an eye on!</h4>
            <h3 className="subtitle">Prevention Techniques</h3>
            <ul className="description-list">
              <li>Vaccination: The Hepatitis B vaccine is the best protection.</li>
              <li>Avoid Sharing Needles: Don’t share needles or other drug-related equipment.</li>
              <li>Safe Piercings/Tattoos: Make sure needles are sterile and used only once for tattoos or piercings.</li>
            </ul>
          </div>
        </div>
    </div>

    <div className="big-card big-card-sti">
        <div className="big-card-content">
          <img src={img31} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">Like Hep B’s cousin, Hepatitis C is also a liver infection</h3>
            <h4 className="subtitle" style={{color:'black'}}>Mainly spread through contact with infected blood. While many people don’t show symptoms right 
              away, over time, it can lead to serious liver damage if left untreated. Symptoms can include fatigue, nausea, and jaundice (yellowing of the skin). 
              The good news is that Hepatitis C is treatable, so early diagnosis is key! </h4>
            <h3 className="subtitle">Prevention Techniques</h3>
            <ul className="description-list">
              <li>Avoid sharing personal items: Such as razors, toothbrushes, or anything that might have blood on it. </li>
              <li>Screening for blood transfusions: Make sure blood products have been tested for Hepatitis C.</li>
            </ul>
          </div>
        </div>
    </div>

    <div className="big-card big-card-sti">
        <div className="big-card-content">
          <img src={img32} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">The drama queen of STIs—always changing costumes. Best to catch it early before the show gets too dramatic!</h3>
            <h4 className="subtitle" style={{color:'black'}}>Sexually transmitted infection that can cause symptoms like sores or rashes, but it often 
              goes unnoticed at first. Symptoms can disappear and reappear over time, making it easy to miss. If left untreated, it can lead to more serious health 
              problems down the line, affecting multiple organs. </h4>
            <h3 className="subtitle">Prevention Techniques</h3>
            <ul className="description-list">
              <li>Use Condoms: Always use condoms during vaginal, anal, or oral sex to reduce the risk of syphilis transmission.</li>
              <li>Get Regular Checkups: Routine STI screenings can catch syphilis early, even if there are no symptoms.</li>
            </ul>
          </div>
        </div>
    </div>

    <div className="big-card big-card-sti">
        <div className="big-card-content">
          <img src={img33} alt="Chlamydia information" className="big-card-image" />
          <div className="big-card-text">
            <h3 className="subtitle">Think of it like a challenge—you can beat it with the right tools.</h3>
            <h4 className="subtitle" style={{color:'black'}}>Virus that affects your immune system, making it harder for your body to 
              fight off infections. Over time, if untreated, it can lead to AIDS. But with modern treatments, people living with HIV can manage 
              the virus and lead long, healthy lives.</h4>
            <h3 className="subtitle">Prevention Techniques</h3>
            <ul className="description-list">
              <li>Apart from contraceptives, take PrEP: Pre-exposure prophylaxis (PrEP) is a daily pill that significantly lowers the risk of getting HIV.</li>
              <li>Get Treated if HIV Positive: Antiretroviral therapy (ART) reduces the viral load, lowering the risk of transmitting HIV to others.</li>
            </ul>
          </div>
        </div>
    </div>

    <button onClick={() => { props.actType(9) }} className='size-btn' style={{ float: 'right', marginRight: '20px' }}>Jump back to the Module</button>
  </div>
}

export default FamilyPlanningModule;
