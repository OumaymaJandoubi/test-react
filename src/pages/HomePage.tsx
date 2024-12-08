import styled from "styled-components";
import Label from "../components/Label";



// Styled container for the entire HomePage
const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 97vw;  
  min-height: 86vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  text-align: center;
  padding: 3rem;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  border-radius: 10px; // Rounded corners for a softer feel
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); // Subtle shadow for depth

  @media (max-width: 768px) {
    padding: 2rem; // Adjust padding for smaller screens
  }
`;

// Styled title for the HomePage
const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.4);
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
    font-size: 3rem; // Smaller title on mobile
    margin-bottom: 1.5rem;
  }
`;

// Styled Label wrapper to center it nicely under the title
const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 1.3rem; // Adjust label size for smaller screens
  }
`;



const HomePage = () => {
  return (
    <HomePageContainer>
      <Title>Welcome to the Home Page</Title>
      <LabelWrapper>
        <Label labelId="welcome" />
      </LabelWrapper>
    </HomePageContainer>
  );
};

export default HomePage;
