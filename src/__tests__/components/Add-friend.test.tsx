import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddFriend from '../../components/Add-friends/Add-friend';
import { useTripContext } from '../../components/Trips/Trip-context/Trip-context';
import type { FriendType } from '../../components/Trips/Trip-context/Trip-types';

jest.mock('../../components/Trips/Trip-context/Trip-context', () => ({
  useTripContext: jest.fn(),
}));

describe('AddFriend', () => {
  const addFriendMock = jest.fn();
  const friendsMock: FriendType[] = [];

  beforeEach(() => {
    (useTripContext as jest.Mock).mockReturnValue({ friends: friendsMock, addFriend: addFriendMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a friend when clicking the add button', () => {
    const { getByPlaceholderText, getByRole } = render(<AddFriend />);
    const inputElement = getByPlaceholderText('Add friend');
    const addButtonElement = getByRole('button', { name: 'add friend button' });

    fireEvent.change(inputElement, { target: { value: 'John' } });
    fireEvent.click(addButtonElement);

    expect(addFriendMock).toHaveBeenCalledWith({ name: 'John' });
  });

  test('should not add a friend when input is empty', () => {
    const { getByRole } = render(<AddFriend />);
    const addButtonElement = getByRole('button', { name: 'add friend button' });

    fireEvent.click(addButtonElement);

    expect(addFriendMock).not.toHaveBeenCalled();
  });

  test('should reset input value after adding a friend', () => {
    const { getByPlaceholderText, getByRole } = render(<AddFriend />);
    const inputElement = getByPlaceholderText('Add friend') as HTMLInputElement;
    const addButtonElement = getByRole('button', { name: 'add friend button' });

    fireEvent.change(inputElement, { target: { value: 'John' } });
    fireEvent.click(addButtonElement);

    expect(inputElement.value).toBe('');
  });

  test('should reset input value when the friends list length changes', () => {
    const { getByPlaceholderText } = render(<AddFriend />);
    const inputElement = getByPlaceholderText('Add friend') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'John' } });

    (useTripContext as jest.Mock).mockReturnValueOnce({ friends: [{ name: 'Alice' }], addFriend: addFriendMock });
    fireEvent.change(inputElement, { target: { value: 'Alice' } });

    expect(inputElement.value).toBe('');
  });
});
