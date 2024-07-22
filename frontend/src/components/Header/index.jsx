import React from 'react';

import donateImage from './donate 3.jpg'

// import './index.css'

export default function Header() {

  return (
    <div>
        <div className="headers corner-clip-bottom w-100 bg-grey position-relative">
            <div className="position-absolute text-white text-center headertekst" style={{zIndex: 5}}>
                DONATE YOUR TREASURE
                <span></span>
            </div>
            <svg 
                id="" 
                style={{position:'absolute', bottom: 0}}
                viewBox="0 0 100 50" 
                preserveAspectRatio="none" 
                height="120%" 
                width="100%" 
                xmlns="http://www.w3.org/2000/svg"
			    // xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    
                <defs>
                    <pattern 
                        id="bg-img" 
                        patternUnits="userSpaceOnUse" 
                        height="100%"
                        width="100%">
                        <image 
                            xlinkHref={donateImage}
                            preserveAspectRatio="none" 
                            height="100%" width="100%" 
                        />
                    </pattern>
                </defs>

                <polygon fill="url(#bg-img)" points='0 0, 0 50, 50 50, 100 50, 100 0'/>
            </svg>
        </div>
    </div>
  )
}