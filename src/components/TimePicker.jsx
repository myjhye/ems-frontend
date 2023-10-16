export default function TimePicker({ selectedTime, onChange }) {
  return (
    <input
      type="time"
      className="form-control"
      value={selectedTime}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
