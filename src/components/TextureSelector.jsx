import { useStore } from '../hooks/useStore.js'
import * as images from '../images/images.js'
import { useKeyboard } from '../hooks/useKeyboard'
import { useEffect } from 'react'

export const TextureSelector = () => {
  const [texture, setTexture, saveWorld, resetWorld] = useStore(state => [state.texture, state.setTexture, state.saveWorld, state.resetWorld])

  const { actions, keyMap } = useKeyboard()

  useEffect(() => {
    const handleMouseWheel = (e) => {
      const actionsMap = Object.values(keyMap)
      const selected = actionsMap.indexOf(texture)
      if (e.deltaY > 0) {
        selected === actionsMap.length - 1
          ? setTexture(actionsMap[7])
          : setTexture(actionsMap[selected + 1])
      } else {
        selected === 7
          ? setTexture(actionsMap[actionsMap.length - 1])
          : setTexture(actionsMap[selected - 1])
      }
      e.preventDefault()
    }

    window.addEventListener('wheel', handleMouseWheel)
    return () => {
      window.removeEventListener('wheel', handleMouseWheel)
    }
  }, [texture])

  useEffect(() => {
    const options = actions
    const selectedTexture = Object.entries(options)
      .find(([texture, isEnabled]) => isEnabled)
    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [actions.dirt, actions.grass, actions.glass, actions.log, actions.wood])

  useEffect(() => {
    if (actions.reset) resetWorld()
    if (actions.save) saveWorld()
  }, [actions.reset, actions.save])

  return (
    <div className='texture-selector'>
      {Object.entries(images)
        .map(([imgKey, img]) => {
          return (
            <img
              key={imgKey}
              className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
              src={img}
              alt={imgKey}
            />
          )
        })}
    </div>
  )
}
