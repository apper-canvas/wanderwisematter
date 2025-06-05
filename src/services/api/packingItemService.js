import packingItemData from '../mockData/packingItem.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let packingItems = [...packingItemData]

const packingItemService = {
  async getAll() {
    await delay(300)
    return [...packingItems]
  },

  async getById(id) {
    await delay(200)
    const item = packingItems.find(i => i.id === id)
    if (!item) {
      throw new Error('Packing item not found')
    }
    return { ...item }
  },

  async getByTripId(tripId) {
    await delay(250)
    return packingItems.filter(i => i.tripId === tripId).map(i => ({ ...i }))
  },

  async create(itemData) {
    await delay(400)
    const newItem = {
      id: Date.now().toString(),
      ...itemData,
      packed: itemData.packed || false
    }
    packingItems.push(newItem)
    return { ...newItem }
  },

  async update(id, updateData) {
    await delay(350)
    const index = packingItems.findIndex(i => i.id === id)
    if (index === -1) {
      throw new Error('Packing item not found')
    }
    packingItems[index] = { ...packingItems[index], ...updateData }
    return { ...packingItems[index] }
  },

  async delete(id) {
    await delay(250)
    const index = packingItems.findIndex(i => i.id === id)
    if (index === -1) {
      throw new Error('Packing item not found')
    }
    packingItems.splice(index, 1)
    return true
  }
}

export default packingItemService