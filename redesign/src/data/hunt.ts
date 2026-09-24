// Demo hunt content, based on the Seattle "Legacy Ghost Capture" tour in
// reference/ghost-tour-app-flow.png. Edit freely — the UI is fully data-driven.

export type TaskType = 'trivia' | 'text' | 'photo'

export interface Task {
  id: string
  title: string
  prompt: string
  type: TaskType
  points: number
  /** trivia: answer options */
  options?: string[]
  /** trivia: the correct option; text: accepted answers (case/accents ignored) */
  answer?: string | string[]
  hint?: string
}

export interface Challenge {
  id: string
  name: string
  address: string
  photo?: string
  /** Walking distance from the team — static in the demo (no GPS). */
  distance: string
  walk: string
  lat: number
  lng: number
  /** Minutes after "Start" during which the speed bonus applies; after that the card turns orange. */
  windowMin: number
  speedBonus: number
  /** Bonus challenge: tasks can be done anywhere, no location, no time window. */
  anywhere?: boolean
  tasks: Task[]
}

export interface Hunt {
  title: string
  city: string
  teamName: string
  teamPhoto: string
  durationMin: number
  challenges: Challenge[]
}

export const hunt: Hunt = {
  title: 'Seattle Ghost Tour',
  city: 'Seattle',
  teamName: 'Ghostbuster Team',
  teamPhoto: '/assets/hunt/TeamPhoto.png',
  durationMin: 90,
  challenges: [
    {
      id: 'moore',
      name: 'Moore Theatre',
      address: '1932 2nd Ave, Seattle',
      photo: '/assets/hunt/moore-theatre.jpg',
      distance: '0.3 mi',
      walk: '6 min walk',
      lat: 47.6114,
      lng: -122.3412,
      windowMin: 15,
      speedBonus: 500,
      tasks: [
        {
          id: 'moore-pose',
          title: 'Curtain Call',
          prompt:
            'Form a dramatic group pose in front of the marquee as if you are actors bowing to an invisible, ghostly audience.',
          type: 'photo',
          points: 300,
        },
        {
          id: 'moore-seance',
          title: 'Unfinished Business',
          prompt:
            'Not a show, nor a play, but an act done with spirits for those passed away. What event, left unfinished, stirred the uncanny here to stay?',
          type: 'text',
          points: 100,
          answer: ['seance', 'a seance'],
          hint: 'The answer is 1 word.',
        },
        {
          id: 'moore-year',
          title: 'Opening Night',
          prompt: 'This haunted theater first opened its doors in ______. Guess the year!',
          type: 'trivia',
          points: 100,
          options: ['1907', '1927', '1952'],
          answer: '1907',
        },
        {
          id: 'moore-facade',
          title: 'Look Up',
          prompt: 'Step back and study the building. What is the facade mostly made of?',
          type: 'trivia',
          points: 100,
          options: ['Cream terracotta', 'Red brick', 'Black granite'],
          answer: 'Cream terracotta',
        },
        {
          id: 'moore-newphoto',
          title: 'Fresh Angle',
          prompt: 'Contribute to the scavenger hunt by submitting a new location photo of Moore Theatre!',
          type: 'photo',
          points: 500,
        },
      ],
    },
    {
      id: 'butterworth',
      name: 'Butterworth Building',
      address: '1921 1st Ave, Seattle',
      photo: '/assets/hunt/butterworth.jpg',
      distance: '0.2 mi',
      walk: '4 min walk',
      lat: 47.6107,
      lng: -122.3423,
      windowMin: 15,
      speedBonus: 500,
      tasks: [
        {
          id: 'butter-purpose',
          title: 'Final Farewells',
          prompt: "Legend says silence was this building's business. What did it originally house?",
          type: 'trivia',
          points: 100,
          options: ['A mortuary', 'A bank', 'A hotel'],
          answer: 'A mortuary',
        },
        {
          id: 'butter-word',
          title: 'Whispered Word',
          prompt: 'Unscramble the word the walls keep whispering: L · E · N · S · I · C · E',
          type: 'text',
          points: 100,
          answer: 'silence',
          hint: 'The building once turned it into legend.',
        },
        {
          id: 'butter-spooked',
          title: 'Spooked!',
          prompt: 'Take a team photo with everyone looking terrified of something just out of frame.',
          type: 'photo',
          points: 200,
        },
        {
          id: 'butter-decade',
          title: 'Brick by Brick',
          prompt: 'In which decade was the Butterworth Building completed?',
          type: 'trivia',
          points: 100,
          options: ['1900s', '1930s', '1960s'],
          answer: '1900s',
        },
      ],
    },
    {
      id: 'pike',
      name: 'Pike Place Market',
      address: '85 Pike St, Seattle',
      photo: '/assets/hunt/pike-place.jpg',
      distance: '0.4 mi',
      walk: '8 min walk',
      lat: 47.6094,
      lng: -122.3417,
      windowMin: 15,
      speedBonus: 500,
      tasks: [
        {
          id: 'pike-year',
          title: 'Market Day',
          prompt: 'Pike Place Market has been open since which year?',
          type: 'trivia',
          points: 100,
          options: ['1899', '1907', '1921'],
          answer: '1907',
        },
        {
          id: 'pike-neon',
          title: 'Neon Glow',
          prompt: 'Snap your team under the famous "Public Market Center" neon sign.',
          type: 'photo',
          points: 200,
        },
        {
          id: 'pike-fish',
          title: 'Heads Up!',
          prompt: 'What do the fishmongers here famously throw across the stall?',
          type: 'trivia',
          points: 100,
          options: ['Fish', 'Flowers', 'Apples'],
          answer: 'Fish',
        },
        {
          id: 'pike-gum',
          title: 'Sticky Situation',
          prompt: 'Just below the market is an alley wall covered in something colorful and sticky. What is it?',
          type: 'text',
          points: 100,
          answer: ['gum', 'chewing gum', 'bubble gum', 'bubblegum'],
          hint: 'You chew it.',
        },
        {
          id: 'pike-ghost',
          title: 'Apparition',
          prompt: 'Recreate a ghostly apparition using only your team and your jackets.',
          type: 'photo',
          points: 200,
        },
      ],
    },
    {
      id: 'bonus',
      name: 'Bonus: anywhere',
      address: 'Do these on the way between locations',
      distance: '',
      walk: '',
      lat: 0,
      lng: 0,
      windowMin: 0,
      speedBonus: 0,
      anywhere: true,
      tasks: [
        {
          id: 'bonus-emerald',
          title: 'Emerald City',
          prompt: 'Seattle is nicknamed the Emerald City. Why?',
          type: 'trivia',
          points: 100,
          options: ['Its evergreen forests', 'Old emerald mines', 'Green glass towers'],
          answer: 'Its evergreen forests',
        },
        {
          id: 'bonus-team',
          title: 'Ghost Hunters',
          prompt: 'Take a photo of your team striking your best ghost-hunter poses.',
          type: 'photo',
          points: 200,
        },
        {
          id: 'bonus-mountain',
          title: 'On a Clear Day',
          prompt: 'Which mountain can you see from downtown Seattle on a clear day?',
          type: 'trivia',
          points: 100,
          options: ['Mount Rainier', 'Mount Hood', 'Mount Whitney'],
          answer: 'Mount Rainier',
        },
      ],
    },
  ],
}
