import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import FriendListItem from '../../components/Add-friends/Friend-list-item';

const mockRemoveFriend = jest.fn();
const mockUpdateFriend = jest.fn();

jest.mock('../../components/Trips/Trip-context/Trip-context', () => ({
  useTripContext: () => ({
    removeFriend: mockRemoveFriend,
    updateFriendName: mockUpdateFriend,
  }),
}));

const friend = {
  id: 1223,
  name: 'John doe',
  initials: 'JD',
  color: {
    color: 'red',
    backgroundColor: 'white',
  },
};

describe('FriendListItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the list item', () => {
    const { getByTestId } = render(<FriendListItem friend={friend} />);
    const element = getByTestId('friend-list-item');

    expect(element).toBeInTheDocument();
  });

  test('should show edit name input on edit button click', () => {
    const { getByLabelText } = render(<FriendListItem friend={friend} />);
    const editButton = getByLabelText('edit friend name');

    fireEvent.click(editButton);

    expect(screen.getByDisplayValue(friend.name)).toBeInTheDocument();
  });

  test('should remove the element on delete button click', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    const { getByLabelText } = render(<FriendListItem friend={friend} />);

    const deleteButton = getByLabelText('delete this friend');

    fireEvent.click(deleteButton);

    expect(mockRemoveFriend).toHaveBeenCalledWith(friend.id);
  });

  test('should update the name when ok button is clicked', () => {
    const { getByLabelText } = render(<FriendListItem friend={friend} />);
    const editButton = getByLabelText('edit friend name');

    fireEvent.click(editButton);

    const inputField = screen.getByDisplayValue(friend.name);
    const submitButton = screen.getByLabelText('update friend name');

    fireEvent.change(inputField, { target: { value: 'John doe the 2nd' } });
    fireEvent.click(submitButton);

    expect(mockUpdateFriend).toHaveBeenCalledWith(friend.id, 'John doe the 2nd');
  });

  test('should cancel the name update when cancel button is clicked', () => {
    const { getByLabelText } = render(<FriendListItem friend={friend} />);
    const editButton = getByLabelText('edit friend name');

    fireEvent.click(editButton);

    const cancelButton = screen.getByLabelText('cancel updating friend name');

    fireEvent.click(cancelButton);

    expect(cancelButton).not.toBeInTheDocument();
  });
});
