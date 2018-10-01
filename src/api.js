const INITIAL_PROFILE = {name: 'Jackson', birthday: {year: 1982, month: 10, day: 18}};
const INITIAL_BUDGETS = [
  {month: '2018-01', amount: 31000},
  {month: '2018-02', amount: 2800},
  {month: '2018-03', amount: 3100},
  {month: '2018-04', amount: 30000},
  {month: '2018-05', amount: 31000},
];
let budgets = INITIAL_BUDGETS
function load(name, defaultValue){
  const serializedData = localStorage.getItem(name)
  if(serializedData === null){
    return defaultValue
  }

  let data = JSON.parse(serializedData);
  return data
}
function save(name, data){
  const serializedData = JSON.stringify(data)
  localStorage.setItem(name, serializedData)
}
export default {
  getProfile() {
    return load('profile', INITIAL_PROFILE)
  },
  updateProfile(profile) {
    save('profile', profile)
  },
  getBudgets() {
    budgets = load('budgets', INITIAL_BUDGETS)
    return budgets
  },
  addBudget(budget) {
    budgets.push(budget)
    save('budgets', budgets)
  },
  updateBudget(updateBudget){
    let existing = budgets.find(budget => budget.month === updateBudget.month)
    existing.amount = updateBudget.amount
    save('budgets', budgets)
  }
}