import { Button, Input } from '../../lib/components';
import useForm from '../../../hooks/useForm';
import { CATEGORIES } from '../../utils/constants';
import styles from './TransactionForm.module.css';

const initialValues = {
  description: '',
  amount: '',
  category: CATEGORIES[0],
  type: 'expense',
  date: '',
};

function validate({ description, amount, date }) {
  const errors = {};
  if (!description.trim()) errors.description = 'Description is required';
  else if (description.trim().length < 3) errors.description = 'Must be at least 3 characters';

  if (amount === '') errors.amount = 'Amount is required';
  else if (Number.isNaN(Number(amount)) || Number(amount) <= 0)
    errors.amount = 'Amount must be a positive number';

  if (!date) errors.date = 'Date is required';
  return errors;
}

export default function TransactionForm({ onAdd }) {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues,
    validate,
    onSubmit: (formValues, reset) => {
      onAdd({
        description: formValues.description.trim(),
        amount: Number(formValues.amount),
        category: formValues.category,
        type: formValues.type,
        date: formValues.date,
      });
      reset();
    },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2>Add Transaction</h2>

      <Input
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        error={errors.description}
      />

      <Input
        label="Amount (Ksh)"
        name="amount"
        type="number"
        value={values.amount}
        onChange={handleChange}
        error={errors.amount}
      />

      <Input
        label="Category"
        name="category"
        as="select"
        value={values.category}
        onChange={handleChange}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Input>

      <fieldset className={styles.fieldset}>
        <legend>Type</legend>
        <Input
          type="radio"
          name="type"
          label="Income"
          value="income"
          checked={values.type === 'income'}
          onChange={handleChange}
        />
        <Input
          type="radio"
          name="type"
          label="Expense"
          value="expense"
          checked={values.type === 'expense'}
          onChange={handleChange}
        />
      </fieldset>

      <Input
        label="Date"
        name="date"
        type="date"
        value={values.date}
        onChange={handleChange}
        error={errors.date}
      />

      <Button type="submit">Add Transaction</Button>
    </form>
  );
}