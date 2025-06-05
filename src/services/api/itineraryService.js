import itineraryData from '../mockData/itinerary.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let itineraries = [...itineraryData]

const itineraryService = {
  async getAll() {
    await delay(300)
    return [...itineraries]
  },

  async getById(id) {
    await delay(200)
    const itinerary = itineraries.find(i => i.id === id)
    if (!itinerary) {
      throw new Error('Itinerary not found')
    }
    return { ...itinerary }
  },

  async getByTripId(tripId) {
    await delay(250)
    return itineraries.filter(i => i.tripId === tripId).map(i => ({ ...i }))
  },

  async create(itineraryData) {
    await delay(400)
    const newItinerary = {
      id: Date.now().toString(),
      ...itineraryData,
      activities: itineraryData.activities || []
    }
    itineraries.push(newItinerary)
    return { ...newItinerary }
  },

  async update(id, updateData) {
    await delay(350)
    const index = itineraries.findIndex(i => i.id === id)
    if (index === -1) {
      throw new Error('Itinerary not found')
    }
    itineraries[index] = { ...itineraries[index], ...updateData }
    return { ...itineraries[index] }
  },

  async delete(id) {
    await delay(250)
    const index = itineraries.findIndex(i => i.id === id)
    if (index === -1) {
      throw new Error('Itinerary not found')
    }
    itineraries.splice(index, 1)
    return true
  }
}

export default itineraryService