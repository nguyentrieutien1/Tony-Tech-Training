import React from "react";

export default function App() {
  return (
    <section>
      <div className="">
        <div className="trending___product--container padding__content">
          <div className="trending___product--content">
            <div className="trending__product--title">
              <div>TOP TRENDING PRODUCTS</div>
              <span>Go To Trending Products</span>
            </div>
            <div className="trending__product--items">
              {/* <h3 style={{ textAlign: "center", width: "100%" }}>
                Loading Products . . .
              </h3> */}
              <div className="deal__product--item toptreding__product--item">
                <i className="fa-solid fa-spinner fa-spin fa-spin-1" />
                <div className="deal__product--item-img">
                  <img
                    src="https://movic.b-cdn.net/at_edmart/26-home_default/hummingbird-printed-t-shirt.jpg"
                    className="img-1"
                    alt="Image"
                  />
                  <img
                    src="https://movic.b-cdn.net/at_edmart/26-home_default/hummingbird-printed-t-shirt.jpg"
                    className="img-2"
                    alt="Image"
                  />
                  <img
                    src="https://movic.b-cdn.net/at_edmart/26-home_default/hummingbird-printed-t-shirt.jpg"
                    className="img-3 img-item-1"
                    alt="Image"
                  />
                </div>
                <div className="deal__product--item-list--icon">
                  <i className="fa-regular fa-heart">
                    <h4 className="sub-icon">Quick view</h4>
                  </i>
                  <i className="fa-regular fa-eye">
                    <h4 className="sub-icon">Quick view</h4>
                  </i>
                  <i className="fa-solid fa-rotate-left">
                    <h4 className="sub-icon">Quick view</h4>
                  </i>
                </div>
                <div className="deal__product--meta">
                  <div className="deal__product--item-des">
                    <div>111</div>
                  </div>
                  <div className="deal__product--item-name">
                    <div>111</div>
                  </div>
                  <div className="deal__product--item-start">
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                  </div>
                  <div className="deal__product--item-price-2">
                    <div>$111</div>
                    <i
                      className="fa-solid fa-cart-shopping shopping-btn"
                      data-id={1}
                    />
                  </div>
                </div>
              </div>
              <div className="deal__product--item toptreding__product--item">
                <i className="fa-solid fa-spinner fa-spin fa-spin-1" />
                <div className="deal__product--item-img">
                  <img
                    src="https://movic.b-cdn.net/at_edmart/26-home_default/hummingbird-printed-t-shirt.jpg"
                    className="img-1"
                    alt="Image"
                  />
                  <img
                    src="https://movic.b-cdn.net/at_edmart/26-home_default/hummingbird-printed-t-shirt.jpg"
                    className="img-2"
                    alt="Image"
                  />
                  <img
                    src="https://movic.b-cdn.net/at_edmart/26-home_default/hummingbird-printed-t-shirt.jpg"
                    className="img-3 img-item-1"
                    alt="Image"
                  />
                </div>
                <div className="deal__product--item-list--icon">
                  <i className="fa-regular fa-heart">
                    <h4 className="sub-icon">Quick view</h4>
                  </i>
                  <i className="fa-regular fa-eye">
                    <h4 className="sub-icon">Quick view</h4>
                  </i>
                  <i className="fa-solid fa-rotate-left">
                    <h4 className="sub-icon">Quick view</h4>
                  </i>
                </div>
                <div className="deal__product--meta">
                  <div className="deal__product--item-des">
                    <div>111</div>
                  </div>
                  <div className="deal__product--item-name">
                    <div>111</div>
                  </div>
                  <div className="deal__product--item-start">
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                    <i className="fa-regular fa-star" />
                  </div>
                  <div className="deal__product--item-price-2">
                    <div>$111</div>
                    <i
                      className="fa-solid fa-cart-shopping shopping-btn"
                      data-id={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
