import React from "react";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdHome } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import AuthStatus from "./AuthStatus";
import LanguageSelector from "./LanguageSelector";
import styled from "styled-components";

// Styled components for enhanced visual appeal
const NavBarContainer = styled(Flex)`
  padding: 16px 32px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled(Flex)`
  gap: 10px;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  gap: 16px;
  margin-left: 20px;
`;

const NavItem = styled.li`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.1rem;
  font-weight: 600;
  color: #f8f9fa;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  padding: 8px;

  &.active {
    color: #fff;
    border-bottom: 2px solid #fff;
  }

  &:hover {
    color: #ffdd00;
    transition: color 0.3s ease-in-out;
  }
`;

const CartWrapper = styled(Flex)`
  align-items: center;
  gap: 12px;
  position: relative;
`;

const CartBadge = styled(Badge)`
  position: absolute;
  top: 2px; /* Adjusted for smaller positioning */
  right: -3px; /* Adjusted for smaller positioning */
  font-size: 0.7rem; /* Reduced font size for the number */
  width: 18px; /* Adjust width for a more compact badge */
  height: 18px; /* Adjust height for a more compact badge */
  padding: 2px; /* Reduced padding to make it smaller */
  border-radius: 50%; /* Ensures the badge is circular */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff4f5a;
  color: #fff;
`;



const MobileNavWrapper = styled(Flex)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 60px;
    right: 10px;
    background: #2575fc;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    width: 24px;
    height: 20px;
    position: relative;
    z-index: 1000;

    &::before, &::after {
      content: "";
      position: absolute;
      width: 24px;
      height: 4px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }
  }
`;

const NavBar = () => {
  const { getItemCount } = useCart();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  const links = [
    { label: "Equipments", href: "/products" },
    { label: "Playground", href: "/playground" },
    { label: "Admin", href: "/admin" },
  ];

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <NavBarContainer role="navigation">
      <LogoWrapper>
        <Text className="font-medium">
          <Link to="/">
            <MdHome size={30} color="#ffffff" />
          </Link>
        </Text>
        <NavList>
          {links.map((link) => (
            <NavItem key={link.href}>
              <StyledNavLink
                to={link.href}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </StyledNavLink>
            </NavItem>
          ))}
        </NavList>
      </LogoWrapper>

      <Flex gap="4" align="center">
        <CartWrapper>
          <AiOutlineShoppingCart size={24} color="#ffffff" />
          <CartBadge role="status">{getItemCount()}</CartBadge>
        </CartWrapper>
        <LanguageSelector />
        <AuthStatus />

        {/* Mobile Hamburger Menu */}
        <HamburgerIcon onClick={toggleMobileNav} />
        {isMobileNavOpen && (
          <MobileNavWrapper>
            {links.map((link) => (
              <StyledNavLink key={link.href} to={link.href}>
                {link.label}
              </StyledNavLink>
            ))}
          </MobileNavWrapper>
        )}
      </Flex>
    </NavBarContainer>
  );
};

export default NavBar;
