const WHERE_TYPES = [
  { value: 'park',      icon: '🌳', color: '#8ccf81' },
  { value: 'urban',     icon: '🏢', color: '#6a5acd' },
  { value: 'woods',     icon: '🌲', color: '#4a7c59' },
  { value: 'heights',   icon: '🏔️', color: '#9cb1da' },
  { value: 'coast',     icon: '🌊', color: '#388eea' },
  { value: 'rural',     icon: '🌾', color: '#b8863b' },
];

const WHEN_TYPES = [
  { value: 'morning', icon: '🌅', color: '#f6c89a' },
  { value: 'noon',    icon: '🌞', color: '#f5d65e' },
  { value: 'evening', icon: '🌇', color: '#cf8e98' },
  { value: 'night',   icon: '🌚', color: '#3c4a78' },
];

const SCHEMA_VERSION = 1;

const WHO_TYPES = [
	{ value: 'by-yourself', icon: '🚶🏼' },
	{ value: 'with-someone', icon: '🤝' },
];

export const CITIES = [
  { value: 'Москва', label: 'log.cities.moscow' },
  { value: 'Санкт-Петербург', label: 'log.cities.saintPetersburg' },
  { value: 'Казань', label: 'log.cities.kazan' },
  { value: 'Самара', label: 'log.cities.samara' },
  { value: 'Нижний Новгород', label: 'log.cities.nizhnyNovgorod' },
  { value: 'Ереван', label: 'log.cities.yerevan' },
];

export { WHERE_TYPES, WHEN_TYPES, WHO_TYPES, SCHEMA_VERSION };