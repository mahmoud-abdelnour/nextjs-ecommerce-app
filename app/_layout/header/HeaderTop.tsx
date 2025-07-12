import Link from "next/link";

const  HeaderTop = () => {

    return (

        <div className="header-top header-top-ptb-1 d-none d-lg-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-4">
              <div className="header-info">
                <ul>
                  <li>
                     <Link href="/about" >About Us</Link>
                  </li>
                  <li>
                     <Link href="/user/dashboard" >My Account</Link>
                  </li>
                  <li>
                     <Link href="/wishlist" >Wishlist</Link>
                  </li>
               
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-4">
              <div className="text-center">
              
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="header-info header-info-right">
                <ul>
                  <li>
                    Need help? Call Us:{" "}
                    <strong className="text-brand"> + 1800 900</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );

}

export default HeaderTop;