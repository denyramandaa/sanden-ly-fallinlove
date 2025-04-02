import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

const leadingZero = (timeNumber) => {
  return timeNumber < 10 ? `0${timeNumber}` : timeNumber 
}

const formatDate = (date) => {
  const monthName = new Array(
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  )

  return `${date.getDate()}
  ${monthName[date.getMonth()]}
  ·
  ${leadingZero(date.getHours())}
  :
  ${leadingZero(date.getMinutes())}
  WIB`
}

const getFormatDate = (date) => {
  let n = new Date()
  let diff = n.getTime() - date.getTime()

  if (diff < (24*60*60*1000)) {
    return formatDistanceToNow(date, {addSuffix: true,locale: id})
  } else {
    return formatDate(date)
  }
}

export { getFormatDate }