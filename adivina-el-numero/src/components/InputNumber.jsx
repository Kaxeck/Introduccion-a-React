// Componente para capturar el número ingresado por el usuario
function InputNumber({ value, onChange, onSubmit, disabled }) {
  return (
    <form onSubmit={onSubmit} className="input-number-form">
      <input
        type="number"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Ingresa tu número..."
        className="input-number"
      />
      <button type="submit" disabled={disabled} className="submit-button">
        Adivinar
      </button>
    </form>
  );
}

export default InputNumber;
