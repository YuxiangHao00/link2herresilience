import bg from './images/bg40.png'
import '../../style.less'
import './triage.less'
import img15 from './images/15.png'
export default (props) => {
  return <div className="main-page img" style={{ backgroundImage: 'url(' + bg + ')' }}>
    <header>
      <h1 className="page-title">Consent and Healthy Relationships</h1>
    </header>
    <ul className='info-list'>
      <li className='info-item'>
        <h3 className='subtitle'>Welcome to Healthy Relationships 101!</h3>
        <p className='info-details'>As a migrant woman in Australia,
        In Australia, healthy relationships are built on respect, trust, and good communication. And guess what? Consent is at the heart of it all! Whether you're dating, in a romantic relationship, or just figuring things out, knowing about consent helps keep relationships safe, fun, and respectful.</p>
      </li>
      <li className='info-item' style={{ width: '60%' }}>
        <h3 className='subtitle'>What Is Consent?</h3>
        <p className='info-details'>Consent is like a green light — it’s all about giving a clear “yes” to things you feel comfortable with. In Australia, it’s illegal to engage in sexual activity without consent. Remember, you have the right to decide if, when, and how you want to be intimate, and this can change at any time!</p>
      </li>
      <li className='info-item' style={{ width: '60%' }}>
        <h3 className='subtitle'>How to Know You Have Consent?</h3>
        <p className='info-details'>It’s not complicated! Just ask. "Are you comfortable?" or "Is this okay?" are easy ways to check in. Consent can be verbal ("Yes, I’m good!") or non-verbal (a happy nod), but it should always be enthusiastic. If there’s any hesitation, pump the brakes — no one likes being pressured!</p>
      </li>
    </ul>
    <button onClick={() => { props.actType(7) }} className='size-btn' style={{ position:'absolute',right:'30px',bottom:'30px' }}>Next →</button>
  </div>
}   