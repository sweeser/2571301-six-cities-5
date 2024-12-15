import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../mocks/login';
import { logoutAction } from '../../store/apiActions';
import { getToken } from '../../services/token';
import { getFavourites } from '../../store/selectors';

function UserHeaderInfo({authStatus, userEmail}:{authStatus:AuthorizationStatus; userEmail:string}){
  const dispatch = useAppDispatch();
  const favouriteCount = useAppSelector(getFavourites).length;

  return(
    <header className="header">
      <div className="container" data-testid = "user-info">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <Link to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authStatus === AuthorizationStatus.Auth ?
                  <li className="header__nav-item user" data-testId = "item-for-auth">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favourites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{userEmail}</span>
                      <span className="header__favorite-count">{favouriteCount}</span>
                    </Link>
                  </li> : null
              }
              <li className="header__nav-item">
                {
                  authStatus === AuthorizationStatus.Auth ?

                    <Link className="header__nav-link" to = '/'>
                      <span className="header__signout"
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction(getToken()));
                        }}
                      >Sign out
                      </span>
                    </Link> :

                    <Link className="header__nav-link" to = {AppRoute.Login}>

                      <span className="header__signout"> Sign in</span>
                    </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

  );
}
export default UserHeaderInfo;
