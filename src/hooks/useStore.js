import { nanoid } from 'nanoid'
import { create } from 'zustand'

export const useStore = create((set, get) => ({
  texture: 'dirt',
  cubes: JSON.parse(window.localStorage.getItem('world') ?? '[]'),
  addCube: (x, y, z) => {
    set(state => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          texture: state.texture,
          position: [x, y, z]
        }
      ]
    }))
  },
  removeCube: (id) => {
    set(state => ({
      cubes: state.cubes.filter(cube => cube.id !== id)
    }))
  },
  setTexture: (texture) => {
    set(() => ({ texture }))
  },
  saveWorld: () => {
    window.localStorage.setItem('world', JSON.stringify(get().cubes))
  },
  resetWorld: () => {
    window.localStorage.setItem('world', '[]')
  }
}))
