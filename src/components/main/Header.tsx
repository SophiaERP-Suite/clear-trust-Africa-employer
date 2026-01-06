const Header = () => {
  return (
    <>
      <div className="header-top-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-12 col-12">
              <div className="header-left">
                <p>Smart security. Strong protection.</p>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-12">
              <div className="header-right">
                <div className="address-content">
                  <p>
                    <i data-feather="map-pin"></i>
                    <span>Alabama, USA</span>
                  </p>
                  <p>
                    <i data-feather="phone"></i>
                    <span>
                      <a href="#">+06 58 49 99 56</a>
                    </span>
                  </p>
                </div>
                <div className="social-icon-wrapper">
                  <ul className="social-icon social-default icon-naked">
                    <li>
                      <a href="https://www.facebook.com/">
                        <i data-feather="facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com/">
                        <i data-feather="twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/">
                        <i data-feather="instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkdin.com/">
                        <i data-feather="linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Header Area  */}
      <header className="tmp-header header-default header-transparent logo-white-show default-nav-white header-sticky header-one">
        <div className="container position-relative">
          <div className="row align-items-center row--0">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              <div className="logo">
                <a href="index.html">
                  <img
                    className="logo-light"
                    src="/assets/main/images/logo/logo.png"
                    alt="Corporate Logo"
                  />
                  <img
                    className="logo-dark"
                    src="/assets/main/images/logo/logo-dark.png"
                    alt="Corporate Logo"
                  />
                </a>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-6 col-8 position-static">
              <div className="header-right with-search">
                <nav className="mainmenu-nav d-none d-lg-block">
                  <ul className="mainmenu">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="#">How it works</a>
                    </li>
                    <li className="with-megamenu">
                      <a href="#">Services</a>
                    </li>
                    <li className="has-droupdown has-menu-child-item">
                      <a href="#">Solutions</a>
                      <ul className="submenu">
                        <li>
                          <a href="#">For Schools</a>
                        </li>
                        <li>
                          <a href="#">For Other Organisations</a>
                        </li>
                      </ul>
                    </li>
                    <li className="has-droupdown ">
                      <a href="#">Pricing</a>
                    </li>

                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </nav>

                {/* Start Header Btn  */}
                <div className="header-btn">
                  <div className="dot-btn">
                    <img src="/assets/main/images/shop/dot.svg" alt="" />
                    <span className="offcanvas-trigger">
                      <span className="offcanvas-bars">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </span>
                  </div>
                  <a className="tmp-btn round" href="/admin">
                    Admin Portal
                  </a>
                </div>
                {/* End Header Btn  */}

                {/* Start Mobile-Menu-Bar */}
                <div className="mobile-menu-bar ml--5 d-block d-lg-none">
                  <div className="hamberger">
                    <button className="hamberger-button">
                      <i data-feather="menu"></i>
                    </button>
                  </div>
                </div>
                {/* Start Mobile-Menu-Bar */}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* End Header Area  */}
      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="header-top">
            <div className="logo">
              <a href="index.html">
                <img
                  className="logo-light"
                  src="/assets/main/images/logo/logo.png"
                  alt="Corporate Logo"
                />
                <img
                  className="logo-dark"
                  src="/assets/main/images/logo/logo-dark.png"
                  alt="Corporate Logo"
                />
              </a>
            </div>
            <div className="close-menu">
              <button className="close-button">
                <i data-feather="x"></i>
              </button>
            </div>
          </div>
          <ul className="mainmenu">
            <li className="with-megamenu has-menu-child-item">
              <a href="#">Home</a>
              <div className="tmp-megamenu with-mega-item-2 full-width-mega">
                <div className="wrapper demos-area-drop-down">
                  <div className="row row--0">
                    <div className="col-lg-12">
                      <div className="tab_wrapper onapge-multipage-tab-wrapper">
                        <div
                          className="nav nav-pills me-3 tabs-nav"
                          role="tablist"
                        >
                          <button
                            className="nav-links tmp-btn active"
                            data-target=".multipage_content"
                            type="button"
                          >
                            Multipage
                          </button>
                          <button
                            className="nav-links tmp-btn"
                            data-target=".onepage_content"
                            type="button"
                          >
                            Onepage
                          </button>
                        </div>

                        <div className="tab-content">
                          <div className="tab-pane multipage_content active">
                            {/* multipage area start */}
                            <ul className="mega-menu-item">
                              <li>
                                <a
                                  href="01-index-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/01-business-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="01-index-consulting.html">
                                  Business Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Popular
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="white-01-index-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-01-business-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-01-index-consulting.html">
                                  Business Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Popular
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="02-index-business-consulting-2.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/02-business-consulting-2.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="02-index-business-consulting-2.html">
                                  Business Consulting
                                </a>
                              </li>
                              <li>
                                <a
                                  href="white-02-index-business-consulting-2.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-02-business-consulting-2.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-02-index-business-consulting-2.html">
                                  Business Consulting
                                </a>
                              </li>

                              <li>
                                <a
                                  href="03-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/03-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="03-agency.html">
                                  Agency{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="white-03-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-03-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-03-agency.html">
                                  Agency{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="04-services-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/04-services-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="04-services-agency.html">
                                  Services Agency
                                </a>
                              </li>
                              <li>
                                <a
                                  href="white-04-services-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-04-services-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-04-services-agency.html">
                                  Services Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="05-corporate.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/05-corporate.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="05-corporate.html">Corporate</a>
                              </li>
                              <li>
                                <a
                                  href="white-05-corporate.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-05-corporate.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-05-corporate.html">Corporate</a>
                              </li>

                              <li>
                                <a
                                  href="11-hr-website.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/11-personal-portfolio.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="11-hr-website.html">HR Website</a>
                              </li>

                              <li>
                                <a
                                  href="white-11-hr-website.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-11-personal-portfolio.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-11-hr-website.html">
                                  HR Website
                                </a>
                              </li>

                              <li>
                                <a
                                  href="06-startup.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/06-startup.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="06-startup.html">Startup Business</a>
                              </li>

                              <li>
                                <a
                                  href="white-06-startup.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-06-startup.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-06-startup.html">
                                  Startup Business
                                </a>
                              </li>

                              <li>
                                <a
                                  href="07-creative-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/07-creative-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="07-creative-agency.html">
                                  Creative Agency
                                </a>
                              </li>
                              <li>
                                <a
                                  href="white-07-creative-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-07-creative-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-07-creative-agency.html">
                                  Creative Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="08-business.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/08-business.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="08-business.html">Business</a>
                              </li>

                              <li>
                                <a
                                  href="white-08-business.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-08-business.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-08-business.html">Business</a>
                              </li>

                              <li>
                                <a
                                  href="09-digital-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/09-digital-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="09-digital-agency.html">
                                  Digital Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="white-09-digital-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-09-digital-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-09-digital-agency.html">
                                  Digital Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="10-marketing-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/10-marketing-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="10-marketing-agency.html">
                                  Marketing Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="white-10-marketing-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-10-marketing-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-10-marketing-agency.html">
                                  Marketing Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="12-index-business-consulting-3.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/12-index-business-consulting-3.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="12-index-business-consulting-3.html">
                                  Business Consulting 3
                                </a>
                              </li>

                              <li>
                                <a
                                  href="white-12-index-business-consulting-3.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-12-index-business-consulting-3.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-12-index-business-consulting-3.html">
                                  Business Consulting 3
                                </a>
                              </li>
                              <li>
                                <a
                                  href="13-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/13-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="13-agency.html">Agency 2</a>
                              </li>
                              <li>
                                <a
                                  href="white-13-agency.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-13-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-13-agency.html">Agency 2</a>
                              </li>
                              <li>
                                <a
                                  href="14-financial-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/14-financial-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="14-financial-consulting.html">
                                  Financial Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="white-14-financial-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-14-financial-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-14-financial-consulting.html">
                                  Financial Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="15-business-coach.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/15-business-coach.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="15-business-coach.html">
                                  Business Coach
                                </a>
                              </li>

                              <li>
                                <a
                                  href="white-15-business-coach.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-15-business-coach.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-15-business-coach.html">
                                  Business Coach
                                </a>
                              </li>

                              <li>
                                <a
                                  href="16-real-estate-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/16-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="16-real-estate-consulting.html">
                                  Real Estate Consulting
                                </a>
                              </li>

                              <li>
                                <a
                                  href="white-16-real-estate-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-16-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-16-real-estate-consulting.html">
                                  Real Estate Consulting
                                </a>
                              </li>

                              <li>
                                <a
                                  href="17-real-estate-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/17-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="17-real-estate-consulting.html">
                                  Real Estate Consulting 2
                                </a>
                              </li>

                              <li>
                                <a
                                  href="white-17-real-estate-consulting.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-17-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-17-real-estate-consulting.html">
                                  Real Estate Consulting 2
                                </a>
                              </li>
                              <li>
                                <a
                                  href="18-it-solution.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/18-it-solution.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="18-it-solution.html">
                                  It Company{" "}
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="white-18-it-solution.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-18-it-solution.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-18-it-solution.html">
                                  It Company{" "}
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="19-personal-advisory.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/19-personal-advisory.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="19-personal-advisory.html">
                                  Personal Advisory
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="white-19-personal-advisory.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-19-personal-advisory.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="white-19-personal-advisory.html">
                                  Personal Advisory
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="#" className="thumbnail-demos">
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/coming-soon.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="#">
                                  SEO Website{" "}
                                  <span className="tmp-badge-card success">
                                    Coming Soon
                                  </span>
                                </a>
                              </li>
                            </ul>
                            {/* multipage area end */}
                          </div>

                          <div className="tab-pane onepage_content">
                            {/* multipage area start */}
                            <ul className="mega-menu-item">
                              <li>
                                <a
                                  href="onepage-one.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/01-business-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-one.html">
                                  Business Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Popular
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-one-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-01-business-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-one-white.html">
                                  Business Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Popular
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-two.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/02-business-consulting-2.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-two.html">
                                  Business Consulting
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-two-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-02-business-consulting-2.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-two-white.html">
                                  Business Consulting
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-three.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/03-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-three.html">
                                  Agency{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-three-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-03-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-three-white.html">
                                  Agency{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-four.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/04-services-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-four.html">Services Agency</a>
                              </li>
                              <li>
                                <a
                                  href="onepage-four-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-04-services-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-four-white.html">
                                  Services Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-five.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/05-corporate.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-five.html">Corporate</a>
                              </li>
                              <li>
                                <a
                                  href="onepage-five-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-05-corporate.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-five-white.html">Corporate</a>
                              </li>

                              <li>
                                <a
                                  href="onepage-eleven.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/11-personal-portfolio.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-eleven.html">HR Website</a>
                              </li>

                              <li>
                                <a
                                  href="onepage-eleven-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-11-personal-portfolio.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-eleven-white.html">
                                  HR Website
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-six.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/06-startup.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-six.html">Startup Business</a>
                              </li>

                              <li>
                                <a
                                  href="onepage-six-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-06-startup.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-six-white.html">
                                  Startup Business
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-seven.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/07-creative-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-seven.html">Creative Agency</a>
                              </li>
                              <li>
                                <a
                                  href="onepage-seven-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-07-creative-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-seven-white.html">
                                  Creative Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-eight.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/08-business.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-eight.html">Business</a>
                              </li>

                              <li>
                                <a
                                  href="onepage-eight-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-08-business.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-eight-white.html">Business</a>
                              </li>

                              <li>
                                <a
                                  href="onepage-nine.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/09-digital-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-nine.html">Digital Agency</a>
                              </li>

                              <li>
                                <a
                                  href="onepage-nine-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-09-digital-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-nine-white.html">
                                  Digital Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-ten.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/10-marketing-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-ten.html">Marketing Agency</a>
                              </li>

                              <li>
                                <a
                                  href="onepage-ten-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-10-marketing-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-ten-white.html">
                                  Marketing Agency
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-twelve.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/12-index-business-consulting-3.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-twelve.html">
                                  Business Consulting 3
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-twelve-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-12-index-business-consulting-3.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-twelve-white.html">
                                  Business Consulting 3
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-thirteen.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/13-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-thirteen.html">Agency 2</a>
                              </li>
                              <li>
                                <a
                                  href="onepage-thirteen-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-13-agency.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-thirteen-white.html">
                                  Agency 2
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-fourteen.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/14-financial-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-fourteen.html">
                                  Financial Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-fourteen-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-14-financial-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-fourteen-white.html">
                                  Financial Consulting{" "}
                                  <span className="tmp-badge-card success">
                                    Hot
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-fifteen.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/15-business-coach.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-fifteen.html">
                                  Business Coach
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-fifteen-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-15-business-coach.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-fifteen-white.html">
                                  Business Coach
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-sixteen.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/16-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-sixteen.html">
                                  Real Estate Consulting
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-sixteen-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-16-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-sixteen-white.html">
                                  Real Estate Consulting
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-seventeen.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/17-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-seventeen.html">
                                  Real Estate Consulting 2
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-seventeen-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-17-real-estate-consulting.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-seventeen-white.html">
                                  Real Estate Consulting 2
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-eighteen.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/18-it-solution.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-eighteen.html">
                                  It Company{" "}
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-eighteen-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-18-it-solution.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-eighteen-white.html">
                                  It Company{" "}
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>

                              <li>
                                <a
                                  href="onepage-nineteen.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/19-personal-advisory.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-nineteen.html">
                                  Personal Advisory
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="onepage-nineteen-white.html"
                                  className="thumbnail-demos"
                                >
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/white-19-personal-advisory.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="onepage-nineteen-white.html">
                                  Personal Advisory
                                  <span className="tmp-badge-card success">
                                    New
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="#" className="thumbnail-demos">
                                  <img
                                    loading="lazy"
                                    src="/assets/main/images/demo/coming-soon.webp"
                                    alt=""
                                  />
                                </a>
                                <a href="#">
                                  SEO Website{" "}
                                  <span className="tmp-badge-card success">
                                    Coming Soon
                                  </span>
                                </a>
                              </li>
                            </ul>
                            {/* multipage area end */}
                          </div>
                        </div>
                      </div>

                      <div className="load-demo-btn-wrap mt--15">
                        <div className="load-demo-btn text-center">
                          <span className="color-white b3">
                            Scroll to view more{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-arrow-down-up"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <span className="bg-content">corpox</span> */}
                </div>
              </div>
            </li>
            <li className="with-megamenu has-menu-child-item">
              <a href="#">
                Pages
                {/* <i data-feather="more-vertical"></i> */}
              </a>
              <div className="tmp-megamenu with-mega-item-2 full-width-mega">
                <div className="wrapper">
                  <div className="row row--0">
                    <div className="col-xl-2 col-lg-3 single-mega-item">
                      <ul className="mega-menu-item">
                        <li>
                          <a href="about.html">About Company</a>
                        </li>
                        <li>
                          <a href="our-service.html">Our Service</a>
                        </li>
                        <li>
                          <a href="our-service-two.html">Our Service Two</a>
                        </li>
                        <li>
                          <a href="our-service-three.html">Our Service Three</a>
                        </li>
                        <li>
                          <a href="our-service-four.html">Our Service Four</a>
                        </li>
                        <li>
                          <a href="our-service-five.html">Our Service Five</a>
                        </li>
                        <li>
                          <a href="service-details-two.html">
                            Service Details Two
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="service-details-three.html">
                            Service Details Three
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="service-details-four.html">
                            Service Details Four
                          </a>
                        </li>
                        <li>
                          <a href="service-details.html">Service Details</a>
                        </li>
                        <li>
                          <a href="team.html">Our Team</a>
                        </li>
                        <li>
                          <a href="team-two.html">Our Team Two</a>
                        </li>
                        <li>
                          <a href="our-history.html">
                            Our History{" "}
                            <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                        <li>
                          <a href="clients.html">
                            Clients <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-2 col-lg-3 single-mega-item">
                      <ul className="mega-menu-item">
                        <li>
                          <a href="office-branch.html">
                            Office Branch{" "}
                            <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                        <li>
                          <a href="team-three.html">Our Team Three</a>
                        </li>
                        <li>
                          <a href="team-details.html">Team Details</a>
                        </li>
                        <li>
                          <a href="pricing.html">Pricing Plan</a>
                        </li>
                        <li>
                          <a href="pricing-two.html">Pricing Plan Two</a>
                        </li>
                        <li>
                          <a href="pricing-three.html">Pricing Plan Three</a>
                        </li>
                        <li>
                          <a href="portfolio.html">Portfolio Default</a>
                        </li>
                        <li>
                          <a href="portfolio-three-column.html">
                            Portfolio 3 Column
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-full-width.html">
                            Portfolio Full Width
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-grid-layout.html">
                            Portfolio Grid Layout
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-box-layout.html">
                            Portfolio Box Layout
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-card-hover.html">
                            Portfolio Card Hover
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-bottom-content.html">
                            Portfolio with Content
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-details.html">Portfolio Details</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-2 col-lg-3 single-mega-item">
                      <ul className="mega-menu-item">
                        <li>
                          <a href="portfolio-details-two.html">
                            Portfolio Details Two
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-details-three.html">
                            Portfolio Details Video
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-details-five.html">
                            Portfolio Details Video
                          </a>
                        </li>
                        <li>
                          <a href="portfolio-details-four.html">
                            Portfolio Details Slider
                          </a>
                        </li>
                        <li>
                          <a href="timeline.html">Working Process</a>
                        </li>
                        <li>
                          <a href="our-gallery.html">Our Gallery</a>
                        </li>
                        <li>
                          <a href="our-gallery-col-3.html">Gallery col 3</a>
                        </li>
                        <li>
                          <a href="career.html">Career Oppertunity</a>
                        </li>
                        <li>
                          <a href="career-details.html">Career Details</a>
                        </li>
                        <li>
                          <a href="apply.html">Apply Job</a>
                        </li>
                        <li>
                          <a href="blog-grid.html">Blog Grid</a>
                        </li>
                        <li>
                          <a href="blog-list-view.html">Blog List View</a>
                        </li>
                        <li>
                          <a href="blog-bento.html">Blog Bento View</a>
                        </li>
                        <li>
                          <a href="blog-details.html">Blog Details</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-xl-2 col-lg-3 single-mega-item">
                      <ul className="mega-menu-item">
                        <li>
                          <a href="blog-details-standard.html">
                            Blog Standard{" "}
                            <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                        <li>
                          <a href="faq.html">
                            Faq's <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                        <li>
                          <a href="testimonial.html">Testimonial</a>
                        </li>
                        <li>
                          <a href="testimonial-two.html">Testimonial Two</a>
                        </li>
                        <li>
                          <a href="testimonial-three.html">Testimonial Three</a>
                        </li>
                        <li>
                          <a href="testimonial-modern.html">
                            Testimonial Modern
                          </a>
                        </li>
                        <li>
                          <a href="contact.html">Contact Page</a>
                        </li>

                        <li>
                          <a href="shop.html">
                            Shop <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                        <li>
                          <a href="shop-details.html">
                            Shop Details
                            <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                        <li>
                          <a href="cart.html">
                            Cart <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                        <li>
                          <a href="checkout.html">
                            Checkout <span className="tmp-badge-card">New</span>
                          </a>
                        </li>

                        <li>
                          <a href="error.html">404 Page</a>
                        </li>
                        <li>
                          <a href="privacy-policy.html">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="terms-condition.html">Terms & Condition</a>
                        </li>
                      </ul>
                    </div>

                    <div className="col-xl-4 d-lg-none d-xl-block">
                      <a
                        href="contact.html"
                        className="feature-image-add-header"
                      >
                        <img
                          loading="lazy"
                          src="/assets/main/images/banner/header-contact-dark.webp"
                          alt="corporate-business"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="with-megamenu has-menu-child-item position-relative">
              <a href="#">Service</a>
              <div className="tmp-megamenu width-small-mega">
                <div className="wrapper">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mega-top-banner">
                        <div className="content">
                          <h4 className="title">Service hub</h4>
                          <p className="description">
                            Complete Business Consultation for You, All Services
                            in One Place.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row row--15">
                    <div className="col-lg-12 col-xl-6 col-xxl-6 single-mega-item">
                      <h3 className="tmp-short-title">Service Layout</h3>
                      <ul className="mega-menu-item">
                        <li>
                          <a href="our-service.html">Our Service</a>
                        </li>
                        <li>
                          <a href="our-service-two.html">Our Service Two</a>
                        </li>
                        <li>
                          <a href="our-service-three.html">Our Service Three</a>
                        </li>
                        <li>
                          <a href="our-service-four.html">Our Service Four</a>
                        </li>
                        <li>
                          <a href="our-service-five.html">Our Service Five</a>
                        </li>
                        <li>
                          <a href="our-service-six.html">Our Service Six</a>
                        </li>
                        <li>
                          {" "}
                          <a href="service-list.html">
                            Service List Style{" "}
                            <span className="tmp-badge-card">New</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-12 col-xl-6 col-xxl-6 single-mega-item">
                      <h3 className="tmp-short-title">Service Details</h3>
                      <ul className="mega-menu-item">
                        <li>
                          <a href="service-details.html">
                            Service Details{" "}
                            <span className="tmp-badge-card">Popular</span>
                          </a>
                        </li>
                        <li>
                          <a href="service-details-center.html">
                            Service Details center
                          </a>
                        </li>
                        <li>
                          <a href="service-details-two.html">
                            Service Details Two
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="service-details-three.html">
                            Service Details Three
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="service-details-four.html">
                            Service Details Four
                          </a>
                        </li>

                        <li>
                          {" "}
                          <a href="#">
                            Service List Style{" "}
                            <span className="tmp-badge-card">Coming</span>
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">
                            Service Details Six{" "}
                            <span className="tmp-badge-card">Coming</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="nav-quick-access">
                        <li>
                          <a href="contact.html">
                            <i data-feather="folder-minus"></i> Quick Start
                            Guide
                          </a>
                        </li>
                        <li>
                          <a href="contact.html">
                            <i data-feather="folder-minus"></i> For Open Source
                          </a>
                        </li>
                        <li>
                          <a href="contact.html">
                            <i data-feather="folder-minus"></i> API Status
                          </a>
                        </li>
                        <li>
                          <a href="contact.html">
                            <i data-feather="folder-minus"></i> Support
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="has-droupdown has-menu-child-item">
              <a href="#">Project</a>
              <ul className="submenu">
                <li>
                  <a href="portfolio.html">Portfolio Default</a>
                </li>
                <li>
                  <a href="portfolio-three-column.html">
                    Portfolio Three Column
                  </a>
                </li>
                <li>
                  <a href="portfolio-full-width.html">Portfolio Full Width</a>
                </li>
                <li>
                  <a href="portfolio-grid-layout.html">Portfolio Grid Layout</a>
                </li>
                <li>
                  <a href="portfolio-box-layout.html">Portfolio Box Layout</a>
                </li>
                <li>
                  <a href="portfolio-card-hover.html">Portfolio Card Hover</a>
                </li>
                <li>
                  <a href="portfolio-bottom-content.html">
                    Portfolio Bottom Content
                  </a>
                </li>
                <li className="has-third-lev">
                  <a href="#">Portfolio Details</a>
                  <ul className="submenu">
                    <li>
                      <a href="portfolio-details.html">Portfolio Details</a>
                    </li>
                    <li>
                      <a href="portfolio-details-two.html">
                        Portfolio Details Two
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details-three.html">
                        Portfolio Details Video
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details-five.html">
                        Portfolio Details Video 2
                      </a>
                    </li>
                    <li>
                      <a href="portfolio-details-four.html">
                        Portfolio Details Slider
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="has-droupdown has-menu-child-item">
              <a href="#">Blog</a>
              <ul className="submenu">
                <li>
                  <a href="blog-grid.html">Blog Grid</a>
                </li>
                <li>
                  <a href="blog-list-view.html">Blog List View</a>
                </li>
                <li>
                  <a href="blog-bento.html">Blog Bento</a>
                </li>
                <li className="has-third-lev">
                  <a href="#">Blog Details</a>
                  <ul className="submenu">
                    <li>
                      <a href="blog-details.html">Blog Details</a>
                    </li>
                    <li>
                      <a href="blog-details-standard.html">
                        Details Standard{" "}
                        <span className="tmp-badge-card">New</span>
                      </a>
                    </li>
                    <li>
                      <a href="blog-details-sidebar.html">
                        Blog Details Right Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-deails-sidebar-left.html">
                        Blog Details Left Sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-deails-video.html">Blog Details Video</a>
                    </li>
                    <li>
                      <a href="blog-deails-video-two.html">
                        Blog Details Video Two
                      </a>
                    </li>
                    <li>
                      <a href="blog-deails-video-popup.html">
                        Blog Details Video Popup
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <a href="contact.html">Contact</a>
            </li>

            <li className="with-megamenu has-menu-child-item">
              <a href="#">Elements</a>
              <div className="tmp-megamenu with-mega-item-2 full-width-mega">
                <div className="wrapper">
                  <div className="row row--0">
                    <div className="col-lg-3">
                      <div className="feature-image-add-header">
                        <img
                          loading="lazy"
                          src="/assets/main/images/banner/04.webp"
                          alt="corporate-business"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 single-mega-item">
                      <ul className="mega-menu-item">
                        <li>
                          <a href="style-guide.html">
                            Style Guide{" "}
                            <span className="tmp-badge-card">Hot</span>
                          </a>
                        </li>
                        <li>
                          <a href="button.html">Button Page</a>
                        </li>
                        <li>
                          <a href="service.html">Our Service</a>
                        </li>
                        <li>
                          <a href="service-details.html">Service Details</a>
                        </li>
                        <li>
                          <a href="accordion.html">Accordion Style</a>
                        </li>
                        <li>
                          <a href="progressbar.html">Progressbar</a>
                        </li>
                        <li>
                          <a href="blog-grid.html">Blog Grid</a>
                        </li>

                        <li>
                          <a href="team.html">Our Team</a>
                        </li>
                        <li>
                          <a href="modern-tab.html">Modern Tabs</a>
                        </li>
                        <li>
                          <a href="social-share.html">Social Share</a>
                        </li>

                        <li>
                          <a href="brand.html">Brand Style</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact Page</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-3 single-mega-item">
                      <ul className="mega-menu-item">
                        <li>
                          <a href="counter.html">Counter Up</a>
                        </li>
                        <li>
                          <a href="gallery.html">Gallery</a>
                        </li>

                        <li>
                          <a href="error.html">404 Page</a>
                        </li>

                        <li>
                          <a href="video.html">Video Style</a>
                        </li>
                        <li>
                          <a href="portfolio.html">Our Portfolio</a>
                        </li>
                        <li>
                          <a href="testimonial.html">Testimonial</a>
                        </li>
                        <li>
                          <a href="pricing.html">Pricing Plan</a>
                        </li>
                        <li>
                          <a href="privacy-policy.html">Privacy Policy</a>
                        </li>

                        <li>
                          <a href="tooltip.html">Tool Tip</a>
                        </li>
                        <li>
                          <a href="section-title.html">Section Title</a>
                        </li>
                        <li>
                          <a href="team-style.html">Team Style</a>
                        </li>
                        <li>
                          <a href="typography.html">Typography</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-3">
                      <ul className="mega-menu-item">
                        <li>
                          <a href="form-style.html">Form Style</a>
                        </li>
                        <li>
                          <a href="pagination.html">Pagination</a>
                        </li>
                        <li>
                          <a href="avatars.html">Avatars</a>
                        </li>
                        <li>
                          <a href="animated-heading.html">Heading Split</a>
                        </li>
                        <li>
                          <a href="lightbox.html">Light Box</a>
                        </li>

                        <li>
                          <a href="call-to-action.html">Call To Action</a>
                        </li>
                        <li>
                          <a href="banner-slider.html">Banner Slider</a>
                        </li>
                        <li>
                          <a href="about-style.html">About Style</a>
                        </li>
                        <li>
                          <a href="timeline.html">Timeline</a>
                        </li>
                        <li>
                          <a href="tab.html">Tab Style</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
