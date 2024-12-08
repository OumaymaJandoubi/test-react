import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount',()=>{
    it('should render user name',()=>{
        const user: User = {id: 1, name: 'Oumaima'};
        render(<UserAccount user = {user} />);
        expect(screen.getByText(user.name)).toBeInTheDocument();
    });
    it('should render edit Boutton if user is admin ',()=>{
        const user: User = {id: 1, name: 'Oumaima',isAdmin: true};
        render(<UserAccount user = {user} />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/edit/i);
    });
    it('should not render edit Boutton if user is not admin ',()=>{
        const user: User = {id: 1, name: 'Oumaima'};
        render(<UserAccount user = {user} />);
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument();
    })
}) 