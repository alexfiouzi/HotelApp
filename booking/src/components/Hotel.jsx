import React from 'react';


function checkNumber(num) {

  if (Number.isInteger(num)) {
    return num + ".0";
  } else {
    return num.toString();
  }
}

function Hotel(props) {

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row grid-divider">
            <div className="col-3" >
              <img src={props.thumbnail} height="250px" width="250px" />
            </div>
            <div className="col-4 d-flex flex-column justify-content-around">
              <div>
                <h1 className="text-secondary">{props.hotelName}</h1>

                <div className="stars-outer">
                  <div className="stars-inner" style={{ width: (props.rating / 5 * 100) + "%" }} />
                </div>Hotel

  </div>
              <div>
                {props.city}
              </div>
              <div className="d-flex">
                <p id="rating" style={{ backgroundColor: "green", width: 30, color: "white" }}>{checkNumber(props.ratingNumber)} </p>{props.ratingText}(1500 reviews)

  </div>
              <div>
                Excellent location(9.2/10)
  </div>
            </div>
            <div className="vl"></div>

            <div className="col-2 d-flex flex-column justify-content-around grey">
              <div className="d-flex flex-column">
                <div>  Hotel website
        <div>${props.price}</div>
                </div>
              </div>
              <div className="d-flex flex-column grey">
                <div> Agoda
         <div>${props.price + 100}</div>
                </div>
              </div>
              <div className="d-flex flex-column grey">
                <div>Travelocity
        <div>${props.price + 50}</div>
                  <div className="v2"></div>
                </div>
              </div>
              <div className="d-flex flex-column bold">
                <div id="v3"></div>
                <p id="deal">More Deals from</p>
                <select id="state" className="form-control  border-0" >
                  <option className="bold" defaultValue>${props.price}</option>
                </select>

              </div>
            </div>
            <div className="col-3 d-flex flex-column justify-content-around">
              <div id="website" >
                Hotel website
        <div id="price">
                  ${props.price}
                </div>
                <span id="night">3nights for</span> ${props.price * 3}
              </div>
              <div className="btn-group dropright d-flex  justify-content-end">
                <button type="button" className="btn bg-success text-white dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  VIEW DEAL
  </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );


}

export default Hotel;