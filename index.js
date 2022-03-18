function createEmployeeRecord(array){
  return{
  firstName: array[0],
  familyName: array[1],
  title: array[2],
  payPerHour: array[3],
  timeInEvents: [],
  timeOutEvents: []
}}

function createEmployeeRecords(arrOfArr){
  return arrOfArr.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateStamp){
  let employeeObj = {
    type: 'TimeIn',
    hour: parseInt(dateStamp.slice(10)),
    date: dateStamp.slice(0,10)
  }
  employee.timeInEvents.push(employeeObj)

return employee
}

function createTimeOutEvent(employee, dateStamp){
  let employeeObj = {
    type: 'TimeOut',
    hour: parseInt(dateStamp.slice(10)),
    date: dateStamp.slice(0,10)
  }
  employee.timeOutEvents.push(employeeObj)

return employee
}

function hoursWorkedOnDate(record, date){
  let time
  for (let i=0; i<record.timeInEvents.length; i++){
    if (record.timeInEvents[i].date === date){
      if (record.timeOutEvents[i].date === date){
        time = record.timeOutEvents[i].hour - record.timeInEvents[i].hour
      }
    }
  }
  return time/100
}

function wagesEarnedOnDate(record, date){
  return (hoursWorkedOnDate(record, date)) * record.payPerHour
}

function allWagesFor(record){
  let pay = [];
  let dates = [];
  for (let i = 0; i < record.timeInEvents.length; i++){
    dates.push(record.timeInEvents[i].date)
  }
  dates.forEach(date => {
    pay.push(wagesEarnedOnDate(record, date))
  });
  return pay.reduce(( accumulator, value ) => accumulator + value)
}

function calculatePayroll(recordArr){
  let payroll = [];

  recordArr.forEach(employee => {
      payroll.push(allWagesFor(employee)) 
  });

  return payroll.reduce((accumulator, value) => accumulator + value)
}