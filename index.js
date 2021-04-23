// Your code here
function createEmployeeRecord(array) {
    let testEmployee = {
    firstName: `${array[0]}`,
    familyName: `${array[1]}`,
    title: `${array[2]}`,
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [] };
    return testEmployee;
}

function createEmployeeRecords(array) {
    const dataEmployees = array.map(subArray => createEmployeeRecord(subArray));
    return dataEmployees;
}

function createTimeInEvent(record, time) {
    const clockHour = parseInt(time.substr(11,14));
    const clockDate = time.substr(0,10);
    record.timeInEvents.push({
        type: "TimeIn",
        hour: clockHour,
        date: clockDate
    });
    return record;
}

function createTimeOutEvent(record, time) {
    const clockHour = parseInt(time.substr(11,14));
    const clockDate = time.substr(0,10);
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: clockHour,
        date: clockDate
    });
    return record;
}

function hoursWorkedOnDate(record, time) {
    let hoursWorked = 0;
    const clockIn = record.timeInEvents;
    const clockOut = record.timeOutEvents;
    for (const i in clockIn) {
        if (clockIn[i].date === time) {
            hoursWorked = (clockOut[i].hour - clockIn[i].hour)/100;
        }
    };
    return hoursWorked;
}

const wagesEarnedOnDate = (record, time) => hoursWorkedOnDate(record, time) * record.payPerHour;

function allWagesFor (record) {
    let allWages = 0;
    for (const i in record.timeInEvents){
        allWages += wagesEarnedOnDate(record, record.timeInEvents[i].date);
    }
    return allWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    let name;
    for (const i in srcArray) {
        if (srcArray[i].firstName === firstName){
            name = srcArray[i];
        }
    }
    return name;
}

function calculatePayroll(array) {
    let payroll = 0;
    for (const i in array) {
        payroll += allWagesFor(array[i]);
    }
    return payroll;
}