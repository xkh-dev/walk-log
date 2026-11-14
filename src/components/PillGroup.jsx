import { t } from '../strings';

function PillGroup({ options, category, selected, onSelect }) {
  return (
    <div className="pills">
      {options.map((option) => (
        <button
          key={option.value}
          className={selected === option.value ? 'pill selected' : 'pill'}
          aria-pressed={selected === option.value}
          onClick={() => onSelect(selected === option.value ? null : option.value)}
        >
          {option.icon} {t(`categories.${category}.${option.value}`)}
        </button>
      ))}
    </div>
  );
}

export default PillGroup;