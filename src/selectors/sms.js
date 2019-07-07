// sort sms
const getVisibleSMS = (sms, filters) => {
  return sms.sort((a, b) => {
    return a.sendAt < b.sendAt ? -1 : 1
  })
} 

export default getVisibleSMS;