import React from 'react'
import { motion } from 'framer-motion'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Card from '../atoms/Card'

export default function ExpenseList({ expenses, totalExpenses, onDeleteExpense }) {
  return (
    <div className="space-y-6">
      <Card className="bg-primary bg-opacity-10 dark:bg-primary-dark dark:bg-opacity-20 p-6 text-center shadow-none">
        <Text type="h3" className="text-primary">${totalExpenses.toFixed(2)}</Text>
        <Text type="p" className="text-gray-600 dark:text-gray-400">Total Expenses</Text>
      </Card>

      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Text type="p">No expenses recorded yet. Add one above!</Text>
          </div>
        ) : (
          expenses.map((expense) => (
            <motion.div
              key={expense.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <Text type="h5">{expense.description}</Text>
                  <Text type="large" className="font-semibold text-primary">${expense.amount}</Text>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Text type="small">{expense.category}</Text>
                  <Text type="small">{expense.date}</Text>
                </div>
              </div>
              <Button
                onClick={() => onDeleteExpense(expense.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                variant="ghost"
                icon={Icon}
                iconName="Trash2"
              >
                <span className="sr-only">Delete Expense</span>
              </Button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}