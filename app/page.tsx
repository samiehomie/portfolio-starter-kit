import Section from './components/section'
import img1 from '../public/one.webp'
import img2 from '../public/two.webp'
import img3 from '../public/three.webp'
import img4 from '../public/four.webp'
import img5 from '../public/five.webp'
import img6 from '../public/six.webp'
import img7 from '../public/seven.webp'
import img8 from '../public/eight.webp'
import img9 from '../public/nine.webp'
import img10 from '../public/ten.webp'
import img11 from '../public/11.webp'
import img12 from '../public/12.webp'
import img13 from '../public/13.webp'
import img14 from '../public/14.webp'
import img15 from '../public/15.webp'

// Embracing Vim: The Unsung Hero of Code Editors
// April 9, 2024

// The Power of Static Typing in Programming
// April 8, 2024

function generateDates(index: number): string {
  const startDate = new Date('April 8, 2024')
  const newDate = new Date(startDate)
  newDate.setDate(startDate.getDate() + index * 2)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const dateString = newDate.toLocaleDateString('en-US', options)

  return dateString
}

function generateString(obj: { load: number; toe: [string, number] }): string {
  const toe = obj.toe[1]

  const result = `load${obj.load}_toe${toe}`

  return result
}

// const title1 = 'Embracing Vim: The Unsung Hero of Code Editors'
// const title2 = 'The Power of Static Typing in Programming'
const dateStr1 = 'April 8, 2024'
const dateStr2 = 'April 9, 2024'
const phrase1 = `I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
  Vim's keystroke commands.`

const phrase2 = `The App Router can coexist with the existing pages directory for incremental 
adoption.`

const caseList: { load: number; toe: [string, number] }[] = [
  { load: 10, toe: ['good', 0] },
  { load: 20, toe: ['good', 0] },
  { load: 30, toe: ['good', 0] },
  { load: 30, toe: ['caution', 1] },
  { load: 30, toe: ['warning', 2] },
  { load: 30, toe: ['caution', -1] },
  { load: 30, toe: ['warning', -2] },
  { load: 20, toe: ['warning', -2] },
  { load: 20, toe: ['caution', -1] },
  { load: 20, toe: ['caution', 1] },
  { load: 20, toe: ['warning', 2] },
  { load: 10, toe: ['warning', 2] },
  { load: 10, toe: ['caution', 1] },
  { load: 10, toe: ['caution', -1] },
  { load: 10, toe: ['warning', -2] },
  
  
  

 

]

const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
]

export default function Page() {
  return (
    <>
      {caseList.map((data, index) => (
        <Section
          key={index}
          imgStr={imgList[index]}
          dateStr={generateDates(index)}
          phrase={index % 2 ? phrase1 : phrase2}
          content={`Embracing Vim: The ${generateString(data)}`}
          inputCase={data}
        />
      ))}
    </>
  )
}
