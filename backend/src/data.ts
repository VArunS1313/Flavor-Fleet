// import {Food} from '../src/app/components/shared/models/Food'
// import { Tag } from './app/components/shared/models/tag'
export const sam_food: any[]=[
    {
        id:'1',
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        origins: ['italy'],
        stars: 4.5,
        imageUrl: 'assets/food-1.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
      {
        id:'2',
        name: 'Gole gape',
        price: 10,
        cookTime: '20-30',
        favorite: true,
        origins: ['Indian'],
        stars: 4.7,
        imageUrl: 'assets/food-1.jpg',
        tags: ['FastFood', 'Snack'],
      },
]
export const sam_tags: any[]=[
  { name: 'All', count: 2 },
  { name: 'FastFood', count: 2 },
  { name: 'Pizza', count: 1 },
  { name: 'Lunch', count: 1 },
  { name: 'SlowFood', count: 0 },
  { name: 'Hamburger', count: 0 },
  { name: 'Fry', count: 0},
  { name: 'Soup', count: 0 },
]
export const sample_users: any[] = [
  {
    name: 'Varun Singh',
    email: 'varun@xyz.com',
    password: '12345',
    address: 'Meerut',
    isAdmin: true,
  },
  {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: '12345',
    address: 'Shanghai',
    isAdmin: false,
  },
];