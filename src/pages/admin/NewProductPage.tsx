import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import styled from "styled-components";

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  min-height: 80vh;
  font-family: 'Poppins', sans-serif;
  width: 100%; /* Ensure full width */
`;

const Title = styled(Heading)`
  font-size: 2.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-20px);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(0);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin-top: 2rem;
`;

const Spinner = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #2575fc; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1.5s linear infinite;
`;

// New Product Page Component
const NewProductPage = withAuthenticationRequired(
  () => {
    const navigate = useNavigate();

    return (
      <PageContainer>
        <Title mb="4">New Equipment</Title>
        <FormContainer>
          <ProductForm
            onSubmit={async (product) => {
              await axios.post("/products", product);
              navigate("/admin/products");
            }}
          />
        </FormContainer>
      </PageContainer>
    );
  },
  {
    onRedirecting: () => (
      <LoadingContainer>
        <Spinner />
        <span>Loading ...</span>
      </LoadingContainer>
    ),
  }
);

export default NewProductPage;
