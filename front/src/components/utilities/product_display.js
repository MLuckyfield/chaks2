import twitter from '../../sns_logos/twitter_dark.png'
import youtube from '../../sns_logos/yt_dark.png'
import instagram from '../../sns_logos/insta_dark.jpg'

const Product_Display = (props)=>{

  return (
          <div id="price">
            <div class="plan">
              <div class="plan-inner">
                <div class="entry-title">
                  <h3>Basic Wash</h3>
                  <div class="price">$25<span>/PER CAR</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li><strong>1x</strong> option 1</li>
                    <li><strong>2x</strong> option 2</li>
                    <li><strong>3x</strong> option 3</li>
                    <li><strong>Free</strong> option 4</li>
                    <li><strong>Unlimited</strong> option 5</li>
                  </ul>
                </div>
                <div class="btn">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
            <div class="plan basic">
              <div class="plan-inner">
                <div class="hot">hot</div>
                <div class="entry-title">
                  <h3>Express Wash</h3>
                  <div class="price">$50<span>/PER CAR</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li><strong>1x</strong> option 1</li>
                    <li><strong>2x</strong> option 2</li>
                    <li><strong>3x</strong> option 3</li>
                    <li><strong>Free</strong> option 4</li>
                    <li><strong>Unlimited</strong> option 5</li>
                  </ul>
                </div>
                <div class="btn">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
            <div class="plan standard">
              <div class="plan-inner">
                <div class="entry-title">
                  <h3>Super Wash</h3>
                  <div class="price">$75<span>/PER CAR</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li><strong>2x</strong> Free Entrance</li>
                    <li><strong>Free</strong> Snacks</li>
                    <li><strong>Custom</strong> Swags</li>
                    <li><strong>2x</strong> Certificate</li>
                    <li><strong>Free</strong> Wifi</li>
                  </ul>
                </div>
                <div class="btn">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
            <div class="plan ultimite">
              <div class="plan-inner">
                <div class="entry-title">
                  <h3>Unlimited Wash</h3>
                  <div class="price">$100<span>/PER CAR</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li><strong>1x</strong> option 1</li>
                    <li><strong>2x</strong> option 2</li>
                    <li><strong>3x</strong> option 3</li>
                    <li><strong>Free</strong> option 4</li>
                    <li><strong>Unlimited</strong> option 5</li>
                  </ul>
                </div>
                <div class="btn">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Product_Display;
