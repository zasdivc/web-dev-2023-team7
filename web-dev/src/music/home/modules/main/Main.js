import {MusicList} from "./components/MusicList";

export const Main = () => {
  return (
    <div className={'p-3 h-100 overflow-auto'}>
      <MusicList title={'New Release'}/>
      <MusicList title={'Recommendation'}/>
    </div>
  )
}