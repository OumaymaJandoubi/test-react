import { Table } from "@radix-ui/themes";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import QuantitySelector from "../components/QuantitySelector";
import { Product } from "../entities";
import styled from "styled-components";

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: #f4f7fb;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #2f3b4e;
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledTable = styled(Table.Root)`
  width: 100%;
  max-width: 900px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 2rem;
`;

const TableHeader = styled(Table.Header)`
  background-color: #2575fc;
  color: white;
  font-size: 1.2rem;
`;

const TableRow = styled(Table.Row)`
  &:nth-child(odd) {
    background-color: #f9fafb;
  }

  &:hover {
    background-color: #e0e7ff;
  }
`;

const TableCell = styled(Table.Cell)`
  padding: 1rem;
  text-align: center;
  font-size: 1.1rem;
  color: #2f3b4e;
`;


const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #2575fc;
  margin-top: 2rem;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #2575fc; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1.2s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.span`
  font-size: 1.2rem;
  color: #2575fc;
`;

const ProductListPage = () => {
  const { data: products, isLoading, error } = useProducts();

  const renderProducts = () => {
    if (isLoading)
      return (
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading products...</LoadingText>
        </LoadingContainer>
      );

    if (error) return <div>Error: {error.message}</div>;

    if (products!.length === 0) return <p>No equipment was found!</p>;

    return (
      <StyledTable>
        <TableHeader>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {products!.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Link to={product.id.toString()}>{product.name}</Link>
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <QuantitySelector product={product} />
              </TableCell>
            </TableRow>
          ))}
        </Table.Body>
      </StyledTable>
    );
  };

  return (
    <PageContainer>
      <Title>Equipments</Title>
      {renderProducts()}
    </PageContainer>
  );
};

const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => axios.get("/products").then((res) => res.data),
  });

export default ProductListPage;
