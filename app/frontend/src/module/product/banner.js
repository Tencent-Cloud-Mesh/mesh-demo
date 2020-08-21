import * as React from 'react'

// import backgroundImg from '../../../src/static/img/banner.png'

class ProductBanner extends React.Component{
  render(){
    const style = {
      'backgroundImage':"url(" + require('../../../src/static/img/banner.png') + ")"
    }
    return (
      <div className="banner section" style={style}>
			<div className="container">
						<div className="hot-deal">
							<ul className="hot-deal-countdown">
								<li>
									<div>
										<h3>02</h3>
										<span>Days</span>
									</div>
								</li>
								<li>
									<div>
										<h3>10</h3>
										<span>Hours</span>
									</div>
								</li>
								<li>
									<div>
										<h3>34</h3>
										<span>Mins</span>
									</div>
								</li>
								<li>
									<div>
										<h3>60</h3>
										<span>Secs</span>
									</div>
								</li>
							</ul>
							<h2 className="text-uppercase">hot deal this week</h2>
							<p>New Collection Up to 50% OFF</p>
							<button className="primary-btn cta-btn">Shop now</button>
						</div>
					</div>
		</div>
    )
  }
} 


export default ProductBanner