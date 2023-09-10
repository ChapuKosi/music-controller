import React from "react";

const PremiumPopup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Sorry, you need Spotify Premium</h3>
        <p>This feature requires a Spotify Premium subscription.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PremiumPopup;
