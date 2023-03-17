import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import { useStore } from '../hooks/useStore'
import * as textures from '../images/textures'

export const Cube = ({ id, position, texture }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))
  const [isHovered, setIsHovered] = useState(false)
  const [removeCube] = useStore(state => [state.removeCube])

  const activeTexture = textures[texture + 'Texture']

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (e.altKey) {
          removeCube(id)
        }
      }}
      ref={ref}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        attach='material'
        map={activeTexture}
        color={isHovered ? 'grey' : 'white'}
      />
    </mesh>
  )
}
