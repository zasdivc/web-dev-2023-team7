import style from './style.module.css';
import HKY from '../../images/HKY.png';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
export const Home = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  return (
        <div className={'p-0 container-fluid ' + style.wrapper}>
              <div className={'w-100 d-flex h-100'}>
                  <div className={'d-flex flex-column h-100 ' + style.siderbar}>
                  <div className={style.sideHeader + ' d-flex align-items-center'}>
                    <img src={HKY} alt="Huskify" className="me-2" style={{ height: '50px', width: '50px' }} />
                    <h4 className={'text-white m-0 fw-bolder me-3'} style={{ fontSize: '30px' }}>
                      Huskify
                    </h4>
                  </div>

          <ul className={`${style.menu} ${style['sidebar-menu']} p-0`} style={{ marginTop: '20px' }}>
            <li
              onClick={() => navigate('/main')}
              className={pathname.includes('/main') ? style.active : ''}>
              <i className={pathname.includes('/main') ? 'me-2 bi bi-house-door-fill' : 'me-2 bi bi-house-door'}></i>
              <span>Home</span>
            </li>
            <li
              onClick={() => navigate('/search')}
              className={pathname.includes('/search') ? style.active : ''}>

              <i className={pathname.includes('/search') ? 'me-2 bi bi-search-heart-fill' : 'me-2 bi bi-search-heart'}></i>
              <span>Search</span>
            </li>
            <li
              onClick={() => navigate('/likes')}
              className={pathname.includes('/likes') ? style.active : ''}>

              <i className={pathname.includes('/likes') ? 'me-2 bi bi-heart-fill' : 'me-2 bi bi-heart'}></i>
              <span>Likes</span>
            </li>
          </ul>

          <p className={'text-white d-flex ps-5 align-items-center mt-auto'}>
            <i className=" bi bi-box-arrow-in-left" style={{fontSize: '24px'}}></i>
            <button className={'btn btn-link text-white text-decoration-none'}>Login</button>
          </p>

          <p className={'text-white d-flex ps-5 align-items-center'}>
            <i className=" bi bi-people-fill" style={{fontSize: '24px'}}></i>
            <button className={'btn btn-link text-white text-decoration-none'}>Profile</button>
          </p>
        </div>
        <div className={'flex-grow-1 h-100 d-flex flex-column p-0'}>
          <div className={'h-100 flex-grow-1 ' + style.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}