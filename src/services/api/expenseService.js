import expenseData from '../mockData/expense.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let expenses = [...expenseData]

const expenseService = {
  async getAll() {
    await delay(300)
    return [...expenses]
  },

  async getById(id) {
    await delay(200)
    const expense = expenses.find(e => e.id === id)
    if (!expense) {
      throw new Error('Expense not found')
    }
    return { ...expense }
  },

  async getByTripId(tripId) {
    await delay(250)
    return expenses.filter(e => e.tripId === tripId).map(e => ({ ...e }))
  },

  async create(expenseData) {
    await delay(400)
    const newExpense = {
      id: Date.now().toString(),
      ...expenseData,
      date: expenseData.date || new Date().toISOString().split('T')[0]
    }
    expenses.push(newExpense)
    return { ...newExpense }
  },

  async update(id, updateData) {
    await delay(350)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) {
      throw new Error('Expense not found')
    }
    expenses[index] = { ...expenses[index], ...updateData }
    return { ...expenses[index] }
  },

  async delete(id) {
    await delay(250)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) {
      throw new Error('Expense not found')
    }
    expenses.splice(index, 1)
    return true
  }
}

export default expenseService