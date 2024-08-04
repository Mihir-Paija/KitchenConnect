/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const UserCardComponent = ({ userData }) => {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '500px',
    margin: '16px auto',
    transition: 'box-shadow 0.3s ease'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.5em',
    fontWeight: '600'
  };

  const fieldStyle = {
    marginBottom: '10px',
    fontSize: '1em',
    color: '#555'
  };

  const strongStyle = {
    color: '#333'
  };

  const hoverStyle = {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = hoverStyle.boxShadow}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <h2 style={titleStyle}>{userData.name}</h2>
      <div style={fieldStyle}><strong style={strongStyle}>Email:</strong> {userData.email}</div>
      <div style={fieldStyle}><strong style={strongStyle}>Phone Number:</strong> {userData.mobile}</div>
      <div style={fieldStyle}><strong style={strongStyle}>City:</strong> {userData.city}</div>
    </div>
  );
};

export default UserCardComponent;