import twitter from '../../sns_logos/twitter_dark.png'
import youtube from '../../sns_logos/yt_dark.png'
import instagram from '../../sns_logos/insta_dark.jpg'

const Product_Display = (props)=>{

  return (
    <div class="row">
        <div class='col'>
          <h2>Group Lessons</h2>
          <h3>1000/30min</h3>
          <p>No online payment needed! Join and leave anytime without reservation. Group lessons with max size of 4 people. Pay only for the time you stay!</p>
        </div>
        <div class='col'>
          <h2>Private Lessons</h2>
          <h3>5000yen/45min lesson</h3>
          <p>Start your day with personalized 1-to-1 instruction! You can learn about business English or TOEFL preparation, in addition to our usual offering.</p>
        </div>
        <div class='col'>
          <h2>All You Can English</h2>
          <h3>30,000/month</h3>          
          <p>Level up significantly with high intensity English study! Come as much as you want to group lessons with no limit. Perfect for people preparing for ryugaku, work transfers or presentations, etc. Practice makes perfect!</p>
        </div>
    </div>
  )
}

export default Product_Display;
