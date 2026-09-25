function CategoryLabel({ category, className = "" }) {
  return (
    <span className={`d-inline-flex align-items-center gap-2 ${className}`}>
      <span
        className="d-inline-block rounded-circle flex-shrink-0"
        style={{ width: 10, height: 10, backgroundColor: category.color }}
        aria-hidden="true"
      />
      {category.name}
    </span>
  );
}

export default CategoryLabel;
