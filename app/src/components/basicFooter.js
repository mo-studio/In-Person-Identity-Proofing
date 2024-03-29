import Image from "next/image";
import Link from "next/link";
import logoImg from "/public/uswds/img/logo-img.png";
import facebook from "/public/uswds/img/usa-icons/facebook.svg";
import instagram from "/public/uswds/img/usa-icons/instagram.svg";
import rssFeed from "/public/uswds/img/usa-icons/rss_feed.svg";
import twitter from "/public/uswds/img/usa-icons/twitter.svg";
import youtube from "/public/uswds/img/usa-icons/youtube.svg";

export default function BasicFooter() {
  return (
    <footer className="usa-footer">
      <div className="grid-container usa-footer__return-to-top">
        <Link href="#">Return to top</Link>
      </div>
      <div className="usa-footer__secondary-section">
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div
              className="
              usa-footer__logo
              grid-row
              mobile-lg:grid-col-6 mobile-lg:grid-gap-2
            "
            >
              <div className="mobile-lg:grid-col-auto">
                <Image
                  className="usa-footer__logo-img"
                  style={{ objectFit: "contain" }}
                  src={logoImg}
                  alt=""
                />
              </div>
              <div className="mobile-lg:grid-col-auto">
                <p className="usa-footer__logo-heading">Name of Agency</p>
              </div>
            </div>
            <div className="usa-footer__contact-links mobile-lg:grid-col-6">
              <div className="usa-footer__social-links grid-row grid-gap-1">
                <div className="grid-col-auto">
                  <Link className="usa-social-link" href="/">
                    <Image
                      className="usa-social-link__icon"
                      src={facebook}
                      alt="Facebook"
                    />
                  </Link>
                </div>
                <div className="grid-col-auto">
                  <Link className="usa-social-link" href="/">
                    <Image
                      className="usa-social-link__icon"
                      src={twitter}
                      alt="Twitter"
                    />
                  </Link>
                </div>
                <div className="grid-col-auto">
                  <Link className="usa-social-link" href="/">
                    <Image
                      className="usa-social-link__icon"
                      src={youtube}
                      alt="YouTube"
                    />
                  </Link>
                </div>
                <div className="grid-col-auto">
                  <Link className="usa-social-link" href="/">
                    <Image
                      className="usa-social-link__icon"
                      src={instagram}
                      alt="Instagram"
                    />
                  </Link>
                </div>
                <div className="grid-col-auto">
                  <Link className="usa-social-link" href="/">
                    <Image
                      className="usa-social-link__icon"
                      src={rssFeed}
                      alt="RSS"
                    />
                  </Link>
                </div>
              </div>
              <p className="usa-footer__contact-heading">
                &lt;Agency Contact Center&gt;
              </p>
              <address className="usa-footer__address">
                <div className="usa-footer__contact-info grid-row grid-gap">
                  <div className="grid-col-auto">
                    <Link href="tel:1-800-555-5555">
                      &lt;(800) 555-GOVT&gt;
                    </Link>
                  </div>
                  <div className="grid-col-auto">
                    <Link href="mailto:info@agency.gov">
                      &lt;info@agency.gov&gt;
                    </Link>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
