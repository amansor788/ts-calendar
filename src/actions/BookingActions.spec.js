import { expect } from 'chai';
import * as actions from './BookingActions';

describe('BookingActions', () => {
  describe('#addBooking', () => {
    it('should create an action to add a booking', () => {
      const booking = {
        id: '1234',
        client: 'Romualdo Augusto',
        since: new Date('2016-09-01'),
        until: new Date('2016-09-06'),
        total: '2000',
        deposit: '600',
        deposited: 'Yes',
        pax: '3',
        needs_cramble: 1,
        has_dog: 1,
        cabin: 'Cabaña 1',
        created_at: new Date('2016-09-07'),
      };

      const expectedAction = {
        type: actions.ADD_BOOKING,
        payload: { booking },
      };

      expect(actions.addBooking(booking)).to.deep.equal(expectedAction);
    });
  });

  describe('#updateBooking', () => {
    it('should create an action to update a booking', () => {
      const bookingId = '1234';
      const booking = {
        since: new Date('2016-09-01'),
        total: '2000',
        deposit: '600',
        deposited: 'Yes',
        needs_cramble: 1,
      };

      const expectedAction = {
        type: actions.UPDATE_BOOKING,
        payload: { bookingId, booking },
      };

      expect(actions.updateBooking(bookingId, booking)).to.deep.equal(expectedAction);
    });
  });

  describe('#deleteBooking', () => {
    it('should create an action to delete a booking', () => {
      const bookingId = '1234';

      const expectedAction = {
        type: actions.DELETE_BOOKING,
        payload: { bookingId },
      };

      expect(actions.deleteBooking(bookingId)).to.deep.equal(expectedAction);
    });
  });
});
