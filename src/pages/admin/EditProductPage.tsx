import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import useProduct from "../../hooks/useProduct";
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

const EditProductPage = withAuthenticationRequired(() => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = parseInt(params.id!);
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
        <span>Loading...</span>
      </LoadingContainer>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!product) return <div>The given equipment was not found.</div>;

  return (
    <PageContainer>
      <Title mb="4">Edit Equipment</Title>
      <FormContainer>
        <ProductForm
          product={product}
          onSubmit={async (product) => {
            await axios.put("/products/" + productId, product);
            toast.success("Changes were successfully saved.");
            navigate("/admin/products");
          }}
        />
      </FormContainer>
    </PageContainer>
  );
});

export default EditProductPage;
