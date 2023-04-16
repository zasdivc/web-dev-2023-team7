
import style from './style.module.css';
import {useState} from "react";
export const MusicList = ({title}) => {
  const [musics, setMusics] = useState([1, 2, 3, 4, 2,2,2,2,2, 2]);
  return (
    <div className={'w-100'}>
      <div className={'d-flex justify-content-between'}>
        <h3 className={'text-white'}>{title}</h3>
        <span className={'text-secondary'} role={'button'}>View All</span>
      </div>
      <div className={'p-2 row'}>
        {musics.map(music => {
          return (
            <div className={'card mt-2 me-2 p-0 col-lg-2 col-md-2 col-sm-3 flex-shrink-0 bg-dark ' + style.music}>
              <div className={'card-body p-2'}>
                <img width={'100%'}
                     className={'rounded rounded-2'}
                     src={'https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5'}/>
                <p className={'mt-3 text-white'}>Deep Focus</p>
                <p>
                  <small className={'text-secondary ' + style.introduction}>
                    Keep calm and focus with ambient and post
                  </small>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}