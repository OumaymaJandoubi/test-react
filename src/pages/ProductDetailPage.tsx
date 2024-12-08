import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import styled from "styled-components";

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: #f4f7fb;
  min-height: 80vh;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #2f3b4e;
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: capitalize;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: #2575fc;
  }
`;

const ProductPrice = styled.p`
  font-size: 2.5rem;
  color: #2575fc;
  font-weight: 600;
  margin-bottom: 2.5rem;
  text-align: center;
  border-bottom: 2px solid #2575fc;
  padding-bottom: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ff4d4d;
  font-size: 1.6rem;
  margin-top: 2rem;
  text-align: center;
  max-width: 500px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: #2575fc;
  margin-top: 2rem;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #2575fc; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.span`
  font-size: 1.5rem;
  color: #2575fc;
`;

const ProductDetailPage = () => {
  const params = useParams();
  const productId = parseInt(params.id!);
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading)
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading product details...</LoadingText>
      </LoadingContainer>
    );

  if (error)
    return (
      <ErrorContainer>
        <span>Error: {error.message}</span>
      </ErrorContainer>
    );

  if (!product)
    return (
      <ErrorContainer>
        <span>The given equipment was not found.</span>
      </ErrorContainer>
    );

  return (
    <PageContainer>
      <Title>{product.name}</Title>
      <ProductPrice>{"$" + product.price}</ProductPrice>
    </PageContainer>
  );
};

export default ProductDetailPage;
