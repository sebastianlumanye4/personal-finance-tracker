import styles from './Input.module.css';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  as = 'input',
  children,
  ...rest
}) {
  const isRadio = type === 'radio';
  const Field = as;

  if (isRadio) {
    return (
      <label className={styles.radio}>
        <input type="radio" name={name} value={value} onChange={onChange} {...rest} />
        {label}
      </label>
    );
  }

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <Field
        id={name}
        name={name}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        className={`${styles.control} ${error ? styles.invalid : ''}`}
        {...rest}
      >
        {children}
      </Field>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
