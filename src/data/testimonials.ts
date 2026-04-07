export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  initial: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Rajesh',
    role: 'Dental Clinic Owner, Kochi',
    content: '"We were relying fully on walk-ins. After getting the Growth Package, our Google Maps profile started showing up everywhere. We got 25+ direct enquiries in the first week itself. Highly recommended!"',
    initial: 'D',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya T.',
    role: 'Wedding Planner, Trivandrum',
    content: '"The WhatsApp integration is a game-changer. Customers visit the website and immediately message us. I don\'t have to explain my packages every time; the website does it for me."',
    initial: 'P',
    rating: 5,
  },
  {
    id: '3',
    name: 'Suresh K.',
    role: 'Fitness Center, Calicut',
    content: '"Simple, fast, and extremely effective. They didn\'t confuse me with technical server talk. They just built the system in 3 days, and my gym memberships started increasing."',
    initial: 'S',
    rating: 5,
  },

];
