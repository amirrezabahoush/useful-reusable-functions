import { KeyboardEvent } from 'react';

export const startInterval = (intervalTime: number, intervalFn: () => void) => {
  const newIntervalId = setInterval(() => {
    intervalFn();
  }, intervalTime);
  return newIntervalId;
};

export const calculateStartDate = (endDate: number, duration: number): Date => {
  const MS_PER_MINUTE = 60000;
  return new Date(endDate - duration * MS_PER_MINUTE);
};

export const getTimeFromTimeStamp = (timestamp: number, timeFormat = 'hh:mm:ss') => {
  const date = new Date(timestamp);
  return timeFormat
    .replace('hh', date.getHours().toString().padStart(2, '0'))
    .replace('h', date.getHours().toString())
    .replace('mm', date.getMinutes().toString().padStart(2, '0'))
    .replace('m', date.getMinutes().toString())
    .replace('ss', date.getSeconds().toString().padStart(2, '0'))
    .replace('s', date.getSeconds().toString())
    .replace('SSS', date.getMilliseconds().toString().padStart(2, '0'));
};

export const englishEntegersCheck = (e: KeyboardEvent) => {
  if (!new RegExp(/^-?[0-9]*$/).test(e.key)) {
    e.preventDefault();
    return;
  }
  return e;
};

export const persianToEnglishNumber = (number: string) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const foundIndex = persianNumbers.indexOf(number);

  if (foundIndex > -1) {
    return englishNumbers[foundIndex];
  }
  return number;
};

export const shortenNumber = (number: number | string, toFix = 3, minimumValue = 1000) => {
  if (typeof number == 'string') number = Number(number);

  if (number < minimumValue) return number;

  const numberPostfixes = ['', 'K', 'M', 'B', 'KB', 'MB', 'BB'];
  let inputNumberPostFix: string = '';
  for (let i = 0; i < numberPostfixes.length; i++)
    if (number < 1000) {
      inputNumberPostFix = numberPostfixes[i] as string;
      break;
    } else number /= 1000;

  return `${number.toFixed(toFix)} ${inputNumberPostFix}`;
};

export const dateToPersian = (
  date: string,
  options: object = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
) => {
  return date
    ? new Date(date).toLocaleString('fa-IR', {
        timeZone: 'Asia/Tehran',
        ...options,
      })
    : '-';
};

export const addRowToList = (list: any[]) => {
  return list.map((item, index) => ({ ...item, row: index + 1 }));
};

export const initialDateToString = () => {
  const date: Date = new Date();
  let month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export const filterDateConstants = (length: number = 31) => {
  //*Describe: calculate years
  const thisYear = new Date().getFullYear() - 620;
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(thisYear - i);
  }
  //*Describe: calculate days
  const days = Array.from({ length }, (_, i) => i + 1).map((item) => ({ label: item, value: item }));
  //*Describe: calculate months
  const months = [
    { label: 'فروردین', value: 1 },
    { label: 'اردیبهشت', value: 2 },
    { label: 'خرداد', value: 3 },
    { label: 'تیر', value: 4 },
    { label: 'مرداد', value: 5 },
    { label: 'شهریور', value: 6 },
    { label: 'مهر', value: 7 },
    { label: 'آبان', value: 8 },
    { label: 'آذر', value: 9 },
    { label: 'دی', value: 10 },
    { label: 'بهمن', value: 11 },
    { label: 'اسفند', value: 12 },
  ];
  return { years: years.map((item) => ({ label: item, value: item })), months, days };
};

export const dateToGregorian = (date: number[]) => {
  const { 0: year, 1: month, 2: day, 3: hours, 4: minutes } = date;
  const selected = hours ? `${year}-${month}-${day} ${hours}:${minutes}` : `${year}-${month}-${day}`;
  const format = hours ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
  //it requires moment package
  // return moment.from(selected, 'fa', format).format(format);
};

export const roundNumber = (num: string, floatCount: number) => {
  return +parseFloat(num).toFixed(floatCount);
};

export const getTodayInPersian = () => {
  const today = new Date().toLocaleDateString('fa-IR');
  const { 0: persianYear, 1: persianMonth, 2: persianDay}  =  today.split('/');
  let year = '', month = '', day = '';
  for(let i of persianYear as string) {
    year  += persianToEnglishNumber(i);
  }
  for(let i of persianMonth as string) {
    month  += persianToEnglishNumber(i);
  }
  for(let i of persianDay as string) {
    day  += persianToEnglishNumber(i);
  }
  return {
    year,
    day,
    month
  }
};

export const maskCurrency = (value:string, maxLength = 12, radix = ",") => {
  const currencyRegExp = new RegExp(
    `(\\d{1,${maxLength - 3}})(,)?(\\d{2})`,
    "g"
  );
  return value.replace(currencyRegExp, (match, p1, p2, p3) =>
    [p1, p3].join(radix)
  );
};

export const sleep = (milliseconds: number) => {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
};

export const setCookie = (cName: string, cValue: string, expDays: number) => {
	let date = new Date();
	date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = `cName=${cValue};${expires};`;
};
