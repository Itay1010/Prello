import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { loadWatchers, removeWatcher, selectWatcher, addWatcher } from '../store/watcher.actions'
import watcherImg from '../watcher.png'

export const WhoWatch = () => {
    const { watchers } = useSelector((storeState) => storeState.watcherModule)
    const { selectedWatcher } = useSelector((storeState) => storeState.watcherModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadWatchers())
    }, [])

    const onRemoveWatcher = async (watcherId) => {
        dispatch(removeWatcher(watcherId))
    }

    const onSelectWatcher = async (watcher) => {
        if (selectedWatcher !== watcher) dispatch(selectWatcher(watcher))
        else if (selectedWatcher === watcher) dispatch(selectWatcher(null))
        else dispatch(selectWatcher(watcher))

    }

    const onAddWatcher = async () => {
        const username = prompt('Enter watcher name')
        const movies = []
        let movie = prompt('Enter movie name - EXIT to quit')
        while (movie !== 'EXIT') {
            movies.push(movie)
            movie = prompt('Enter movie name - EXIT to quit')
        }
        const newWatcher = { username, movies }
        dispatch(addWatcher(newWatcher))
    }




    if (!watchers) return <div>Loading...</div>
    return <div className="who-watch">
        <iframe width="1380" height="574" src="https://www.youtube.com/embed/sHbvLOtwaOs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <button onClick={() => onAddWatcher()} style={{ display: 'block', margin: '0 auto 20px' }}>Add watcher</button>
        <div className="watchers" style={{ display: 'flex', 'justifyContent': 'center' }} >
            {watchers.map(watcher => {
                return <article style={{ backgroundColor: watcher.color, padding: '20px', width: '125px', display: 'inlineBlock', 'marginInlineStart': '10px', 'alignSelf': 'flex-start' }} key={watcher._id}>
                    <h3 style={{ color: 'white' }}>{watcher.username}</h3>
                    <img src={watcherImg} alt="watcher" width="100" height="100" style={{ display: 'block', margin: '0 auto 20px', border: '1px solid white', padding: '10px' }} />
                    {selectedWatcher === watcher && selectedWatcher.movies.map(movie => <p style={{ color: 'white' }}>{movie}</p>)}
                    <button onClick={() => onSelectWatcher(watcher)} style={{ backgroundColor: 'white', color: watcher.color, border: 'none', 'marginInlineEnd': '10px', cursor: 'pointer', outline: 'none' }}>{selectedWatcher === watcher ? 'Close' : 'Select'}</button>
                    <button onClick={() => onRemoveWatcher(watcher._id)} style={{ backgroundColor: 'white', color: watcher.color, border: 'none', cursor: 'pointer', outline: 'none' }}>Remove</button>
                </article>
            })}
        </div>

    </div>
}