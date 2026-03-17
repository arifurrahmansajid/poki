// A shared course catalog used for listing and search/autocomplete.
// A shared course catalog used for listing and search/autocomplete.
export const initialCourses = [
  { id: 1, title: 'The Complete Python Pro Bootcamp', price: '149', image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop', category: 'adult' },
  { id: 2, title: 'Active Threat Preparation and Response for Early Childhood Settings', price: '250', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop', category: 'adult' },
  { id: 3, title: 'Little Star Beginner Program', price: '59', image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=500&auto=format&fit=crop', category: 'children' },
  { id: 4, title: 'Smart Kids Foundation Course', price: '85', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop', category: 'children' },
  { id: 5, title: 'Beginner Growth Program', price: '120', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop', category: 'adult' },
  { id: 6, title: 'Smart Kids Foundation Course-1', price: '454', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop', seatText: '/ Seat', category: 'children' },
];

export const courses = JSON.parse(localStorage.getItem('courses')) || initialCourses;

