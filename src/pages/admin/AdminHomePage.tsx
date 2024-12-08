import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Container for the entire Admin Page
const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  // Ensures vertical centering
  height: 85vh;  // Reduced height to make the container more compact
  width: 98vw;   // Reduced width to make the container more compact
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  text-align: center;
  border-radius: 10px; 
  padding: 2rem;  // Reduced padding for a more compact layout
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem; // Adjust padding on smaller screens
    width: 90vw; // Adjust container width for smaller screens
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  font-style: italic;
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 1.2rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 1rem 2.8rem;
  background-color: #ffffff;
  color: #2575fc;
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
  margin-top: 2.5rem;
  text-transform: uppercase;
  border: 2px solid #2575fc;

  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1.3rem;
  }
`;
// Updated Admin Home Page Component
const AdminHomePage = withAuthenticationRequired(() => {
  return (
    <AdminContainer>
      <Title>Welcome to the Admin Panel</Title>
      <StyledLink to="products">Manage Equipment</StyledLink>
      
    </AdminContainer>
  );
});

export default AdminHomePage;
