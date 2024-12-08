import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { Product } from "../../entities";
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

const NewProductButton = styled(Button)`
  background-color: #2575fc;
  color: white;
  font-size: 1.4rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  margin-bottom: 2rem;

  &:hover {
    background-color: #1e60d2;
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #1e60d2;
    transform: translateY(1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
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

const EditLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #6a11cb;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #4a0b96;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #4a0b96;
    transform: translateY(1px);
  }
`;

const DeleteButton = styled(Button)`
  background-color: #2575fc;
  color: white;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #1e60d2;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #1e60d2;
    transform: translateY(1px);
  }
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

const ProductListPage = withAuthenticationRequired(() => {
  const { data: products, isLoading, error } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

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
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <EditLink to={`/admin/products/${product.id}/edit`}>Edit</EditLink>
                <DeleteButton onClick={() => deleteProduct(product.id)}>
                  Delete
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </Table.Body>
      </StyledTable>
    );
  };

  return (
    <PageContainer>
      <Title>Equipment</Title>
      <Link to="new">
        <NewProductButton>New Equipment</NewProductButton>
      </Link>
      {renderProducts()}
    </PageContainer>
  );
});

const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => axios.get("/products").then((res) => res.data),
  });

const useDeleteProduct = () => {
  const queryClient = useQueryClient(); // Using queryClient here
  return useMutation(
    (productId: number) => axios.delete(`/products/${productId}`),
    {
      onSuccess: () => {
        // Invalidate and refetch products after deletion
        queryClient.invalidateQueries("products");
      },
    }
  );
};

export default ProductListPage;
