function PillGroup({ options, selected, onSelect }) {
  return (
    <div className="pills">
      {options.map((option) => (
        <button
          key={option.value}
          className={selected === option.value ? 'pill selected' : 'pill'}
          onClick={() => onSelect(selected === option.value ? null : option.value)}
        >
          {option.icon} {option.label}
        </button>
      ))}
    </div>
  );
}

export default PillGroup;