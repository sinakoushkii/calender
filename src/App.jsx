import React from 'react'
import JalaliCalender from './component/JalaliCalender'
import PersianDatePicker from './component/PersianDatePicker'

const App = () => {
  return (
   <div className='container mx-auto px-4'>
    <JalaliCalender />
    {/* <PersianDatePicker /> */}
   </div>
  )
}

export default App