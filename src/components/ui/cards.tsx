import React from 'react';

const Cards = () => {
    return (

<div className="flip-card w-48 h-64 perspective-1000 font-sans">
<div className="flip-card-inner card">
  <div className="flip-card-front flex flex-col justify-center items-center">
  <div className="card-img">
          <div className="img"> 
            Test Image
          </div>
          </div>
  </div>
  <div className="flip-card-back flex flex-col justify-center items-center transform rotate-y-180">
  <div className="">
            <div className="card-title text-lg font-medium text-gray-900 mb-3 capitalize">
                Game Title
            </div>
            <div className="card-subtitle text-sm font-normal text-gray-500">
                Game description. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
            <hr className="card-divider border-t my-3 border-gray-200" />
        </div>  
  </div>
</div>
</div>
        
    );
};

export default Cards;
