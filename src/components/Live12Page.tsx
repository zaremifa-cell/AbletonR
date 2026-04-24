interface Props {
  onBack: () => void;
}

function Live12Page({ onBack }: Props) {
  return (
    <div className="live12-page">
      <div className="live12-back" onClick={onBack}>
        <span className="arr">←</span> Back
      </div>
      <div className="live12-placeholder">
        <h1>Live 12</h1>
        <p>This page is coming soon.</p>
      </div>
    </div>
  );
}

export default Live12Page;
