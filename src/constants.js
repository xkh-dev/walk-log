const WHERE_TYPES = [
  { value: 'park',      icon: '🌳', label: 'park',      color: '#8ccf81' },
  { value: 'city',      icon: '🏢', label: 'city',      color: '#6a5acd' },
  { value: 'woods',     icon: '🌲', label: 'woods',     color: '#4a7c59' },
  { value: 'mountains', icon: '🏔️', label: 'mountains', color: '#9cb1da' },
  { value: 'coast',     icon: '🌊', label: 'coast',     color: '#388eea' },
  { value: 'rural',     icon: '🌾', label: 'rural',     color: '#b8863b' },
];

const WHEN_TYPES = [
  { value: 'morning', icon: '🌅', label: 'morning', color: '#f6c89a' },
  { value: 'noon',    icon: '🌞', label: 'noon',    color: '#f5d65e' },
  { value: 'evening', icon: '🌇', label: 'evening', color: '#cf8e98' },
  { value: 'night',   icon: '🌚', label: 'night',   color: '#3c4a78' },
];

const SCHEMA_VERSION = 1;

const WHO_TYPES = [
	{ value: 'by-yourself', icon: '🚶🏼', label: 'by yourself' },
	{ value: 'with-someone', icon: '🤝', label: 'with someone' },
];

export const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Самара', 'Нижний Новгород'];

export { WHERE_TYPES, WHEN_TYPES, WHO_TYPES, SCHEMA_VERSION };